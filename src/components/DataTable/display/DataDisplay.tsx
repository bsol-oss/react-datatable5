import { Box, Card, Flex, Grid, Text } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { snakeToLabel } from "../../Form/utils/snakeToLabel";
import { RecordDisplay } from "./RecordDisplay";
import { useDataTableContext } from "../context/useDataTableContext";
import { UseTranslationResponse } from "react-i18next";

export interface DataDisplayProps {
  variant?: "horizontal" | "stats" | "";
  translate?: UseTranslationResponse<any, any>;
}

const CellRenderer = ({ cell }) => {
  const { translate } = useDataTableContext();
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
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      <Box color={'gray.400'}>{getLabel({ columnId: cell.column.id })}</Box>
      <Box
        wordBreak={"break-word"}
        textOverflow={"ellipsis"}
        overflow={"hidden"}
      >{`${formatValue(cell.getValue())}`}</Box>
    </Box>
  );
};

export const DataDisplay = ({ variant = "" }: DataDisplayProps) => {
  const { table, translate } = useDataTableContext();

  return (
    <Flex flexFlow={"column"} gap={"1"}>
      {table.getRowModel().rows.map((row) => {
        const rowId = row.id;
        return (
          <Card.Root key={`chakra-table-card-${rowId}`}>
            <Card.Body
              display={"grid"}
              gap={4}
              padding={4}
              gridTemplateColumns={"repeat(12, 1fr)"}
            >
              {table.getAllColumns().map((column) => {
                const childCell = row.getAllCells().find((cell) => {
                  return cell.id === `${rowId}_${column.id}`;
                });
                if (column.columns.length > 0) {
                  return (
                    <Card.Root
                      key={`chakra-table-card-${childCell?.id}`}
                      margin={"1"}
                      gridColumn={"span 12"}
                    >
                      <Card.Header color={"gray.400"}>
                        {translate.t(column.id)}
                      </Card.Header>
                      <Card.Body
                        display={"grid"}
                        gap={"4"}
                        gridTemplateColumns={"repeat(12, 1fr)"}
                      >
                        {column.columns.map((column) => {
                          if (!column.getIsVisible()) {
                            return <></>;
                          }
                          const foundCell = row
                            .getVisibleCells()
                            .find((cell) => {
                              return cell.id === `${rowId}_${column.id}`;
                            });
                          return <CellRenderer {...{ cell: foundCell }} />;
                        })}
                      </Card.Body>
                    </Card.Root>
                  );
                }
                return <CellRenderer {...{ cell: childCell }} />;
              })}
            </Card.Body>
          </Card.Root>
        );
      })}
    </Flex>
  );
};
