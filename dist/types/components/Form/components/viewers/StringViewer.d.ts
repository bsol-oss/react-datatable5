import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
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
export declare const StringViewer: ({ column, schema, prefix, }: StringInputFieldProps) => import("react/jsx-runtime").JSX.Element;
