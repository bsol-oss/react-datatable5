import { Table } from "../../index";
import { TableBody } from "./TableBody";
import { TableControls, TableControlsProps } from "./TableControls";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";

export interface DefaultTableProps extends TableControlsProps {
  showFooter?: boolean;
}

export const DefaultTable = ({
  totalText = "Total:",
  showFilter = false,
  showFooter = false,
  fitTableWidth = false,
  fitTableHeight = false,
  isMobile = false,
  filterOptions = [],
  showFilterTags = false,
  showFilterName = false,
  showReload = false,
  extraItems = <></>,
}: DefaultTableProps) => {
  return (
    <TableControls
      totalText={totalText}
      showFilter={showFilter}
      fitTableWidth={fitTableWidth}
      fitTableHeight={fitTableHeight}
      isMobile={isMobile}
      filterOptions={filterOptions}
      showFilterName={showFilterName}
      showFilterTags={showFilterTags}
      showReload={showReload}
      extraItems={extraItems}
    >
      <Table variant={"striped"}>
        <TableHeader canResize />
        <TableBody />
        {showFooter && <TableFooter />}
      </Table>
    </TableControls>
  );
};
