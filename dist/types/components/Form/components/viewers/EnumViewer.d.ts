import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
export interface EnumViewerProps {
    column: string;
    isMultiple?: boolean;
    schema: CustomJSONSchema7;
    prefix: string;
}
export declare const EnumViewer: ({ column, isMultiple, schema, prefix, }: EnumViewerProps) => import("react/jsx-runtime").JSX.Element;
