import { JSONSchema7 } from "json-schema";
import { ReactNode } from "react";
import { ForeignKeyProps } from "../fields/StringInputField";
import { UseFormReturn } from "react-hook-form";
export interface CustomJSONSchema7 extends JSONSchema7 {
    gridColumn?: string;
    gridRow?: string;
    foreign_key?: ForeignKeyProps;
    variant?: string;
    renderDisplay?: (item: unknown) => ReactNode;
    inputRender?: (props: {
        column: string;
        schema: CustomJSONSchema7;
        prefix: string;
        formContext: UseFormReturn;
    }) => ReactNode;
    inputViewerRender?: (props: {
        column: string;
        schema: CustomJSONSchema7;
        prefix: string;
        formContext: UseFormReturn;
    }) => ReactNode;
    dateFormat?: string;
    displayDateFormat?: string;
    format?: string;
}
export interface TagPickerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
