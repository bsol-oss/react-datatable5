import { ReactNode } from "react";
import { Table as ChakraTable, Container } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export interface TableProps {
  children: ReactNode;
}

export const Table = ({ children }: TableProps) => {
  const { table } = useDataTable();
  return (
    <Container padding={'0rem'} maxW="100%" overflowX={"scroll"}>
      <ChakraTable width={table.getCenterTotalSize()} variant="unstyled">
        {children}
      </ChakraTable>
    </Container>
  );
};

