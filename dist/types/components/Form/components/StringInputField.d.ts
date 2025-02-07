import { JSONSchema7 } from "json-schema";
export interface StringInputFieldProps {
    column: string;
}
export interface CustomJSONSchema7 extends JSONSchema7 {
    gridColumn?: string;
    gridRow?: string;
    title?: string;
}
export declare const StringInputField: ({ column }: StringInputFieldProps) => import("react/jsx-runtime").JSX.Element;
