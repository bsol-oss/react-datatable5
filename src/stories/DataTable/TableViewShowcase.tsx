import {
  Box,
  ButtonGroup,
  ChakraProvider,
  Flex,
  theme,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../components/DataTable";
import { EditFilterButton } from "../../components/EditFilterButton";
import { EditOrderButton } from "../../components/EditOrderButton";
import { EditSortingButton } from "../../components/EditSortingButton";
import { EditViewButton } from "../../components/EditViewButton";
import { PageSizeControl } from "../../components/PageSizeControl";
import { Table } from "../../components/Table";
import { TableBody } from "../../components/TableBody";
import { TableFooter } from "../../components/TableFooter";
import { TableHeader } from "../../components/TableHeader";
import { TablePagination } from "../../components/TablePagination";
import { TableSelector } from "../../components/TableSelector";
import { TextCell } from "../../components/TextCell";
import { data, Product } from "../data";
import { GlobalFilter } from "../../components/GlobalFilter";

interface ChatRecord {
  session_id: string;
  last_user_message: string;
  last_system_response: string;
  total_token: number;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_normalise_tokens: number;
  chat_type: string;
  model: string;
  created_by: string;
  last_update: string;
}

interface RowActionsProps {
  row: ChatRecord;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>has no actions</>;
};

const TableViewShowcase = () => {
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
          </ButtonGroup>
          <EditOrderButton />
          <PageSizeControl />
          <ButtonGroup isAttached>
            <TableSelector />
          </ButtonGroup>
          <GlobalFilter />
        </Flex>
        <Table>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
        <PageSizeControl />
        <TablePagination />
      </DataTable>
    </ChakraProvider>
  );
};

export default TableViewShowcase;
