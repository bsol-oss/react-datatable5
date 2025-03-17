import { TableHeaderProps as ChakraTableHeaderProps, TableRowProps } from "@chakra-ui/react";
export interface TableHeaderProps {
    canResize?: boolean;
    showSelector?: boolean;
    isSticky?: boolean;
    tableHeaderProps?: ChakraTableHeaderProps;
    tableRowProps?: TableRowProps;
}
export declare const TableHeader: ({ canResize, showSelector, isSticky, tableHeaderProps, tableRowProps, }: TableHeaderProps) => import("react/jsx-runtime").JSX.Element;
