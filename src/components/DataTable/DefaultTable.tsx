import { TableControls, TableControlsProps } from './controls/TableControls';
import { Table, TableProps } from './display/Table';
import { TableBody, TableBodyProps } from './display/TableBody';
import { TableBodySkeleton } from './display/TableBodySkeleton';
import { TableFooter, TableFooterProps } from './display/TableFooter';
import { TableHeader, TableHeaderProps } from './display/TableHeader';

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

export const DefaultTable = ({
  showFooter = false,
  showHeader = true,
  tableProps = {},
  tableHeaderProps = {},
  tableBodyProps = {},
  tableFooterProps = {},
  controlProps = {},
  variant = 'greedy',
  isLoading = false,
}: DefaultTableProps) => {
  const isGreedy = variant === 'greedy';
  const canResize = !isGreedy;

  const bodyComponent = isLoading ? (
    <TableBodySkeleton
      showSelector={tableBodyProps.showSelector}
      canResize={canResize}
    />
  ) : (
    <TableBody {...tableBodyProps} canResize={canResize} />
  );

  return (
    <TableControls {...controlProps}>
      <Table
        {...{
          canResize,
          showLoading: isLoading,
          showSelector:
            tableHeaderProps.showSelector ??
            tableBodyProps.showSelector ??
            false,
          ...tableProps,
        }}
      >
        {showHeader && <TableHeader {...{ canResize, ...tableHeaderProps }} />}
        {bodyComponent}
        {showFooter && <TableFooter {...{ canResize, ...tableFooterProps }} />}
      </Table>
    </TableControls>
  );
};
