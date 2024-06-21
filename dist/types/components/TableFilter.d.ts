import { RowData } from "@tanstack/react-table";
declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "range" | "select";
        filterOptions?: string[];
    }
}
export declare const TableFilter: () => import("react/jsx-runtime").JSX.Element;
