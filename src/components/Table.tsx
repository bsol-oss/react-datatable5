import { Table as ChakraTable } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useDataTable } from "./useDataTable";

export interface TableProps {
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
  const { table, loading } = useDataTable();
  if (showLoading) {
    return (
      <>
        {loading && loadingComponent}
        {!loading && (
          <ChakraTable
            width={table.getCenterTotalSize()}
            overflowX={"scroll"}
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
        overflowX={"scroll"}
        {...props}
      >
        {children}
      </ChakraTable>
    </>
  );
};
