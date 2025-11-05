import { TableControls, TableControlsProps } from './controls/TableControls';
import { Table, TableProps } from './display/Table';
import { TableBody, TableBodyProps } from './display/TableBody';
import { TableBodySkeleton } from './display/TableBodySkeleton';
import { TableFooter, TableFooterProps } from './display/TableFooter';
import { TableHeader, TableHeaderProps } from './display/TableHeader';

export interface DefaultTableProps {
  showFooter?: boolean;
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
  tableProps = {},
  tableHeaderProps = {},
  tableBodyProps = {},
  tableFooterProps = {},
  controlProps = {},
  variant = '',
  isLoading = false,
}: DefaultTableProps) => {
  if (variant === 'greedy') {
    const bodyComponent = isLoading ? (
      <TableBodySkeleton
        showSelector={tableBodyProps.showSelector}
        {...{ canResize: false }}
      />
    ) : (
      <TableBody
        {...tableBodyProps}
        {...{ canResize: false, ...tableBodyProps }}
      />
    );
    return (
      <TableControls {...controlProps}>
        <Table
          {...{
            canResize: false,
            showLoading: isLoading,
            showSelector:
              tableHeaderProps.showSelector ??
              tableBodyProps.showSelector ??
              false,
            ...tableProps,
          }}
        >
          <TableHeader {...{ canResize: false, ...tableHeaderProps }} />
          {bodyComponent}
          {showFooter && (
            <TableFooter {...{ canResize: false, ...tableFooterProps }} />
          )}
        </Table>
      </TableControls>
    );
  }

  const bodyComponent = isLoading ? (
    <TableBodySkeleton
      showSelector={tableBodyProps.showSelector}
      canResize={tableBodyProps.canResize}
    />
  ) : (
    <TableBody {...tableBodyProps} />
  );
  return (
    <TableControls {...controlProps}>
      <Table
        {...{
          showLoading: isLoading,
          showSelector:
            tableHeaderProps.showSelector ??
            tableBodyProps.showSelector ??
            false,
          ...tableProps,
        }}
      >
        <TableHeader {...tableHeaderProps} />
        {bodyComponent}
        {showFooter && <TableFooter {...tableFooterProps} />}
      </Table>
    </TableControls>
  );
};
