/// <reference types="react" />
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface DatePickerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export declare const CustomViewer: ({ column, schema, prefix }: DatePickerProps) => import("react").ReactNode;
