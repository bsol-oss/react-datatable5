import { AxiosRequestConfig } from "axios";
import { JSONSchema7 } from "json-schema";
import { Dispatch, SetStateAction } from "react";
import { FieldValues } from "react-hook-form";
import { UseTranslationResponse } from "react-i18next";
export interface SchemaFormContext<TData extends FieldValues> {
    schema: JSONSchema7;
    serverUrl: string;
    requestUrl: string;
    order: string[];
    ignore: string[];
    include: string[];
    onSubmit?: (data: TData) => Promise<void>;
    rowNumber?: number | string;
    idMap: Record<string, object>;
    setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
    translate: UseTranslationResponse<any, any>;
    requestOptions: AxiosRequestConfig;
}
export declare const SchemaFormContext: import("react").Context<SchemaFormContext<unknown>>;
