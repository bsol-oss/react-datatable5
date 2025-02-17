export interface IdPickerProps {
    column: string;
    in_table: string;
    column_ref: string;
    display_column: string;
    isMultiple?: boolean;
}
export declare const IdPicker: ({ column, in_table, column_ref, display_column, isMultiple, }: IdPickerProps) => import("react/jsx-runtime").JSX.Element;
