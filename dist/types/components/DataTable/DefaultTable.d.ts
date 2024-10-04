import { TableProps } from "../../index";
import { TableControlsProps } from "./TableControls";
export interface DefaultTableProps extends TableControlsProps {
    showFooter?: boolean;
    showSelector?: boolean;
    tableProps?: Omit<TableProps, "children">;
}
export declare const DefaultTable: ({ totalText, showFilter, showFooter, fitTableWidth, fitTableHeight, isMobile, filterOptions, showFilterTags, showFilterName, showReload, showSelector, extraItems, tableProps, }: DefaultTableProps) => import("react/jsx-runtime").JSX.Element;
