import {
  Box,
  ButtonGroup,
  ChakraProvider,
  Flex,
  theme,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  DataTable,
  EditFilterButton,
  EditOrderButton,
  EditSortingButton,
  EditViewButton,
  PageSizeControl,
  TableCardContainer,
  TableCards,
  TablePagination,
  TableSelector,
  TextCell,
} from "../../index";

import { data, Product } from "../product_data";

interface RowActionsProps {
  row: Product;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>no actions</>;
};

const CardViewShowcase = () => {
  const columnHelper = createColumnHelper<Product>();

  const columns: ColumnDef<Product>[] = [
    // Display Column
    columnHelper.display({
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (props) => <RowActions row={props.row.original} />,
    }),

    // Grouping Column
    columnHelper.group({
      header: "Information",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("id", {
          cell: (props) => {
            return <TextCell>{props.row.original.id}</TextCell>;
          },
          header: () => <span>Id</span>,
          footer: (props) => props.column.id,
          size: 50,
        }),
        columnHelper.accessor("title", {
          cell: (props) => {
            return (
              <Box padding={"0rem"}>
                <TextCell label={props.row.original.title}>
                  {props.row.original.title}
                </TextCell>
              </Box>
            );
          },
          header: () => <Box>Title</Box>,
          footer: (props) => props.column.id,
          size: 100,
        }),
        // Accessor Column
        columnHelper.accessor("description", {
          cell: (props) => {
            return <TextCell>{props.row.original.description}</TextCell>;
          },
          header: () => <span>Description</span>,
          footer: (props) => props.column.id,
          size: 400,
        }),
      ],
    }),
  ];

  return (
    <ChakraProvider theme={theme}>
      <DataTable columns={columns} data={data}>
        <Flex gap="0.25rem">
          <TablePagination />
          <ButtonGroup isAttached>
            <EditViewButton />
            <EditFilterButton />
            <EditSortingButton />
          </ButtonGroup>
          <EditOrderButton />
          <PageSizeControl />
          <ButtonGroup isAttached>
            <TableSelector />
          </ButtonGroup>
        </Flex>
        <TableCardContainer>
          <TableCards />
        </TableCardContainer>
        <TablePagination />
      </DataTable>
    </ChakraProvider>
  );
};

export default CardViewShowcase;
