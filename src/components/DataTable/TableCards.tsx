import { Checkbox } from "@/components/ui/checkbox";
import {
  Box,
  Card,
  CardBodyProps,
  Grid,
  Text
} from "@chakra-ui/react";
import { flexRender, Row } from "@tanstack/react-table";
import { ReactNode } from "react";
import { useDataTableContext } from "./context/useDataTableContext";

export interface TableCardsProps<TData> {
  isSelectable?: boolean;
  showDisplayNameOnly?: boolean;
  renderTitle?: (row: Row<TData>) => ReactNode | undefined;
  cardBodyProps?: CardBodyProps;
}

export const DefaultCardTitle = () => {
  return <></>;
};

export const TableCards = <TData,>({
  isSelectable = false,
  showDisplayNameOnly = false,
  renderTitle = DefaultCardTitle,
  cardBodyProps = {},
}: TableCardsProps<TData>) => {
  const { table } = useDataTableContext();

  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card.Root key={`chakra-table-card-${row.id}`} flex={"1 0 20rem"}>
            <Card.Body
              display={"flex"}
              flexFlow={"column"}
              gap={"0.5rem"}
              {...cardBodyProps}
            >
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
            </Card.Body>
          </Card.Root>
        );
      })}
    </>
  );
};
