import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
export interface IdViewerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
    isMultiple?: boolean;
}
export declare const IdViewer: ({ column, schema, prefix, isMultiple, }: IdViewerProps) => import("react/jsx-runtime").JSX.Element;
