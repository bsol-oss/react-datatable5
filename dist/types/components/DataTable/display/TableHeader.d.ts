import { TableHeaderProps as ChakraTableHeaderProps, TableRowProps } from "@chakra-ui/react";
export interface TableHeaderTexts {
    pinColumn?: string;
    cancelPin?: string;
    sortAscending?: string;
    sortDescending?: string;
    clearSorting?: string;
}
export interface TableHeaderProps {
    canResize?: boolean;
    showSelector?: boolean;
    isSticky?: boolean;
    tableHeaderProps?: ChakraTableHeaderProps;
    tableRowProps?: TableRowProps;
    /**
     * Default text configuration for all columns.
     * Can be overridden per column via meta.headerTexts.
     */
    defaultTexts?: TableHeaderTexts;
}
/**
 * TableHeader component with configurable text strings.
 *
 * @example
 * // Using default texts
 * <TableHeader />
 *
 * @example
 * // Customizing default texts for all columns
 * <TableHeader
 *   defaultTexts={{
 *     pinColumn: "Pin This Column",
 *     sortAscending: "Sort A-Z"
 *   }}
 * />
 *
 * @example
 * // Customizing texts per column via meta
 * const columns = [
 *   columnHelper.accessor("name", {
 *     header: "Name",
 *     meta: {
 *       headerTexts: {
 *         pinColumn: "Pin Name Column",
 *         sortAscending: "Sort Names A-Z"
 *       }
 *     }
 *   })
 * ];
 */
export declare const TableHeader: ({ canResize, showSelector, isSticky, tableHeaderProps, tableRowProps, defaultTexts, }: TableHeaderProps) => import("react/jsx-runtime").JSX.Element;
