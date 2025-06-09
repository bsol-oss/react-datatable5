import { FormRootProps } from "./FormRoot";
import { FieldValues } from "react-hook-form";
export interface DefaultFormProps<TData extends FieldValues> {
    formConfig: Omit<FormRootProps<TData>, "children">;
    showTitle?: boolean;
}
export declare const DefaultForm: <TData extends FieldValues>({ formConfig, }: DefaultFormProps<TData>) => import("react/jsx-runtime").JSX.Element;
