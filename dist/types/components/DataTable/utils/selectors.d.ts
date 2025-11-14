import { OnChangeFn, Row, RowSelectionState, Table } from '@tanstack/react-table';
/**
 * Custom selector utilities to replace TanStack table selector primitives.
 * These work directly with rowSelection state instead of using table's built-in selectors.
 */
/**
 * Get all selected rows from the table based on rowSelection state
 */
export declare function getSelectedRows<TData>(table: Table<TData>, rowSelection: RowSelectionState): Row<TData>[];
/**
 * Get the count of selected rows
 */
export declare function getSelectedRowCount<TData>(table: Table<TData>, rowSelection: RowSelectionState): number;
/**
 * Check if a specific row is selected
 */
export declare function isRowSelected(rowId: string, rowSelection: RowSelectionState): boolean;
/**
 * Check if all rows in the table are selected
 */
export declare function areAllRowsSelected<TData>(table: Table<TData>, rowSelection: RowSelectionState): boolean;
/**
 * Check if all rows on the current page are selected
 */
export declare function areAllPageRowsSelected<TData>(table: Table<TData>, rowSelection: RowSelectionState): boolean;
/**
 * Check if some (but not all) rows are selected
 */
export declare function areSomeRowsSelected<TData>(table: Table<TData>, rowSelection: RowSelectionState): boolean;
/**
 * Check if some (but not all) page rows are selected
 */
export declare function areSomePageRowsSelected<TData>(table: Table<TData>, rowSelection: RowSelectionState): boolean;
/**
 * Create a toggle handler for a specific row
 */
export declare function createRowToggleHandler<TData>(row: Row<TData>, rowSelection: RowSelectionState, setRowSelection: OnChangeFn<RowSelectionState>): () => void;
/**
 * Create a toggle handler for all rows
 */
export declare function createToggleAllRowsHandler<TData>(table: Table<TData>, rowSelection: RowSelectionState, setRowSelection: OnChangeFn<RowSelectionState>): () => void;
/**
 * Create a toggle handler for all page rows
 */
export declare function createToggleAllPageRowsHandler<TData>(table: Table<TData>, rowSelection: RowSelectionState, setRowSelection: OnChangeFn<RowSelectionState>): () => void;
/**
 * Reset row selection (clear all selections)
 */
export declare function resetRowSelection(setRowSelection: OnChangeFn<RowSelectionState>): void;
/**
 * Check if a row can be selected (always true for now, can be extended)
 */
export declare function canRowSelect<TData>(row: Row<TData>): boolean;
