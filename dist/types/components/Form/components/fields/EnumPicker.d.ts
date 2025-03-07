import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface IdPickerProps {
    column: string;
    isMultiple?: boolean;
    schema: CustomJSONSchema7;
    prefix: string;
}
export declare const EnumPicker: ({ column, isMultiple, schema, prefix, }: IdPickerProps) => import("react/jsx-runtime").JSX.Element;
