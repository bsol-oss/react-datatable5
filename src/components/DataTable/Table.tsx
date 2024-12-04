import { Table as ChakraTable, TableRootProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useDataTableContext } from "./useDataTableContext";

export interface TableProps extends TableRootProps {
  showLoading?: boolean;
  loadingComponent?: JSX.Element;
  children: ReactNode;
}

export const Table = ({ children, ...props }: TableProps) => {
  const { table } = useDataTableContext();

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
