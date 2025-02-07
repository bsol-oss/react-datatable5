import { Flex, Grid, Input, Text } from "@chakra-ui/react";
import { Column } from "@tanstack/react-table";
import { DateRangeFilter } from "../Filter/DateRangeFilter";
import RangeFilter from "../Filter/RangeFilter";
import { TagFilter } from "../Filter/TagFilter";
import { useDataTableContext } from "./useDataTableContext";
import { Radio, RadioGroup } from "@/components/ui/radio";

const Filter = <TData,>({ column }: { column: Column<TData, unknown> }) => {
  const { filterVariant } = column.columnDef.meta ?? {};
  const displayName = column.columnDef.meta?.displayName ?? column.id;
  const filterOptions = column.columnDef.meta?.filterOptions ?? [];
  // const collection = createListCollection({
  //   items: filterOptions,
  // });

  if (column.columns.length > 0) {
    return (
      <Flex flexFlow={"column"} gap={1}>
        <Text>{displayName}</Text>
        <Grid
          key={column.id}
          gridTemplateColumns={"repeat(auto-fit, minmax(20rem, 1fr))"}
          gap={1}
        >
          {column.columns.map((column) => {
            return <Filter key={column.id} column={column} />;
          })}
        </Grid>
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
        <RadioGroup
          value={column.getFilterValue() ? String(column.getFilterValue()) : ""}
          onValueChange={(details) => {
            column.setFilterValue(details.value);
          }}
        >
          <Flex flexFlow={"wrap"} gap={"0.5rem"}>
            {filterOptions.map((item) => (
              <Radio key={item} value={item}>
                {item}
              </Radio>
            ))}
          </Flex>
        </RadioGroup>
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
      <Flex key={column.id} flexFlow={"column"} gap="0.25rem">
        <Text>{displayName}</Text>
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
      </Flex>
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
};

export const TableFilter = () => {
  const { table } = useDataTableContext();

  return (
    <>
      {table.getAllColumns().map((column) => {
        return <Filter key={column.id} column={column}></Filter>;
      })}
    </>
  );
};
