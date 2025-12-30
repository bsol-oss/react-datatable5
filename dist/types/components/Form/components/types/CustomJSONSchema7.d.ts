import { JSONSchema7 } from 'json-schema';
import { ReactNode } from 'react';
import { ForeignKeyProps } from '../fields/StringInputField';
import { UseFormReturn } from 'react-hook-form';
import { ValidationErrorType } from '../../utils/buildErrorMessages';
import React from 'react';
export interface DateTimePickerLabels {
    monthNamesShort?: string[];
    weekdayNamesShort?: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
}
export interface IdPickerLabels {
    undefined?: string;
    addMore?: string;
    typeToSearch?: string;
    total?: string;
    showing?: string;
    perPage?: string;
    emptySearchResult?: string;
    initialResults?: string;
}
export interface EnumPickerLabels {
    undefined?: string;
    addMore?: string;
    typeToSearch?: string;
    total?: string;
    showing?: string;
    perPage?: string;
    emptySearchResult?: string;
    initialResults?: string;
}
export interface FilePickerLabels {
    fileDropzone?: string;
    browseLibrary?: string;
    dialogTitle?: string;
    searchPlaceholder?: string;
    loading?: string;
    loadingFailed?: string;
    noFilesFound?: string;
    cancel?: string;
    select?: string;
    uploadTab?: string;
    browseTab?: string;
    uploading?: string;
    uploadFailed?: string;
}
export interface FormButtonLabels {
    submit?: string;
    reset?: string;
    cancel?: string;
    confirm?: string;
    submitAgain?: string;
    submitSuccess?: string;
    add?: string;
    save?: string;
    addNew?: string;
    fieldRequired?: string;
}
export interface TimePickerLabels {
    placeholder?: string;
    emptyMessage?: string;
}
export interface LoadInitialValuesParams {
    ids: string[];
    foreign_key: ForeignKeyProps;
    setIdMap: React.Dispatch<React.SetStateAction<Record<string, object>>>;
}
export interface LoadInitialValuesResult {
    data: {
        data: Record<string, any>[];
        count: number;
    };
    idMap: Record<string, object>;
}
export interface CustomJSONSchema7 extends JSONSchema7 {
    gridColumn?: string;
    gridRow?: string;
    foreign_key?: ForeignKeyProps;
    variant?: string;
    renderDisplay?: (item: unknown) => ReactNode;
    loadInitialValues?: (params: LoadInitialValuesParams) => Promise<LoadInitialValuesResult>;
    inputRender?: (props: {
        column: string;
        schema: CustomJSONSchema7;
        prefix: string;
        formContext: UseFormReturn;
    }) => ReactNode;
    inputViewerRender?: (props: {
        column: string;
        schema: CustomJSONSchema7;
        prefix: string;
        formContext: UseFormReturn;
    }) => ReactNode;
    dateFormat?: string;
    displayDateFormat?: string;
    timeFormat?: string;
    displayTimeFormat?: string;
    showLabel?: boolean;
    formatOptions?: Intl.NumberFormatOptions;
    numberStorageType?: 'string' | 'number';
    errorMessages?: Partial<Record<ValidationErrorType | string, string>>;
    filePicker?: FilePickerProps;
    tagPicker?: {
        queryFn?: (params: {
            in_table: string;
            where?: {
                id: string;
                value: string[];
            }[];
            limit?: number;
            offset?: number;
            searching?: string;
        }) => Promise<{
            data: {
                data: any[];
                count: number;
            };
            idMap?: Record<string, object>;
        }>;
    };
}
export declare const defaultRenderDisplay: (item: unknown) => ReactNode;
export interface TagPickerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export interface FilePickerMediaFile {
    id: string;
    name: string;
    url?: string;
    size?: string | number;
    comment?: string;
    type?: string;
}
export interface FilePickerProps {
    onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
    enableMediaLibrary?: boolean;
    filterImageOnly?: boolean;
    enableUpload?: boolean;
    onUploadFile?: (file: File) => Promise<string>;
}
