import { ReactNode } from "react";
export interface TableControlsProps {
    totalText?: string;
    fitTableWidth?: boolean;
    fitTableHeight?: boolean;
    isMobile?: boolean;
    children?: ReactNode;
    showGlobalFilter?: boolean;
    showFilter?: boolean;
    showFilterName?: boolean;
    showFilterTags?: boolean;
    showReload?: boolean;
    filterOptions?: string[];
    extraItems?: ReactNode;
    loading?: boolean;
    hasError?: boolean;
}
export declare const TableControls: ({ totalText, fitTableWidth, fitTableHeight, isMobile, children, showGlobalFilter, showFilter, showFilterName, showFilterTags, showReload, filterOptions, extraItems, loading, hasError, }: TableControlsProps) => import("react/jsx-runtime").JSX.Element;
