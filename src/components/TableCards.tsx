import { Card, CardBody, Text, Box, Checkbox } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export interface TableCardsProps {}

export const TableCards = ({}: TableCardsProps) => {
  const { table } = useContext(TableContext);

  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card key={crypto.randomUUID()}>
            <CardBody display={"flex"} flexFlow={"column"} gap={"0.5rem"}>
              <Checkbox
                {...{
                  isChecked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  // indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              ></Checkbox>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Box>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
