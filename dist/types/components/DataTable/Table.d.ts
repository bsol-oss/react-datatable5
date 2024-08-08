import { TableProps as ChakraTableProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TableProps extends ChakraTableProps {
    showLoading?: boolean;
    loadingComponent?: JSX.Element;
    children: ReactNode;
}
export declare const Table: ({ children, showLoading, loadingComponent, ...props }: TableProps) => import("react/jsx-runtime").JSX.Element;
