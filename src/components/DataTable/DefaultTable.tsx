import { TableHeaderProps as ChakraHeaderProps } from "@chakra-ui/react";
import { TableBody, TableBodyProps } from "./display/TableBody";
import { TableControls, TableControlsProps } from "./TableControls";
import { TableFooter, TableFooterProps } from "./display/TableFooter";
import { TableHeader, TableHeaderProps } from "./display/TableHeader";
import { Table, TableProps } from "./display/Table";

export interface DefaultTableProps {
  showFooter?: boolean;
  showSelector?: boolean;
  tableProps?: Omit<TableProps, "children">;
  tHeadProps?: ChakraHeaderProps;
  controlProps?: TableControlsProps;
  tableFooterProps?: TableFooterProps;
  tableBodyProps?: TableBodyProps;
  tableHeaderProps?: TableHeaderProps;
  variant?: "" | "greedy";
}

export const DefaultTable = ({
  showFooter = false,
  tableProps = {},
  tableHeaderProps = {},
  tableBodyProps = {},
  controlProps = {},
  tableFooterProps = {},
  variant = "",
}: DefaultTableProps) => {
  if (variant === "greedy") {
    return (
      <TableControls {...controlProps}>
        <Table {...{ canResize: false, ...{...tableProps} }}>
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
