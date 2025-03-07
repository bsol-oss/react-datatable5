import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface ArrayRendererProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export declare const ArrayRenderer: ({ schema, column, prefix, }: ArrayRendererProps) => import("react/jsx-runtime").JSX.Element;
