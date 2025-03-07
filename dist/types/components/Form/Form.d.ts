import { ForeignKeyProps } from "@/components/Form/components/StringInputField";
import { AxiosRequestConfig } from "axios";
import { JSONSchema7 } from "json-schema";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { UseTranslationResponse } from "react-i18next";
export interface FormProps<TData extends FieldValues> {
    schema: JSONSchema7;
    serverUrl: string;
    requestUrl?: string;
    idMap: Record<string, object>;
    setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
    form: UseFormReturn;
    translate: UseTranslationResponse<any, any>;
    order?: string[];
    ignore?: string[];
    onSubmit?: SubmitHandler<TData>;
    rowNumber?: number | string;
    requestOptions?: AxiosRequestConfig;
}
export interface CustomJSONSchema7Definition extends JSONSchema7 {
    variant: string;
    in_table: string;
    column_ref: string;
    display_column: string;
    gridColumn: string;
    gridRow: string;
    foreign_key: ForeignKeyProps;
}
export declare const idPickerSanityCheck: (column: string, foreign_key?: {
    table?: string | undefined;
    column?: string | undefined;
    display_column?: string | undefined;
} | undefined) => void;
export declare const Form: <TData extends FieldValues>({ schema, idMap, setIdMap, form, serverUrl, translate, order, ignore, onSubmit, rowNumber, requestOptions, }: FormProps<TData>) => import("react/jsx-runtime").JSX.Element;
