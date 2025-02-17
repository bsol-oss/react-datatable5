/// <reference types="react" />
import { JSONSchema7 } from "json-schema";
import { FieldValues } from "react-hook-form";
import { DisplayTextProps } from "./Form";
export interface SchemaFormContext<TData extends FieldValues> {
    schema: JSONSchema7;
    serverUrl: string;
    order: string[];
    ignore: string[];
    displayText: DisplayTextProps;
    onSubmit?: (data: TData) => Promise<void>;
    preLoadedValues: object;
    rowNumber?: number | string;
}
export declare const SchemaFormContext: import("react").Context<SchemaFormContext<unknown>>;
