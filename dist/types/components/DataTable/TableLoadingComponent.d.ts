import { ReactNode } from "react";
export interface TableLoadingComponentProps {
    render: (loading: boolean) => ReactNode;
}
export declare const TableLoadingComponent: ({ render, }: TableLoadingComponentProps) => import("react/jsx-runtime").JSX.Element;
