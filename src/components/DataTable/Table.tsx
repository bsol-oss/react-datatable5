import { Table as ChakraTable, List, TableRootProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useDataTableContext } from "./useDataTableContext";
import { HiColorSwatch } from "react-icons/hi";
import { EmptyState } from "../ui/empty-state";

export interface TableProps extends TableRootProps {
  showLoading?: boolean;
  loadingComponent?: JSX.Element;
  emptyComponent?: JSX.Element;
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
      width={table.getCenterTotalSize()}
      {...props}
    >
      {children}
    </ChakraTable.Root>
  );
};
