import { Tag } from '@/components/ui/tag';
import {
  Badge,
  Box,
  Combobox,
  Flex,
  HStack,
  Icon,
  Portal,
  Spinner,
  Text,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { getTableData } from '../../utils/getTableData';
import { ForeignKeyProps } from './StringInputField';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { useFormI18n } from '../../utils/useFormI18n';
import { BiError } from 'react-icons/bi';

export interface IdPickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
  isMultiple?: boolean;
}

// Define record type to fix TypeScript errors
interface RecordType {
  [key: string]: any;
}

export const IdPicker = ({
  column,
  schema,
  prefix,
  isMultiple = false,
}: IdPickerProps) => {
  const {
    watch,
    getValues,
    formState: { errors },
    setValue,
  } = useFormContext();
  const {
    serverUrl,
    idMap,
    setIdMap,
    schema: parentSchema,
    idPickerLabels,
  } = useSchemaContext();
  const formI18n = useFormI18n(column, prefix);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    renderDisplay,
    foreign_key,
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const {
    table,
    column: column_ref,
    display_column,
    customQueryFn,
  } = foreign_key as ForeignKeyProps;
  const [searchText, setSearchText] = useState<string>('');
  const [limit] = useState<number>(50); // Increased limit for combobox
  const colLabel = formI18n.colLabel;

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

  // Query for search results (async loading)
  const query = useQuery({
    queryKey: [`idpicker`, { column, searchText, limit }],
    queryFn: async () => {
      if (customQueryFn) {
        const { data, idMap } = await customQueryFn({
          searching: searchText ?? '',
          limit: limit,
          offset: 0,
        });

        setIdMap((state) => {
          return { ...state, ...idMap };
        });

        return data;
      }
      const data = await getTableData({
        serverUrl,
        searching: searchText ?? '',
        in_table: table,
        limit: limit,
        offset: 0,
      });
      const newMap = Object.fromEntries(
        (data ?? { data: [] }).data.map((item: RecordType) => {
          return [
            item[column_ref],
            {
              ...item,
            },
          ];
        })
      );
      setIdMap((state) => {
        return { ...state, ...newMap };
      });
      return data;
    },
    enabled: true, // Always enabled for combobox
    staleTime: 300000,
  });

  // Query for currently selected items (to display them properly)
  const queryDefault = useQuery({
    queryKey: [
      `idpicker-default`,
      {
        form: parentSchema.title,
        column,
        id: isMultiple ? currentIds : currentId,
      },
    ],
    queryFn: async () => {
      const queryId = currentId;
      const queryIds = currentIds;

      if (customQueryFn) {
        const { data, idMap } = await customQueryFn({
          searching: '',
          limit: isMultiple ? queryIds.length : 1,
          offset: 0,
          where: [{ id: column_ref, value: isMultiple ? queryIds : queryId }],
        });

        setIdMap((state) => {
          return { ...state, ...idMap };
        });

        return data;
      }

      if (!queryId && (!queryIds || queryIds.length === 0)) {
        return { data: [] };
      }

      const data = await getTableData({
        serverUrl,
        searching: '',
        in_table: table,
        where: [{ id: column_ref, value: isMultiple ? queryIds : queryId }],
        limit: isMultiple ? queryIds.length : 1,
        offset: 0,
      });

      const newMap = Object.fromEntries(
        (data ?? { data: [] }).data.map((item: RecordType) => {
          return [
            item[column_ref],
            {
              ...item,
            },
          ];
        })
      );

      setIdMap((state) => {
        return { ...state, ...newMap };
      });

      return data;
    },
    enabled: isMultiple
      ? Array.isArray(currentIds) && currentIds.length > 0
      : !!currentId,
  });

  const { isLoading, isFetching, data, isPending, isError } = query;
  const dataList = data?.data ?? [];

  // Transform data for combobox collection
  const comboboxItems = useMemo(() => {
    return dataList.map((item: RecordType) => ({
      label: !!renderDisplay === true
        ? String(renderDisplay(item))
        : String(item[display_column] ?? ''),
      value: String(item[column_ref]),
      raw: item,
    }));
  }, [dataList, display_column, column_ref, renderDisplay]);

  // Use filter hook for combobox
  const { contains } = useFilter({ sensitivity: 'base' });

  // Create collection for combobox
  const { collection, filter, set } = useListCollection({
    initialItems: comboboxItems,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
    filter: contains,
  });


  // Handle input value change (search)
  const handleInputValueChange = (details: Combobox.InputValueChangeDetails) => {
    setSearchText(details.inputValue);
    // Filter will be applied after data is fetched
  };

  // Handle value change
  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    if (isMultiple) {
      setValue(colLabel, details.value);
    } else {
      setValue(colLabel, details.value[0] || '');
    }
  };

  // Debounce search to avoid too many API calls and update collection after data loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText !== undefined) {
        query.refetch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, query]);

  // Update collection and filter when data changes
  useEffect(() => {
    if (dataList.length > 0) {
      set(comboboxItems);
      // Apply filter to the collection
      if (searchText) {
        filter(searchText);
      }
    }
  }, [dataList, comboboxItems, set, filter, searchText]);

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
      errorText={errors[`${colLabel}`] ? formI18n.required() : undefined}
      invalid={!!errors[colLabel]}
    >
      {/* Multiple Picker - Show selected tags */}
      {isMultiple && currentValue.length > 0 && (
        <Flex flexFlow={'wrap'} gap={1} mb={2}>
          {currentValue.map((id: string) => {
            const item = idMap[id] as RecordType | undefined;
            if (item === undefined) {
              return (
                <Text key={id} fontSize="sm">
                  {idPickerLabels?.undefined ?? formI18n.t('undefined')}
                </Text>
              );
            }
            return (
              <Tag
                key={id}
                closable
                onClick={() => {
                  const newValue = currentValue.filter(
                    (itemId: string) => itemId !== id
                  );
                  setValue(colLabel, newValue);
                }}
              >
                {!!renderDisplay === true
                  ? renderDisplay(item)
                  : item[display_column]}
              </Tag>
            );
          })}
        </Flex>
      )}

      <Combobox.Root
        collection={collection}
        value={currentValue}
        onValueChange={handleValueChange}
        onInputValueChange={handleInputValueChange}
        multiple={isMultiple}
        closeOnSelect={!isMultiple}
        openOnClick
        invalid={!!errors[colLabel]}
        width="100%"
      >
        <Combobox.Control>
          <Combobox.Input
            placeholder={
              idPickerLabels?.typeToSearch ?? formI18n.t('type_to_search')
            }
          />
          <Combobox.IndicatorGroup>
            {(isFetching || isLoading || isPending) && (
              <Spinner size="xs" />
            )}
            {isError && (
              <Icon color="fg.error">
                <BiError />
              </Icon>
            )}
            {!isMultiple && currentValue.length > 0 && (
              <Combobox.ClearTrigger
                onClick={() => {
                  setValue(colLabel, '');
                }}
              />
            )}
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              {isFetching || isLoading || isPending ? (
                <HStack p={2} justify="center">
                  <Spinner size="xs" />
                  <Text fontSize="sm">
                    {idPickerLabels?.loading ?? formI18n.t('loading')}
                  </Text>
                </HStack>
              ) : isError ? (
                <Text p={2} color="fg.error" fontSize="sm">
                  {idPickerLabels?.loadingFailed ??
                    formI18n.t('loading_failed')}
                </Text>
              ) : collection.items.length === 0 ? (
                <Combobox.Empty>
                  {searchText
                    ? idPickerLabels?.emptySearchResult ??
                      formI18n.t('empty_search_result')
                    : idPickerLabels?.initialResults ??
                      formI18n.t('initial_results')}
                </Combobox.Empty>
              ) : (
                <>
                  {collection.items.map((item) => (
                    <Combobox.Item key={item.value} item={item}>
                      <Combobox.ItemText>
                        {item.label}
                      </Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </>
              )}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </Field>
  );
};
