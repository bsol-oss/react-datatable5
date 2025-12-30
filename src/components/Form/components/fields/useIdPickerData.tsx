import { useFilter, useListCollection } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { ForeignKeyProps } from './StringInputField';
import {
  CustomJSONSchema7,
  defaultRenderDisplay,
  LoadInitialValuesParams,
  LoadInitialValuesResult,
} from '../types/CustomJSONSchema7';

// Define record type to fix TypeScript errors
export interface RecordType {
  [key: string]: any;
}

// Re-export types from CustomJSONSchema7 for convenience
export type {
  LoadInitialValuesParams,
  LoadInitialValuesResult,
} from '../types/CustomJSONSchema7';

export interface UseIdPickerDataProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
  isMultiple: boolean;
}

export interface UseIdPickerDataReturn {
  colLabel: string;
  currentValue: string[];
  searchText: string;
  setSearchText: (text: string) => void;
  debouncedSearchText: string;
  isLoading: boolean;
  isFetching: boolean;
  isPending: boolean;
  isError: boolean;
  isSearching: boolean;
  isLoadingInitialValues: boolean;
  isFetchingInitialValues: boolean;
  missingIds: string[];
  comboboxItems: Array<{
    label: string;
    value: string;
    raw: RecordType;
  }>;
  collection: any;
  filter: (text: string) => void;
  set: (
    items: Array<{ label: string; value: string; raw: RecordType }>
  ) => void;
  idMap: Record<string, object>;
  idPickerLabels: any;
  insideDialog: boolean;
  renderDisplay: ((item: RecordType) => React.ReactNode) | undefined;
  loadInitialValues: (
    params: LoadInitialValuesParams
  ) => Promise<LoadInitialValuesResult>;
  column_ref: string;
  errors: any;
  setValue: (name: string, value: any) => void;
}

export const useIdPickerData = ({
  column,
  schema,
  prefix,
  isMultiple,
}: UseIdPickerDataProps): UseIdPickerDataReturn => {
  const {
    watch,
    getValues,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { idMap, setIdMap, idPickerLabels, insideDialog } = useSchemaContext();
  const { renderDisplay, loadInitialValues, foreign_key, variant } = schema;

  // loadInitialValues must be provided in schema for id-picker fields
  // It's used to load the record of the id so the display is human-readable
  if (variant === 'id-picker' && !loadInitialValues) {
    throw new Error(
      `loadInitialValues is required in schema for IdPicker field '${column}'. Please provide loadInitialValues function in the schema to load records for human-readable display.`
    );
  }
  const {
    table,
    column: column_ref,
    customQueryFn,
  } = foreign_key as ForeignKeyProps;
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');
  const [limit] = useState<number>(50); // Increased limit for combobox

  // Get colLabel from schema context (we'll compute it here)
  const colLabel = `${prefix}${column}`;

  const watchedValue = watch(colLabel);
  const watchId = !isMultiple ? watchedValue : undefined;
  const watchIds = isMultiple
    ? ((Array.isArray(watchedValue) ? watchedValue : []) as string[])
    : [];

  // Get initial values immediately to ensure query can trigger on mount
  const initialValue = getValues(colLabel);
  const initialId = !isMultiple ? initialValue : undefined;
  const initialIds = isMultiple
    ? ((Array.isArray(initialValue) ? initialValue : []) as string[])
    : [];

  // Use watched values if they exist (including empty string for single select),
  // otherwise fall back to initial values from getValues()
  const currentId =
    watchId !== undefined && watchId !== null ? watchId : initialId;
  const currentIds =
    watchedValue !== undefined && watchedValue !== null && isMultiple
      ? watchIds
      : initialIds;

  // Current value for combobox (array format)
  const currentValue = isMultiple
    ? currentIds.filter((id) => id != null && id !== '')
    : currentId
      ? [currentId]
      : [];

  // Debounce search text to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Find IDs that are in currentValue but missing from idMap
  const missingIds = useMemo(() => {
    return currentValue.filter((id: string) => !idMap[id]);
  }, [currentValue, idMap]);

  // Stable key for query based on sorted missing IDs
  const missingIdsKey = useMemo(() => {
    return JSON.stringify([...missingIds].sort());
  }, [missingIds]);

  // Include idMap state in query key to force refetch when idMap is reset (e.g., on remount from another page)
  // This ensures the query runs even if React Query has cached data for the same missing IDs
  const idMapStateKey = useMemo(() => {
    // Create a key based on whether the required IDs are in idMap
    const hasRequiredIds = currentValue.every((id: string) => idMap[id]);
    return hasRequiredIds ? 'complete' : 'incomplete';
  }, [currentValue, idMap]);

  // Query to fetch initial values that are missing from idMap
  // This query runs automatically when missingIds.length > 0 and updates idMap
  const initialValuesQuery = useQuery({
    queryKey: [`idpicker-initial`, column, missingIdsKey, idMapStateKey],
    queryFn: async () => {
      if (missingIds.length === 0) {
        return { data: [], count: 0 };
      }

      // Use schema's loadInitialValues (required for id-picker)
      if (!loadInitialValues) {
        console.warn(
          `loadInitialValues is required in schema for IdPicker field '${column}'. Returning empty idMap.`
        );
        return { data: [], count: 0 };
      }

      const result = await loadInitialValues({
        ids: missingIds,
        foreign_key: foreign_key as ForeignKeyProps,
        setIdMap,
      });

      return result.data;
    },
    enabled: missingIds.length > 0, // Only fetch if there are missing IDs
    staleTime: 0, // Always consider data stale to refetch on remount
    refetchOnMount: true, // Always refetch when component remounts (e.g., from another page)
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });

  const {
    isLoading: isLoadingInitialValues,
    isFetching: isFetchingInitialValues,
  } = initialValuesQuery;

  // Query for search results (async loading)
  const query = useQuery({
    queryKey: [`idpicker`, { column, searchText: debouncedSearchText, limit }],
    queryFn: async () => {
      // customQueryFn is required when serverUrl is not available
      if (!customQueryFn) {
        throw new Error(
          `customQueryFn is required in foreign_key for table ${table}. serverUrl has been removed.`
        );
      }
      const { data, idMap } = await customQueryFn({
        searching: debouncedSearchText ?? '',
        limit: limit,
        offset: 0,
      });

      // Update idMap with returned values
      if (idMap && Object.keys(idMap).length > 0) {
        setIdMap((state) => {
          return { ...state, ...idMap };
        });
      }
      return data;
    },
    enabled: true, // Always enabled for combobox
    staleTime: 300000,
  });

  const { isLoading, isFetching, data, isPending, isError } = query;
  const dataList = data?.data ?? [];

  // Check if we're currently searching (user typed but debounce hasn't fired yet)
  const isSearching = searchText !== debouncedSearchText;

  // Extract items from idMap for currentValue IDs
  // Use useMemo with a stable dependency to minimize recalculations
  const currentValueKey = useMemo(
    () => JSON.stringify([...currentValue].sort()),
    [currentValue]
  );

  // Serialize the relevant part of idMap to detect when items we care about change
  const idMapKey = useMemo(() => {
    const relevantItems = currentValue
      .map((id: string) => {
        const item = idMap[id];
        return item ? JSON.stringify({ id, hasItem: true }) : null;
      })
      .filter(Boolean)
      .sort()
      .join('|');
    return relevantItems;
  }, [currentValue, idMap]);

  const idMapItems = useMemo(() => {
    return currentValue
      .map((id: string) => idMap[id] as RecordType | undefined)
      .filter((item): item is RecordType => item !== undefined);
    // Depend on idMapKey which only changes when items we care about change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValueKey, idMapKey]);

  // Transform data for combobox collection
  // label is used for filtering/searching (must be a string)
  // raw item is stored for custom rendering
  // Also include items from idMap that match currentValue (for initial values display)
  const comboboxItems = useMemo(() => {
    const renderFn = renderDisplay || defaultRenderDisplay;
    const itemsFromDataList = dataList.map((item: RecordType) => {
      const rendered = renderFn(item);
      return {
        label: typeof rendered === 'string' ? rendered : JSON.stringify(item), // Use string for filtering
        value: String(item[column_ref]),
        raw: item,
      };
    });

    // Add items from idMap that match currentValue but aren't in dataList
    // This ensures initial values are displayed correctly in the combobox
    const itemsFromIdMap = idMapItems
      .map((item: RecordType) => {
        // Check if this item is already in itemsFromDataList
        const alreadyIncluded = itemsFromDataList.some(
          (i: { label: string; value: string; raw: RecordType }) =>
            i.value === String(item[column_ref])
        );
        if (alreadyIncluded) return null;
        const rendered = renderFn(item);
        return {
          label: typeof rendered === 'string' ? rendered : JSON.stringify(item),
          value: String(item[column_ref]),
          raw: item,
        };
      })
      .filter(
        (item): item is { label: string; value: string; raw: RecordType } =>
          item !== null
      );

    return [...itemsFromIdMap, ...itemsFromDataList];
  }, [dataList, column_ref, renderDisplay, idMapItems]);

  // Use filter hook for combobox
  const { contains } = useFilter({ sensitivity: 'base' });

  // Create collection for combobox
  const { collection, filter, set } = useListCollection({
    initialItems: comboboxItems,
    itemToString: (item: { label: string; value: string; raw: RecordType }) =>
      item.label,
    itemToValue: (item: { label: string; value: string; raw: RecordType }) =>
      item.value,
    filter: contains,
  });

  // Track previous comboboxItems to avoid unnecessary updates
  const prevComboboxItemsRef = useRef<string>('');
  const prevSearchTextRef = useRef<string>('');

  // Update collection and filter when data changes
  // This includes both search results and initial values from idMap
  useEffect(() => {
    // Create a stable string representation to compare (only value and label, not raw)
    const currentItemsKey = JSON.stringify(
      comboboxItems.map((item) => ({ value: item.value, label: item.label }))
    );
    const itemsChanged = prevComboboxItemsRef.current !== currentItemsKey;
    const searchChanged = prevSearchTextRef.current !== searchText;

    // Only update if items or search actually changed
    if (!itemsChanged && !searchChanged) {
      return;
    }

    if (comboboxItems.length > 0 && itemsChanged) {
      set(comboboxItems);
      prevComboboxItemsRef.current = currentItemsKey;
    }

    // Apply filter to the collection using the immediate searchText for UI responsiveness
    if (searchChanged) {
      if (searchText) {
        filter(searchText);
      }
      prevSearchTextRef.current = searchText;
    }
    // set and filter are stable functions from useListCollection
    // comboboxItems and searchText are the only dependencies we care about
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comboboxItems, searchText]);

  return {
    colLabel,
    currentValue,
    searchText,
    setSearchText,
    debouncedSearchText,
    isLoading,
    isFetching,
    isPending,
    isError,
    isSearching,
    isLoadingInitialValues,
    isFetchingInitialValues,
    missingIds,
    comboboxItems,
    collection,
    filter,
    set,
    idMap,
    idPickerLabels,
    insideDialog: insideDialog ?? false,
    renderDisplay,
    loadInitialValues: loadInitialValues!, // Required for id-picker, checked above
    column_ref,
    errors,
    setValue,
  };
};
