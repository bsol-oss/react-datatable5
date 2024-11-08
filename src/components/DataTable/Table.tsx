import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useDataTableContext } from "./useDataTableContext";

export interface TableProps extends ChakraTableProps {
  showLoading?: boolean;
  loadingComponent?: JSX.Element;
  children: ReactNode;
}

export const Table = ({
  children,
  showLoading = false,
  loadingComponent = <>Loading...</>,
  ...props
}: TableProps) => {
  const { table, loading } = useDataTableContext();
  if (showLoading) {
    return (
      <>
        {loading && loadingComponent}
        {!loading && (
          <ChakraTable
            width={table.getCenterTotalSize()}
            overflow={"auto"}
            {...props}
          >
            {children}
          </ChakraTable>
        )}
      </>
    );
  }

  return (
    <>
      <ChakraTable
        width={table.getCenterTotalSize()}
        overflowX={"auto"}
        {...props}
      >
        {children}
      </ChakraTable>
    </>
  );
};
