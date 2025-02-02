import { Box, ChakraProvider, defaultSystem, Flex } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  DataTable,
  CardHeader,
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

import { MdStarRate } from "react-icons/md";
import { useDataTable } from "../../components/DataTable/useDataTable";
import { data, Product } from "../product_data";
interface RowActionsProps {
  row: Product;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>no actions</>;
};

const CardViewShowcase = () => {
  const datatable = useDataTable();
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
          header: () => <Box color={"green.400"}>Id</Box>,
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
          header: () => <Box color={"blue.400"}>Title</Box>,
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
    <ChakraProvider value={defaultSystem}>
      <DataTable columns={columns} data={data} {...datatable}>
        <Flex gap="0.25rem">
          <TablePagination />
          <EditViewButton />
          <EditFilterButton />
          <EditSortingButton />
          <EditOrderButton />
          <PageSizeControl />
          <TableSelector />
        </Flex>
        <TableCardContainer>
          <TableCards<Product>
            renderTitle={(row) => {
              return (
                <CardHeader
                  {...{
                    row: row,
                    imageColumnId: "thumbnail",
                    titleColumnId: "title",
                    tagColumnId: "rating",
                    tagIcon: MdStarRate,
                    showTag: false,
                  }}
                />
              );
            }}
            cardBodyProps={{ minWidth: "10rem" }}
          />
        </TableCardContainer>
        <TableCardContainer variant="carousel">
          <TableCards<Product>
            renderTitle={(row) => {
              return (
                <CardHeader
                  {...{
                    row: row,
                    imageColumnId: "thumbnail",
                    titleColumnId: "title",
                    tagColumnId: "rating",
                    tagIcon: MdStarRate,
                    showTag: false,
                  }}
                />
              );
            }}
            cardBodyProps={{ minWidth: "10rem" }}
          />
        </TableCardContainer>
        <TablePagination />
      </DataTable>
    </ChakraProvider>
  );
};

export default CardViewShowcase;
