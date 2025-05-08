import { InputDefaultProps } from "./types";
export interface StringInputFieldProps extends InputDefaultProps {
}
export interface ForeignKeyProps {
    column: string;
    table: string;
    display_column: string;
}
export declare const StringInputField: ({ column, schema, prefix, }: StringInputFieldProps) => import("react/jsx-runtime").JSX.Element;
