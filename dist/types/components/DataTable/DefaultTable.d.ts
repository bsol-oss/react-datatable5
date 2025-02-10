import { TableHeaderProps } from "@chakra-ui/react";
import { TableProps } from "../../index";
import { TableControlsProps } from "./TableControls";
export interface DefaultTableProps {
    showFooter?: boolean;
    showSelector?: boolean;
    tableProps?: Omit<TableProps, "children">;
    tHeadProps?: TableHeaderProps;
    controlProps?: TableControlsProps;
}
export declare const DefaultTable: ({ showFooter, showSelector, tableProps, tHeadProps, controlProps, }: DefaultTableProps) => import("react/jsx-runtime").JSX.Element;
