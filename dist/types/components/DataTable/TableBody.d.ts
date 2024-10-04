import { Row } from "@tanstack/react-table";
export interface TableBodyProps {
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
    alwaysShowSelector?: boolean;
}
export interface TableRowSelectorProps<TData> {
    index: number;
    row: Row<TData>;
    hoveredRow: number;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    alwaysShowSelector?: boolean;
}
export declare const TableBody: ({ pinnedBgColor, showSelector, alwaysShowSelector, }: TableBodyProps) => import("react/jsx-runtime").JSX.Element;
