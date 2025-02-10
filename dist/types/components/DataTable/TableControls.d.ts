import { ReactNode } from "react";
export interface TableControlsProps {
    totalText?: string;
    showFilter?: boolean;
    fitTableWidth?: boolean;
    fitTableHeight?: boolean;
    isMobile?: boolean;
    children?: ReactNode;
    showFilterName?: boolean;
    showFilterTags?: boolean;
    showReload?: boolean;
    filterOptions?: string[];
    extraItems?: ReactNode;
    loading?: boolean;
    hasError?: boolean;
}
export declare const TableControls: ({ totalText, showFilter, fitTableWidth, fitTableHeight, isMobile, children, showFilterName, showFilterTags, showReload, filterOptions, extraItems, loading, hasError, }: TableControlsProps) => import("react/jsx-runtime").JSX.Element;
