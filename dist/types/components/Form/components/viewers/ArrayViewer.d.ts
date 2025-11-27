import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
export interface ArrayViewerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export declare const ArrayViewer: ({ schema, column, prefix }: ArrayViewerProps) => import("react/jsx-runtime").JSX.Element;
