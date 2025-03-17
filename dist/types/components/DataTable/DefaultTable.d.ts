import { TableControlsProps } from "./controls/TableControls";
import { TableProps } from "./display/Table";
import { TableBodyProps } from "./display/TableBody";
import { TableFooterProps } from "./display/TableFooter";
import { TableHeaderProps } from "./display/TableHeader";
export interface DefaultTableProps {
    showFooter?: boolean;
    tableProps?: Omit<TableProps, "children">;
    tableHeaderProps?: TableHeaderProps;
    tableBodyProps?: TableBodyProps;
    tableFooterProps?: TableFooterProps;
    controlProps?: TableControlsProps;
    variant?: "" | "greedy";
}
export declare const DefaultTable: ({ showFooter, tableProps, tableHeaderProps, tableBodyProps, tableFooterProps, controlProps, variant, }: DefaultTableProps) => import("react/jsx-runtime").JSX.Element;
