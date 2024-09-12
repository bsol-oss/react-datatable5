import { Row } from "@tanstack/react-table";
export interface TableBodyProps {
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
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
export declare const TableBody: ({ pinnedBgColor, showSelector, }: TableBodyProps) => import("react/jsx-runtime").JSX.Element;
