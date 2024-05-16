import { ReactNode } from "react";
import { Table as ChakraTable, Container } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export interface TableProps {
  children: ReactNode;
}

export const Table = ({ children, ...props }: TableProps) => {
  const { table } = useDataTable();
  return (
    <ChakraTable
      width={table.getCenterTotalSize()}
      overflowX={"scroll"}
      {...props}
    >
      {children}
    </ChakraTable>
  );
};
