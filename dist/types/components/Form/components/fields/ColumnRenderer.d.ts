import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface ColumnRendererProps {
    column: string;
    properties: Record<string, CustomJSONSchema7>;
    prefix: string;
}
export declare const ColumnRenderer: ({ column, properties, prefix, }: ColumnRendererProps) => import("react/jsx-runtime").JSX.Element;
