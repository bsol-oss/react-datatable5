import { JSONSchema7 } from "json-schema";
import { Dispatch, SetStateAction } from "react";
import { FieldValues } from "react-hook-form";
import { DisplayTextProps } from "./Form";
export interface SchemaFormContext<TData extends FieldValues> {
    schema: JSONSchema7;
    serverUrl: string;
    order: string[];
    ignore: string[];
    displayText: Partial<DisplayTextProps>;
    onSubmit?: (data: TData) => Promise<void>;
    rowNumber?: number | string;
    idMap: Record<string, object>;
    setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
}
export declare const SchemaFormContext: import("react").Context<SchemaFormContext<unknown>>;
