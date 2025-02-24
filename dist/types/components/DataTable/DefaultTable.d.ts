import { TableHeaderProps as ChakraHeaderProps } from "@chakra-ui/react";
import { TableBodyProps } from "./TableBody";
import { TableControlsProps } from "./TableControls";
import { TableFooterProps } from "./TableFooter";
import { TableHeaderProps } from "./TableHeader";
import { TableProps } from "./Table";
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
