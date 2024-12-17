import { TableRootProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TableProps extends TableRootProps {
    showLoading?: boolean;
    loadingComponent?: JSX.Element;
    emptyComponent?: JSX.Element;
    children: ReactNode;
}
export declare const Table: ({ children, emptyComponent, ...props }: TableProps) => import("react/jsx-runtime").JSX.Element;
