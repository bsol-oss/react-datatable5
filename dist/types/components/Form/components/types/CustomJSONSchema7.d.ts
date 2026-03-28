import { JSONSchema7 } from 'json-schema';
import { ReactNode } from 'react';
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
export interface LoadInitialValuesParams<TRecord = unknown> {
    ids: string[];
    customQueryFn: CustomQueryFn<TRecord>;
    setIdMap: React.Dispatch<React.SetStateAction<Record<string, TRecord>>>;
}
export interface LoadInitialValuesResult<TRecord = unknown> {
    data: {
        data: TRecord[];
        count: number;
    };
    idMap: Record<string, TRecord>;
}
export interface CustomJSONSchema7 extends Omit<JSONSchema7, 'items' | 'additionalItems' | 'properties' | 'additionalProperties' | 'definitions' | 'patternProperties' | 'dependencies' | 'allOf' | 'anyOf' | 'oneOf' | 'not' | 'if' | 'then' | 'else' | 'contains'> {
    gridColumn?: string;
    gridRow?: string;
    customQueryFn?: CustomQueryFn;
    variant?: 'custom-input' | 'id-picker' | 'text-area' | 'media-library-browser' | 'file-picker' | 'date-range' | 'enum-picker' | 'radio';
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
/**
 * Expected shape of a media file returned by `onFetchFiles` and used by
 * the Media Library Browser and File Picker components.
 *
 * @example
 * ```ts
 * {
 *   id: 'file-1',
 *   name: 'photo.jpg',
 *   url: 'https://cdn.example.com/photo.jpg',
 *   size: 102400,
 *   comment: 'Profile photo',
 *   type: 'image/jpeg',
 * }
 * ```
 */
export interface FilePickerMediaFile {
    /** Unique identifier for the file (required) */
    id: string;
    /** Display name of the file (required) */
    name: string;
    /** URL for image preview; required for thumbnails in media library */
    url?: string;
    /** File size in bytes (number) or human-readable string (e.g. "1.2 MB") */
    size?: string | number;
    /** Optional description or metadata */
    comment?: string;
    /** MIME type (e.g. "image/jpeg", "application/pdf") */
    type?: string;
}
/**
 * JSON Schema definition for FilePickerMediaFile.
 * Use this to document or validate the expected structure in your API/schema.
 */
export declare const FilePickerMediaFileSchema: {
    readonly type: "object";
    readonly required: readonly ["id", "name"];
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "Unique identifier for the file";
        };
        readonly name: {
            readonly type: "string";
            readonly description: "Display name of the file";
        };
        readonly url: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "URL for image preview; required for thumbnails in media library";
        };
        readonly size: {
            readonly oneOf: readonly [{
                readonly type: "number";
            }, {
                readonly type: "string";
            }];
            readonly description: "File size in bytes (number) or human-readable string";
        };
        readonly comment: {
            readonly type: "string";
            readonly description: "Optional description or metadata";
        };
        readonly type: {
            readonly type: "string";
            readonly description: "MIME type (e.g. \"image/jpeg\", \"application/pdf\")";
        };
    };
};
export interface FilePickerProps {
    /**
     * Fetches files from your media library/API. Must return FilePickerMediaFile[].
     * The search string can be used to filter results.
     */
    onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
    /** When true, adds a "Browse Library" button to the file picker (file-picker variant only) */
    enableMediaLibrary?: boolean;
    /** When true, only shows image files (jpg, jpeg, png, gif, bmp, webp, svg) */
    filterImageOnly?: boolean;
    /** When true, shows an upload tab in the media library dialog */
    enableUpload?: boolean;
    /** Upload handler; must return the new file's ID string */
    onUploadFile?: (file: File) => Promise<string>;
}
export interface CustomQueryFnResponse<TRecord = unknown> {
    /**
     * The data of the query
     */
    data: {
        data: TRecord[];
        count: number;
    };
    /**
     * The id map of the data
     */
    idMap: Record<string, TRecord>;
}
export interface CustomQueryFnParams {
    searching: string;
    limit: number;
    offset: number;
    where?: Array<{
        id: string;
        value: string | string[];
    }>;
}
export type CustomQueryFn<TRecord = unknown> = (params: CustomQueryFnParams) => Promise<CustomQueryFnResponse<TRecord>>;
