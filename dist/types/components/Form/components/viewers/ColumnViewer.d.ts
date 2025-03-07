import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface ColumnViewerProps {
    column: string;
    properties: Record<string, CustomJSONSchema7>;
    prefix: string;
}
export declare const ColumnViewer: ({ column, properties, prefix, }: ColumnViewerProps) => import("react/jsx-runtime").JSX.Element;
