import {
  OnChangeFn,
  Row,
  RowSelectionState,
  Table,
} from '@tanstack/react-table';

/**
 * Custom selector utilities to replace TanStack table selector primitives.
 * These work directly with rowSelection state instead of using table's built-in selectors.
 */

/**
 * Get all selected rows from the table based on rowSelection state
 */
export function getSelectedRows<TData>(
  table: Table<TData>,
  rowSelection: RowSelectionState
): Row<TData>[] {
  const selectedRowIds = Object.keys(rowSelection).filter(
    (id) => rowSelection[id] === true
  );
  return table
    .getRowModel()
    .rows.filter((row) => selectedRowIds.includes(row.id));
}

/**
 * Get the count of selected rows
 */
export function getSelectedRowCount<TData>(
  table: Table<TData>,
  rowSelection: RowSelectionState
): number {
  return getSelectedRows(table, rowSelection).length;
}

/**
 * Check if a specific row is selected
 */
export function isRowSelected(
  rowId: string,
  rowSelection: RowSelectionState
): boolean {
  return rowSelection[rowId] === true;
}

/**
 * Check if all rows in the table are selected
 */
export function areAllRowsSelected<TData>(
  table: Table<TData>,
  rowSelection: RowSelectionState
): boolean {
  const rows = table.getRowModel().rows;
  if (rows.length === 0) return false;
  return rows.every((row) => isRowSelected(row.id, rowSelection));
}

/**
 * Check if all rows on the current page are selected
 */
export function areAllPageRowsSelected<TData>(
  table: Table<TData>,
  rowSelection: RowSelectionState
): boolean {
  const pageRows = table.getRowModel().rows;
  if (pageRows.length === 0) return false;
  return pageRows.every((row) => isRowSelected(row.id, rowSelection));
}

/**
 * Check if some (but not all) rows are selected
 */
export function areSomeRowsSelected<TData>(
  table: Table<TData>,
  rowSelection: RowSelectionState
): boolean {
  const selectedCount = getSelectedRowCount(table, rowSelection);
  const totalCount = table.getRowModel().rows.length;
  return selectedCount > 0 && selectedCount < totalCount;
}

/**
 * Check if some (but not all) page rows are selected
 */
export function areSomePageRowsSelected<TData>(
  table: Table<TData>,
  rowSelection: RowSelectionState
): boolean {
  const pageRows = table.getRowModel().rows;
  if (pageRows.length === 0) return false;
  const selectedPageCount = pageRows.filter((row) =>
    isRowSelected(row.id, rowSelection)
  ).length;
  return selectedPageCount > 0 && selectedPageCount < pageRows.length;
}

/**
 * Create a toggle handler for a specific row
 */
export function createRowToggleHandler<TData>(
  row: Row<TData>,
  _rowSelection: RowSelectionState,
  setRowSelection: OnChangeFn<RowSelectionState>
) {
  return () => {
    setRowSelection((old) => {
      const newSelection = { ...old };
      if (newSelection[row.id]) {
        delete newSelection[row.id];
      } else {
        newSelection[row.id] = true;
      }
      return newSelection;
    });
  };
}

/**
 * Create a toggle handler for all rows
 */
export function createToggleAllRowsHandler<TData>(
  table: Table<TData>,
  rowSelection: RowSelectionState,
  setRowSelection: OnChangeFn<RowSelectionState>
) {
  return () => {
    const allSelected = areAllRowsSelected(table, rowSelection);
    if (allSelected) {
      // Deselect all
      setRowSelection({});
    } else {
      // Select all
      const newSelection: RowSelectionState = {};
      table.getRowModel().rows.forEach((row) => {
        newSelection[row.id] = true;
      });
      setRowSelection(newSelection);
    }
  };
}

/**
 * Create a toggle handler for all page rows
 */
export function createToggleAllPageRowsHandler<TData>(
  table: Table<TData>,
  rowSelection: RowSelectionState,
  setRowSelection: OnChangeFn<RowSelectionState>
) {
  return () => {
    const allPageSelected = areAllPageRowsSelected(table, rowSelection);
    const pageRows = table.getRowModel().rows;

    setRowSelection((old) => {
      const newSelection = { ...old };
      if (allPageSelected) {
        // Deselect all page rows
        pageRows.forEach((row) => {
          delete newSelection[row.id];
        });
      } else {
        // Select all page rows
        pageRows.forEach((row) => {
          newSelection[row.id] = true;
        });
      }
      return newSelection;
    });
  };
}

/**
 * Reset row selection (clear all selections)
 */
export function resetRowSelection(
  setRowSelection: OnChangeFn<RowSelectionState>
) {
  setRowSelection({});
}

/**
 * Check if a row can be selected (always true for now, can be extended)
 */
export function canRowSelect<TData>(row: Row<TData>): boolean {
  return row.getCanSelect?.() ?? true;
}
