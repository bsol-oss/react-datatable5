import { JSONSchema7 } from 'json-schema';
import { ReactNode } from 'react';
import { CustomQueryFn } from '../fields/StringInputField';
import { UseFormReturn } from 'react-hook-form';
import React from 'react';
export type ValidationErrorType = 'minLength' | 'maxLength' | 'pattern' | 'minimum' | 'maximum' | 'multipleOf' | 'format' | 'type' | 'enum' | 'required' | 'minItems' | 'maxItems' | 'uniqueItems' | 'minProperties' | 'maxProperties' | 'anyOf' | 'oneOf' | 'allOf' | 'const' | 'additionalProperties' | 'dependencies';
export interface DateTimePickerLabels {
    monthNamesShort?: string[];
    weekdayNamesShort?: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
    selectDateLabel?: string;
    quickActionLabels?: {
        yesterday?: string;
        today?: string;
        tomorrow?: string;
        plus7Days?: string;
    };
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
    selectTimeLabel?: string;
}
export interface LoadInitialValuesParams {
    ids: string[];
    customQueryFn: CustomQueryFn;
    setIdMap: React.Dispatch<React.SetStateAction<Record<string, object>>>;
}
export interface LoadInitialValuesResult {
    data: {
        data: Record<string, any>[];
        count: number;
    };
    idMap: Record<string, object>;
}
export interface CustomJSONSchema7 extends Omit<JSONSchema7, 'items' | 'additionalItems' | 'properties' | 'additionalProperties' | 'definitions' | 'patternProperties' | 'dependencies' | 'allOf' | 'anyOf' | 'oneOf' | 'not' | 'if' | 'then' | 'else' | 'contains'> {
    gridColumn?: string;
    gridRow?: string;
    customQueryFn?: CustomQueryFn;
    variant?: 'custom-input' | 'id-picker' | 'text-area' | 'media-library-browser' | 'tag-picker' | 'file-picker' | 'date-range' | 'enum-picker' | 'radio';
    renderDisplay?: (item: unknown) => ReactNode;
    itemToValue?: (item: unknown) => string;
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
    errorMessage?: Record<Partial<ValidationErrorType> | string, string | Record<string, string>>;
    filePicker?: FilePickerProps;
    tagPicker?: {
        queryFn?: (params: {
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
    dateTimePicker?: {
        showQuickActions?: boolean;
        quickActionLabels?: {
            yesterday?: string;
            today?: string;
            tomorrow?: string;
            plus7Days?: string;
        };
        showTimezoneSelector?: boolean;
    };
    items?: CustomJSONSchema7 | CustomJSONSchema7[];
    additionalItems?: CustomJSONSchema7;
    properties?: {
        [key: string]: CustomJSONSchema7;
    };
    additionalProperties?: boolean | CustomJSONSchema7;
    definitions?: {
        [key: string]: CustomJSONSchema7;
    };
    patternProperties?: {
        [key: string]: CustomJSONSchema7;
    };
    dependencies?: {
        [key: string]: CustomJSONSchema7 | string[];
    };
    allOf?: CustomJSONSchema7[];
    anyOf?: CustomJSONSchema7[];
    oneOf?: CustomJSONSchema7[];
    not?: CustomJSONSchema7;
    if?: CustomJSONSchema7;
    then?: CustomJSONSchema7;
    else?: CustomJSONSchema7;
    contains?: CustomJSONSchema7;
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
