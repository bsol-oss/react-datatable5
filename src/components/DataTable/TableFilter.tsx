import { Flex, Input, Select, Text } from "@chakra-ui/react";
import { Column, RowData } from "@tanstack/react-table";
import { DateRangeFilter } from "../Filter/DateRangeFilter";
import RangeFilter from "../Filter/RangeFilter";
import { TagFilter } from "../Filter/TagFilter";
import { useDataTable } from "./useDataTable";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * @note you should provide a proper `filterfn` to handle the filtering when choosing 'boolean', 'dateRange' and 'custom'
     */
    filterVariant?:
      | "text"
      | "range"
      | "select"
      | "tag"
      | "boolean"
      | "dateRange"
      | "custom";
    filterOptions?: string[];
    filterRangeConfig?: {
      min: number;
      max: number;
      step: number;
      defaultValue: [number, number];
    };
    renderFilter?: (column: Column<TData>) => JSX.Element;
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
  if (filterVariant === "tag") {
    return (
      <Flex key={column.id} flexFlow={"column"} gap="0.25rem">
        <Text>{displayName}</Text>
        <TagFilter
          availableTags={filterOptions}
          selectedTags={(column.getFilterValue() ?? []) as string[]}
          onTagChange={(tags) => {
            if (tags.length === 0) {
              return column.setFilterValue(undefined);
            }
            column.setFilterValue(tags);
          }}
        />
      </Flex>
    );
  }
  if (filterVariant === "boolean") {
    return (
      <Flex key={column.id} flexFlow={"column"} gap="0.25rem">
        <Text>{displayName}</Text>
        <TagFilter
          availableTags={["true", "false"]}
          selectedTags={(column.getFilterValue() ?? []) as string[]}
          onTagChange={(tags) => {
            if (tags.length === 0) {
              return column.setFilterValue(undefined);
            }
            column.setFilterValue(tags);
          }}
        />
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

  if (filterVariant === "dateRange") {
    const [start, end] = (column.getFilterValue() as [string, string]) ?? [
      "",
      "",
    ];
    return (
      <Flex key={column.id} flexFlow={"column"} gap="0.25rem">
        <Text>{displayName}</Text>
        <DateRangeFilter
          startDate={start}
          endDate={end}
          setStartDate={function (value: string): void {
            column.setFilterValue((state: [string, string] | undefined) => {
              return [value, (state ?? ["", ""])[1]];
            });
          }}
          setEndDate={function (value: string): void {
            column.setFilterValue((state: [string, string]) => {
              return [(state ?? ["", ""])[0], value];
            });
          }}
        />
      </Flex>
    );
  }

  if (filterVariant === "custom") {
    const renderFilter = column.columnDef.meta?.renderFilter;
    if (renderFilter === undefined) {
      throw new Error("renderFilter is undefined");
    }
    return <>{renderFilter(column)}</>;
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
