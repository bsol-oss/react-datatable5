import { ForeignKeyProps } from "@/components/Form/components/fields/StringInputField";
import { AxiosRequestConfig } from "axios";
import { JSONSchema7 } from "json-schema";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { UseTranslationResponse } from "react-i18next";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface FormRootProps<TData extends FieldValues> {
    schema: CustomJSONSchema7;
    serverUrl: string;
    requestUrl?: string;
    idMap: Record<string, object>;
    setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
    form: UseFormReturn;
    translate: UseTranslationResponse<any, any>;
    children: ReactNode;
    order?: string[];
    ignore?: string[];
    include?: string[];
    onSubmit?: SubmitHandler<TData>;
    rowNumber?: number | string;
    requestOptions?: AxiosRequestConfig;
    getUpdatedData?: () => TData | Promise<TData> | void;
    customErrorRenderer?: (error: unknown) => ReactNode;
}
export interface CustomJSONSchema7Definition extends JSONSchema7 {
    variant: string;
    in_table: string;
    column_ref: string;
    display_column: string;
    gridColumn: string;
    gridRow: string;
    foreign_key: ForeignKeyProps;
    children: ReactNode;
}
export declare const idPickerSanityCheck: (column: string, foreign_key?: {
    table?: string | undefined;
    column?: string | undefined;
    display_column?: string | undefined;
} | undefined) => void;
export declare const FormRoot: <TData extends FieldValues>({ schema, idMap, setIdMap, form, serverUrl, translate, children, order, ignore, include, onSubmit, rowNumber, requestOptions, getUpdatedData, customErrorRenderer, }: FormRootProps<TData>) => import("react/jsx-runtime").JSX.Element;
