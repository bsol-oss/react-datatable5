import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
export interface ObjectViewerProps {
    schema: CustomJSONSchema7;
    column: string;
    prefix: string;
}
export declare const ObjectViewer: ({ schema, column, prefix }: ObjectViewerProps) => import("react/jsx-runtime").JSX.Element;
