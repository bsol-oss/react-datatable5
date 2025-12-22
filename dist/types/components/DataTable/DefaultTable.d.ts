import { TableControlsProps } from './controls/TableControls';
import { TableProps } from './display/Table';
import { TableBodyProps } from './display/TableBody';
import { TableFooterProps } from './display/TableFooter';
import { TableHeaderProps } from './display/TableHeader';
export interface DefaultTableProps {
    showFooter?: boolean;
    showHeader?: boolean;
    tableProps?: Omit<TableProps, 'children'>;
    tableHeaderProps?: TableHeaderProps;
    tableBodyProps?: TableBodyProps;
    tableFooterProps?: TableFooterProps;
    controlProps?: TableControlsProps;
    variant?: '' | 'greedy';
    isLoading?: boolean;
}
export declare const DefaultTable: ({ showFooter, showHeader, tableProps, tableHeaderProps, tableBodyProps, tableFooterProps, controlProps, variant, isLoading, }: DefaultTableProps) => import("react/jsx-runtime").JSX.Element;
