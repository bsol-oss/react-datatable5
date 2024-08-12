import { TableControlsProps } from "./TableControls";
export interface DefaultTableProps extends TableControlsProps {
    showFooter?: boolean;
}
export declare const DefaultTable: ({ totalText, showFilter, showFooter, fitTableWidth, fitTableHeight, isMobile, filterOptions, showFilterTags, showFilterName, showReload, }: DefaultTableProps) => import("react/jsx-runtime").JSX.Element;
