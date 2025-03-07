import { Box, Card, Flex } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { snakeToLabel } from "../Form/utils/snakeToLabel";
import { RecordDisplay } from "./components/RecordDisplay";
import { useDataTableContext } from "./context/useDataTableContext";
import { UseTranslationResponse } from "react-i18next";

export interface DataDisplayProps {
  variant?: "horizontal" | "stats" | "";
  translate?: UseTranslationResponse<any, any>;
}

export const DataDisplay = ({ variant = "", translate }: DataDisplayProps) => {
  const { table } = useDataTableContext();

  const getLabel = ({ columnId }: { columnId: string }) => {
    if (translate !== undefined) {
      return translate.t(`${columnId}`);
    }
    return snakeToLabel(columnId);
  };

  const formatValue = (value: unknown): string => {
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    if (typeof value === "string") {
      return value;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return `${value}`;
    }
    if (value === undefined) {
      if (translate !== undefined) {
        return translate.t(`undefined`);
      }
      return `undefined`;
    }
    throw new Error(`value is unknown, ${typeof value}`);
  };

  return (
    <Flex flexFlow={"column"} gap={"1"}>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card.Root key={`chakra-table-card-${row.id}`}>
            <Card.Body>
              <Box
                gap={4}
                padding={4}
                display={"grid"}
                gridTemplateColumns={"repeat(12, 1fr)"}
              >
                {row.getVisibleCells().map((cell) => {
                  const showCustomDataDisplay =
                    cell.column.columnDef.meta?.showCustomDisplay ?? false;
                  const gridColumn = cell.column.columnDef.meta?.gridColumn ?? [
                    "span 12",
                    "span 6",
                    "span 3",
                  ];
                  const gridRow = cell.column.columnDef.meta?.gridRow ?? {};
                  if (showCustomDataDisplay) {
                    return (
                      <Flex key={cell.id} {...{ gridColumn, gridRow }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Flex>
                    );
                  }
                  const value = cell.getValue();
                  if (typeof value === "object") {
                    return (
                      <Box key={cell.id} {...{ gridColumn, gridRow }}>
                        <Box>{getLabel({ columnId: cell.column.id })}</Box>
                        <RecordDisplay
                          boxProps={{
                            borderWidth: 1,
                            borderRadius: 4,
                            borderColor: "gray.400",
                            paddingX: 4,
                            paddingY: 2,
                          }}
                          object={value}
                        />
                      </Box>
                    );
                  }
                  return (
                    <Box key={cell.id} {...{ gridColumn, gridRow }}>
                      <Box>{getLabel({ columnId: cell.column.id })}</Box>
                      <Box
                        wordBreak={"break-word"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                      >{`${formatValue(cell.getValue())}`}</Box>
                    </Box>
                  );
                })}
              </Box>
            </Card.Body>
          </Card.Root>
        );
      })}
    </Flex>
  );
};
