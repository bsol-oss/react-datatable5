import React from 'react';
import { ForeignKeyProps } from './StringInputField';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
export interface RecordType {
    [key: string]: any;
}
export interface LoadInitialValuesParams {
    ids: string[];
    foreign_key: ForeignKeyProps;
    serverUrl: string;
    setIdMap: React.Dispatch<React.SetStateAction<Record<string, object>>>;
}
export interface LoadInitialValuesResult {
    data: {
        data: RecordType[];
        count: number;
    };
    idMap: Record<string, object>;
}
/**
 * Load initial values for IdPicker fields into idMap
 * Uses customQueryFn if available, otherwise falls back to getTableData
 *
 * @param params - Configuration for loading initial values
 * @returns Promise with fetched data and idMap
 */
export declare const loadInitialValues: ({ ids, foreign_key, serverUrl, setIdMap, }: LoadInitialValuesParams) => Promise<LoadInitialValuesResult>;
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
    set: (items: Array<{
        label: string;
        value: string;
        raw: RecordType;
    }>) => void;
    idMap: Record<string, object>;
    idPickerLabels: any;
    insideDialog: boolean;
    renderDisplay: ((item: RecordType) => React.ReactNode) | undefined;
    column_ref: string;
    errors: any;
    setValue: (name: string, value: any) => void;
}
export declare const useIdPickerData: ({ column, schema, prefix, isMultiple, }: UseIdPickerDataProps) => UseIdPickerDataReturn;
