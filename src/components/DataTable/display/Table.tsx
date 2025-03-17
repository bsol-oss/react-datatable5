import { Table as ChakraTable, List, TableRootProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { HiColorSwatch } from "react-icons/hi";
import { EmptyState } from "../../ui/empty-state";
import { useDataTableContext } from "../context/useDataTableContext";

export interface TableProps extends TableRootProps {
  showLoading?: boolean;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  canResize?: boolean;
  children: ReactNode;
}

const EmptyResult = (
  <EmptyState
    icon={<HiColorSwatch />}
    title="No results found"
    description="Try adjusting your search"
  >
    <List.Root variant="marker">
      <List.Item>Try removing filters</List.Item>
      <List.Item>Try different keywords</List.Item>
    </List.Root>
  </EmptyState>
);

export const Table = ({
  children,
  emptyComponent = EmptyResult,
  canResize = true,
  ...props
}: TableProps) => {
  const { table } = useDataTableContext();

  if (table.getRowModel().rows.length <= 0) {
    return emptyComponent;
  }

  return (
    <ChakraTable.Root
      stickyHeader
      variant={"outline"}
      width={canResize ? table.getCenterTotalSize() : undefined}
      display={"grid"}
      alignContent={"start"}
      overflowY={"auto"}
      {...{ bg: { base: "colorPalette.50", _dark: "colorPalette.950" } }}
      {...props}
    >
      {children}
    </ChakraTable.Root>
  );
};
