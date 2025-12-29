import { TableControls, TableControlsProps } from './controls/TableControls';
import { MobileTableControls } from './controls/MobileTableControls';
import { Table, TableProps } from './display/Table';
import { TableBody, TableBodyProps } from './display/TableBody';
import { TableBodySkeleton } from './display/TableBodySkeleton';
import { TableFooter, TableFooterProps } from './display/TableFooter';
import { TableHeader, TableHeaderProps } from './display/TableHeader';
import { MobileTableDisplay } from './display/MobileTableDisplay';
import { useIsMobile } from './hooks/useIsMobile';

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
  const isMobile = useIsMobile();

  // Early return for mobile display
  if (isMobile) {
    return (
      <MobileTableControls {...controlProps}>
        <MobileTableDisplay
          showSelector={
            tableHeaderProps.showSelector ??
            tableBodyProps.showSelector ??
            false
          }
          isLoading={isLoading}
        />
      </MobileTableControls>
    );
  }

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
