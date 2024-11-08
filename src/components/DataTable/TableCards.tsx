import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Grid,
  Text
} from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export interface TableCardsProps {
  isSelectable?: boolean;
}

export const TableCards = ({ isSelectable = false }: TableCardsProps) => {
  const { table } = useContext(TableContext);

  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card key={`chakra-table-card-${row.id}`}>
            <CardBody display={"flex"} flexFlow={"column"} gap={"0.5rem"}>
              {isSelectable && (
                <Checkbox
                  {...{
                    isChecked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    // indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                ></Checkbox>
              )}
              <Grid templateColumns={"auto 1fr"} gap={"1rem"}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <>
                      <Box key={`chakra-table-cardcolumnid-${row.id}`}>
                        <Text fontWeight={"bold"}>
                          {cell.column.columnDef.meta?.displayName ??
                            cell.column.id}
                        </Text>
                      </Box>
                      <Box
                        key={`chakra-table-cardcolumn-${row.id}`}
                        justifySelf={"end"}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Box>
                    </>
                  );
                })}
              </Grid>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};
