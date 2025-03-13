import { TableHeaderProps as ChakraHeaderProps } from "@chakra-ui/react";
import { TableBodyProps } from "./display/TableBody";
import { TableControlsProps } from "./controls/TableControls";
import { TableFooterProps } from "./display/TableFooter";
import { TableHeaderProps } from "./display/TableHeader";
import { TableProps } from "./display/Table";
export interface DefaultTableProps {
    showFooter?: boolean;
    showSelector?: boolean;
    tableProps?: Omit<TableProps, "children">;
    tHeadProps?: ChakraHeaderProps;
    controlProps?: TableControlsProps;
    tableFooterProps?: TableFooterProps;
    tableBodyProps?: TableBodyProps;
    tableHeaderProps?: TableHeaderProps;
    variant?: "" | "greedy";
}
export declare const DefaultTable: ({ showFooter, tableProps, tableHeaderProps, tableBodyProps, controlProps, tableFooterProps, variant, }: DefaultTableProps) => import("react/jsx-runtime").JSX.Element;
