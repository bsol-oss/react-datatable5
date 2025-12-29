import { OnChangeFn, Table } from '@tanstack/react-table';
import { createContext } from 'react';
import { DataTableProps } from '../DataTable';

export interface DataTableLabel {
  view: string;
  edit: string;
  filterButtonText: string;
  filterTitle: string;
  filterReset: string;
  filterClose: string;
  reloadTooltip: string;
  reloadButtonText: string;
  resetSelection: string;
  resetSorting: string;
  rowCountText: string;
  hasErrorText: string;
  globalFilterPlaceholder: string;
  trueLabel: string;
  falseLabel: string;
}

export interface DataTableContextProps<TData = unknown>
  extends Omit<DataTableProps, 'translate'> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  type: 'client' | 'server';
  tableLabel: DataTableLabel;
}

export const DataTableContext = createContext<DataTableContextProps>({
  table: {} as Table<unknown>,
  globalFilter: '',
  setGlobalFilter: () => {},
  type: 'client',
  data: [],
  columns: [],
  columnOrder: [],
  columnFilters: [],
  density: 'sm',
  sorting: [],
  setPagination: function (): void {
    throw new Error('Function not implemented.');
  },
  setSorting: function (): void {
    throw new Error('Function not implemented.');
  },
  setColumnFilters: function (): void {
    throw new Error('Function not implemented.');
  },
  setRowSelection: function (): void {
    throw new Error('Function not implemented.');
  },
  setColumnOrder: function (): void {
    throw new Error('Function not implemented.');
  },
  setDensity: function (): void {
    throw new Error('Function not implemented.');
  },
  setColumnVisibility: function (): void {
    throw new Error('Function not implemented.');
  },
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  rowSelection: {},
  columnVisibility: {},
  tableLabel: {
    view: 'View',
    edit: 'Edit',
    filterButtonText: 'Filter',
    filterTitle: 'Filter',
    filterReset: 'Reset',
    filterClose: 'Close',
    reloadTooltip: 'Reload',
    reloadButtonText: 'Reload',
    resetSelection: 'Reset Selection',
    resetSorting: 'Reset Sorting',
    rowCountText: '',
    hasErrorText: 'Has Error',
    globalFilterPlaceholder: 'Search',
    trueLabel: 'True',
    falseLabel: 'False',
  },
});
