import { TableControls, TableControlsProps } from "./controls/TableControls";
import { Table, TableProps } from "./display/Table";
import { TableBody, TableBodyProps } from "./display/TableBody";
import { TableFooter, TableFooterProps } from "./display/TableFooter";
import { TableHeader, TableHeaderProps } from "./display/TableHeader";

export interface DefaultTableProps {
  showFooter?: boolean;
  tableProps?: Omit<TableProps, "children">;
  tableHeaderProps?: TableHeaderProps;
  tableBodyProps?: TableBodyProps;
  tableFooterProps?: TableFooterProps;
  controlProps?: TableControlsProps;
  variant?: "" | "greedy";
}

export const DefaultTable = ({
  showFooter = false,
  tableProps = {},
  tableHeaderProps = {},
  tableBodyProps = {},
  tableFooterProps = {},
  controlProps = {},
  variant = "",
}: DefaultTableProps) => {
  if (variant === "greedy") {
    return (
      <TableControls {...controlProps}>
        <Table {...{ canResize: false, ...{ ...tableProps } }}>
          <TableHeader {...{ canResize: false, ...tableHeaderProps }} />
          <TableBody {...{ canResize: false, ...tableBodyProps }} />
          {showFooter && (
            <TableFooter {...{ canResize: false, ...tableFooterProps }} />
          )}
        </Table>
      </TableControls>
    );
  }
  return (
    <TableControls {...controlProps}>
      <Table {...tableProps}>
        <TableHeader {...tableHeaderProps} />
        <TableBody {...tableBodyProps} />
        {showFooter && <TableFooter {...tableFooterProps} />}
      </Table>
    </TableControls>
  );
};
