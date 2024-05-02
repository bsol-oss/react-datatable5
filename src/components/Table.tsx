import React, { ReactNode, useEffect, useState } from "react";
// import { Box, Container } from "@chakra-ui/react";

// import {
//   FilterContext,
//   TableStatusContext,
// } from "./globalpartials/GlobalContext";
// import { FilterInterface } from "../const/types";
// import Footer from "./Footer";
// import { TableContext } from "./DataTableContext";
// import {
//   useReactTable,
//   getCoreRowModel,
//   ColumnFiltersState,
//   SortingState,
//   Column,
// } from "@tanstack/react-table";
// import useDataFromUrl from "./useDataFromUrl";
import { Container, Table as ChakraTable } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => {
  const { table } = useDataTable();
  return (
    <Container maxW="100%" overflowY={'scroll'}>
      <ChakraTable width={table.getCenterTotalSize()} variant="simple">
        {children}
      </ChakraTable>
    </Container>
  );
};

export default Table;
