/// <reference types="react" />
import { Column, RowData } from "@tanstack/react-table";
declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        /**
         * @note you should provide a proper `filterfn` to handle the filtering when choosing `boolean`, `dateRange` and `custom`
         */
        filterVariant?: "text" | "range" | "select" | "tag" | "boolean" | "dateRange" | "custom";
        filterOptions?: string[];
        filterRangeConfig?: {
            min: number;
            max: number;
            step: number;
            defaultValue: [number, number];
        };
        renderFilter?: (column: Column<TData>) => JSX.Element;
    }
}
export declare const TableFilter: () => import("react/jsx-runtime").JSX.Element;
