import { Box, Button, Flex, Input, Tag } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";
import { useState } from "react";

export const MultipleRowSelector = ({
  data,
  value = ["hello"],
  onChange = (value) => {
    console.log(value);
  },
}) => {
  const { table } = useDataTable();
  const [filter, setFilter] = useState<string>();
  console.log(table.getCoreRowModel().rows, "fkdok");
  return (
    <>
      {table
        .getAllLeafColumns()
        .filter((column) => {
          console.log(column, "asgfds");
          return column.id === columnId;
        })
        .map((column) => {
          return (
            <Flex flexFlow={"column"} overflow={"auto"}>
              {
                <Input
                  value={filter}
                  onChange={(event) => {
                    setFilter(event.target.value);
                  }}
                ></Input>
              }
              {value.map((row, index) => {
                return <Tag>{row}</Tag>;
              })}
              {table
                .getCoreRowModel()
                .rows.filter((row, index) => {
                  // when filter is empty, show all rows
                  if (!!filter === false) {
                    return true;
                  }
                  const re = new RegExp(`.*${filter}.*`, "gmi");
                  return re.test(row.original[columnId]);
                })
                .map((row, index) => {
                  return (
                    <Box
                      onClick={() => {
                        onChange(row.original[columnId]);
                      }}
                    >
                      {row.original[columnId]}
                    </Box>
                  );
                })}
            </Flex>
          );
        })}
    </>
  );
};
