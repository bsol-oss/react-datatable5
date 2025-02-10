import { TableHeaderProps } from "@chakra-ui/react";
import { Table, TableProps } from "../../index";
import { TableBody } from "./TableBody";
import { TableControls, TableControlsProps } from "./TableControls";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";

export interface DefaultTableProps {
  showFooter?: boolean;
  showSelector?: boolean;
  tableProps?: Omit<TableProps, "children">;
  tHeadProps?: TableHeaderProps;
  controlProps?: TableControlsProps;
}

export const DefaultTable = ({
  showFooter = false,
  showSelector = false,
  tableProps = {},
  tHeadProps = {},
  controlProps = {},
}: DefaultTableProps) => {
  return (
    <TableControls {...controlProps}>
      <Table {...tableProps}>
        <TableHeader
          canResize
          showSelector={showSelector}
          tHeadProps={tHeadProps}
        />
        <TableBody showSelector={showSelector} />
        {showFooter && <TableFooter showSelector={showSelector} />}
      </Table>
    </TableControls>
  );
};
