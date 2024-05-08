import { ReactNode } from "react";
import { Table as ChakraTable, Container } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => {
  const { table } = useDataTable();
  return (
    <Container maxW="100%" overflowY={"scroll"}>
      <ChakraTable width={table.getCenterTotalSize()} variant="simple">
        {children}
      </ChakraTable>
    </Container>
  );
};

export default Table;
