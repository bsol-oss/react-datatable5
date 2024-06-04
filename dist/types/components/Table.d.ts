import { ReactNode } from "react";
export interface TableProps {
    showLoading?: boolean;
    loadingComponent?: JSX.Element;
    children: ReactNode;
}
export declare const Table: ({ children, showLoading, loadingComponent, ...props }: TableProps) => import("react/jsx-runtime").JSX.Element;
