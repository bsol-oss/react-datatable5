import { Row } from "@tanstack/react-table";
export interface TableBodyProps {
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
}
export interface TableRowSelectorProps<TData> {
    index: number;
    row: Row<TData>;
    hoveredRow: number;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
}
export declare const TableBody: ({ pinnedBgColor, }: TableBodyProps) => import("react/jsx-runtime").JSX.Element;
