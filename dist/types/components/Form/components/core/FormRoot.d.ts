import { AxiosRequestConfig } from 'axios';
import { JSONSchema7 } from 'json-schema';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { CustomJSONSchema7, DateTimePickerLabels, EnumPickerLabels, FilePickerLabels, FormButtonLabels, IdPickerLabels, TimePickerLabels } from '../types/CustomJSONSchema7';
export interface FormRootProps<TData extends FieldValues> {
    /**
     * JSON Schema with support for errorMessages in properties.
     * Each property can define errorMessages object with keys like:
     * - required: Error message when field is required but missing
     * - minLength, maxLength: Error messages for string length validation
     * - minimum, maximum: Error messages for number range validation
     * - format: Error message for format validation (email, date, etc.)
     * - pattern: Error message for pattern validation
     * - type: Error message for type validation
     *
     * @example
     * {
     *   type: 'object',
     *   properties: {
     *     username: {
     *       type: 'string',
     *       minLength: 3,
     *       errorMessages: {
     *         required: 'Username is required',
     *         minLength: 'Username must be at least 3 characters'
     *       }
     *     }
     *   }
     * }
     */
    schema: CustomJSONSchema7;
    requestUrl?: string;
    idMap: Record<string, object>;
    setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
    form: UseFormReturn;
    children: ReactNode;
    order?: string[];
    ignore?: string[];
    include?: string[];
    onSubmit?: SubmitHandler<TData>;
    rowNumber?: number | string;
    requestOptions?: AxiosRequestConfig;
    getUpdatedData?: () => TData | Promise<TData> | void;
    customErrorRenderer?: (error: unknown) => ReactNode;
    customSuccessRenderer?: (resetHandler: () => void | Promise<void>) => ReactNode;
    displayConfig?: {
        showSubmitButton?: boolean;
        showResetButton?: boolean;
        showTitle?: boolean;
    };
    dateTimePickerLabels?: DateTimePickerLabels;
    idPickerLabels?: IdPickerLabels;
    enumPickerLabels?: EnumPickerLabels;
    filePickerLabels?: FilePickerLabels;
    formButtonLabels?: FormButtonLabels;
    timePickerLabels?: TimePickerLabels;
    insideDialog?: boolean;
}
export interface CustomJSONSchema7Definition extends JSONSchema7 {
    variant: string;
    gridColumn: string;
    gridRow: string;
    customQueryFn: any;
    children: ReactNode;
}
export declare const FormRoot: <TData extends FieldValues>({ schema, idMap, setIdMap, form, children, order, ignore, include, onSubmit, rowNumber, requestOptions, getUpdatedData, customErrorRenderer, customSuccessRenderer, displayConfig, dateTimePickerLabels, idPickerLabels, enumPickerLabels, filePickerLabels, formButtonLabels, timePickerLabels, insideDialog, }: FormRootProps<TData>) => import("react/jsx-runtime").JSX.Element;
