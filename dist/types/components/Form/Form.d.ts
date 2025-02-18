import { JSONSchema7 } from "json-schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
export interface DisplayTextProps {
    title?: string;
    addNew?: string;
    submit?: string;
    confirm?: string;
    save?: string;
    empty?: string;
    cancel?: string;
    submitSuccess?: string;
    submitAgain?: string;
    fieldRequired?: string;
    total: string;
    showing: string;
    close: string;
    typeToSearch: string;
    showMore: string;
}
export interface FormProps<TData extends FieldValues> {
    schema: JSONSchema7;
    serverUrl: string;
    order?: string[];
    ignore?: string[];
    onSubmit?: SubmitHandler<TData>;
    preLoadedValues?: object;
    rowNumber?: number | string;
    displayText?: Partial<DisplayTextProps>;
}
export interface CustomJSONSchema7Definition extends JSONSchema7 {
    variant: string;
    in_table: string;
    column_ref: string;
    display_column: string;
    gridColumn: string;
    gridRow: string;
}
export declare const Form: <TData extends FieldValues>({ schema, serverUrl, order, ignore, onSubmit, preLoadedValues, rowNumber, displayText, }: FormProps<TData>) => import("react/jsx-runtime").JSX.Element;
