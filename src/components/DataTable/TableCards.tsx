import { Box, Card, CardBody, CardBodyProps, Checkbox, Grid, Text } from "@chakra-ui/react";
import { flexRender, Row } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export interface TableCardsProps<TData> {
  isSelectable?: boolean;
  showDisplayNameOnly?: boolean;
  renderTitle?: (row: Row<TData>) => JSX.Element | undefined;
  cardBodyProps?: CardBodyProps
}

export const DefaultCardTitle = () => {
  return <></>;
};

export const TableCards = <TData,>({
  isSelectable = false,
  showDisplayNameOnly = false,
  renderTitle = DefaultCardTitle,
  cardBodyProps = {}
}: TableCardsProps<TData>) => {
  const { table } = useContext(TableContext);

  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card key={`chakra-table-card-${row.id}`}>
            <CardBody display={"flex"} flexFlow={"column"} gap={"0.5rem"}  {...cardBodyProps}>
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
              {renderTitle(row)}
              <Grid templateColumns={"auto 1fr"} gap={"1rem"}>
                {row.getVisibleCells().map((cell) => {
                  console.log(table.getColumn(cell.column.id), "dko");
                  return (
                    <>
                      <Box key={`chakra-table-cardcolumnid-${row.id}`}>
                        {showDisplayNameOnly && (
                          <Text fontWeight={"bold"}>
                            {cell.column.columnDef.meta?.displayName ??
                              cell.column.id}
                          </Text>
                        )}
                        {!showDisplayNameOnly && (
                          <>
                            {flexRender(
                              cell.column.columnDef.header,
                              // @ts-expect-error Assuming the CellContext interface is the same as HeaderContext
                              cell.getContext()
                            )}
                          </>
                        )}
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
