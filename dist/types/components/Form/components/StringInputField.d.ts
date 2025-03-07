import { JSONSchema7 } from "json-schema";
import { ReactNode } from "react";
export interface StringInputFieldProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export interface ForeignKeyProps {
    column: string;
    table: string;
    display_column: string;
}
export interface CustomJSONSchema7 extends JSONSchema7 {
    gridColumn?: string;
    gridRow?: string;
    foreign_key?: ForeignKeyProps;
    variant?: string;
    renderDisplay: (item: unknown) => ReactNode;
}
export declare const StringInputField: ({ column, schema, prefix, }: StringInputFieldProps) => import("react/jsx-runtime").JSX.Element;
