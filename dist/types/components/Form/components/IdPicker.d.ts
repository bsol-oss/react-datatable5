import { CustomJSONSchema7 } from "./StringInputField";
export interface IdPickerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
    isMultiple?: boolean;
}
export declare const IdPicker: ({ column, schema, prefix, isMultiple, }: IdPickerProps) => import("react/jsx-runtime").JSX.Element;
