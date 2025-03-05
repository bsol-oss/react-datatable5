import { ReactNode } from "react";
export interface TableControlsProps {
    totalText?: string;
    fitTableWidth?: boolean;
    fitTableHeight?: boolean;
    children?: ReactNode;
    showGlobalFilter?: boolean;
    showFilter?: boolean;
    showFilterName?: boolean;
    showFilterTags?: boolean;
    showReload?: boolean;
    showPagination?: boolean;
    showPageSizeControl?: boolean;
    showPageCountText?: boolean;
    showView?: boolean;
    filterOptions?: string[];
    extraItems?: ReactNode;
    loading?: boolean;
    hasError?: boolean;
}
export declare const TableControls: ({ fitTableWidth, fitTableHeight, children, showGlobalFilter, showFilter, showFilterName, showFilterTags, showReload, showPagination, showPageSizeControl, showPageCountText, showView, filterOptions, extraItems, loading, hasError, }: TableControlsProps) => import("react/jsx-runtime").JSX.Element;
