import { Flex, Input, Select, Text } from "@chakra-ui/react";
import { Column, RowData } from "@tanstack/react-table";
import { useDataTable } from "./useDataTable";
import RangeFilter from "../Filter/RangeFilter";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
    filterOptions?: string[];
  }
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {};
  const displayName = column.columnDef.meta?.displayName ?? column.id;
  const filterOptions = column.columnDef.meta?.filterOptions ?? [];

  if (column.columns.length > 0) {
    return (
      <Flex key={column.id} flexFlow={"column"} gap="0.25rem">
        <Text>{displayName}</Text>
        {column.columns.map((column) => {
          return <Filter key={column.id} column={column} />;
        })}
      </Flex>
    );
  }
  if (!column.getCanFilter()) {
    return <></>;
  }
  if (filterVariant === "select") {
    return (
      <Flex key={column.id} flexFlow={"column"} gap="0.25rem">
        <Text>{displayName}</Text>
        <Select
          value={column.getFilterValue() ? String(column.getFilterValue()) : ""}
          placeholder="Select option"
          onChange={(e) => {
            column.setFilterValue(e.target.value);
          }}
        >
          {filterOptions.map((option: string) => {
            return (
              <option key={`${option}`} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
      </Flex>
    );
  }
  if (filterVariant === "range") {
    const filterValue = (column.getFilterValue() as [number, number]) ?? [
      undefined,
      undefined,
    ];
    const { min, max, step, defaultValue } = column.columnDef.meta
      ?.filterRangeConfig ?? {
      min: 0,
      max: 100,
      step: 1,
      defaultValue: [4, 50],
    };
    return (
      <RangeFilter
        range={filterValue}
        setRange={function (value: [number, number]): void {
          // throw new Error("Function not implemented.");
          column.setFilterValue(value);
        }}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
      />
    );
  }

  return (
    <Flex key={column.id} flexFlow={"column"} gap="0.25rem">
      <Text>{displayName}</Text>
      <Input
        value={column.getFilterValue() ? String(column.getFilterValue()) : ""}
        onChange={(e) => {
          column.setFilterValue(e.target.value);
        }}
      />
    </Flex>
  );
}

export const TableFilter = () => {
  const { table } = useDataTable();

  return (
    <>
      {table.getAllColumns().map((column) => {
        return <Filter key={column.id} column={column}></Filter>;
      })}
    </>
  );
};
