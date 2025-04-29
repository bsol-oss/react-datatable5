import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface TextAreaViewerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export interface ForeignKeyProps {
    column: string;
    table: string;
    display_column: string;
}
export declare const TextAreaViewer: ({ column, schema, prefix, }: TextAreaViewerProps) => import("react/jsx-runtime").JSX.Element;
