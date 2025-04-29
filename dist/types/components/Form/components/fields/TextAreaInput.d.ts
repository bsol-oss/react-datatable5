import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface TextAreaInputProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export interface ForeignKeyProps {
    column: string;
    table: string;
    display_column: string;
}
export declare const TextAreaInput: ({ column, schema, prefix, }: TextAreaInputProps) => import("react/jsx-runtime").JSX.Element;
