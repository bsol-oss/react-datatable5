import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface SchemaRendererProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export declare const SchemaRenderer: ({ schema, prefix, column, }: SchemaRendererProps) => import("react/jsx-runtime").JSX.Element;
