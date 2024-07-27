/// <reference types="react" />
export interface TableControlsProps {
    totalText?: string;
    showFilter?: boolean;
    fitTableWidth?: boolean;
    fitTableHeight?: boolean;
    isMobile?: boolean;
    children?: JSX.Element;
    showFilterName?: boolean;
    showFilterTags?: boolean;
    filterOptions?: string[];
}
export declare const TableControls: ({ totalText, showFilter, fitTableWidth, fitTableHeight, isMobile, children, showFilterName, showFilterTags, filterOptions, }: TableControlsProps) => import("react/jsx-runtime").JSX.Element;
