import { Card, CardBody, Text, Box } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

const TableCards = () => {
  const { table } = useContext(TableContext);

  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card key={crypto.randomUUID()}>
            <CardBody display={"flex"} flexFlow={"column"} gap={"0.5rem"}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Box>
                    <Text>{`${cell.column.id}: `}</Text>
                    <Box>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Box>
                  </Box>
                );
              })}
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};

export default TableCards;
