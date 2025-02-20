import { Button } from "@/components/ui/button";
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag } from "@/components/ui/tag";
import { Box, Flex, Grid, HStack, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../ui/field";
import { useSchemaContext } from "../useSchemaContext";
import { getTableData } from "../utils/getTableData";
import { snakeToLabel } from "../utils/snakeToLabel";
import { CustomJSONSchema7 } from "./StringInputField";

export interface IdPickerProps {
  column: string;
  in_table: string;
  column_ref: string;
  display_column: string;
  isMultiple?: boolean;
}

export const IdPicker = ({
  column,
  in_table,
  column_ref,
  display_column,
  isMultiple = false,
}: IdPickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { schema, serverUrl, displayText } = useSchemaContext();
  const { fieldRequired } = displayText;
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using DatePicker");
  }
  const { total, showing, typeToSearch } = displayText;
  const { gridColumn, gridRow, title, renderDisplay } = schema.properties[
    column
  ] as CustomJSONSchema7;
  const [searchText, setSearchText] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
  const [page, setPage] = useState(1);
  const [idMap, setIdMap] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const ref = useRef<HTMLInputElement>(null);
  const selectedIds = watch(column) ?? [];

  const query = useQuery({
    queryKey: [`idpicker`, { searchText, in_table, limit, page }],
    queryFn: async () => {
      const data = await getTableData({
        serverUrl,
        searching: searchText ?? "",
        in_table: in_table,
        limit: limit,
        offset: page * 10,
      });
      const newMap = Object.fromEntries(
        (data ?? { data: [] }).data.map((item: Record<string, string>) => {
          return [
            item[column_ref],
            {
              ...item,
            },
          ];
        })
      );
      setIdMap((state) => {
        return { ...state, ...newMap };
      });
      return data;
    },
    enabled: (searchText ?? "")?.length > 0,
    staleTime: 300000,
  });

  const idQuery = useQuery({
    queryKey: [`idpicker`, { selectedIds }],
    queryFn: async () => {
      const data = await getTableData({
        serverUrl,
        in_table: in_table,
        limit: 1,
        where: [{ id: column_ref, value: watchId }],
      });
      const newMap = Object.fromEntries(
        (data ?? { data: [] }).data.map((item: Record<string, string>) => {
          return [
            item[column_ref],
            {
              ...item,
            },
          ];
        })
      );
      setIdMap((state) => {
        return { ...state, ...newMap };
      });
      return data;
    },
    enabled: (selectedIds ?? []).length > 0,
    staleTime: 300000,
  });

  const { isLoading, isFetching, data, isPending, isError } = query;

  const dataList = useMemo(() => data?.data ?? [], [data]);
  const count = data?.count ?? 0;
  const isDirty = (searchText?.length ?? 0) > 0;
  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(1);
    setLimit(10);
  };
  const watchId = watch(column);
  const watchIds = (watch(column) ?? []) as string[];

  const getPickedValue = () => {
    if (Object.keys(idMap).length <= 0) {
      return "";
    }
    const record = idMap[watchId];
    if (record === undefined) {
      return "";
    }
    return record[display_column];
  };

  return (
    <Field
      label={`${title ?? snakeToLabel(column)}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      {isMultiple && (
        <Flex flexFlow={"wrap"} gap={1}>
          {selectedIds.map((id: string) => {
            const item = idMap[id];
            if (item === undefined) {
              return <Text key={id}>undefined</Text>;
            }
            return (
              <Tag
                key={id}
                closable
                onClick={() => {
                  setValue(
                    column,
                    watchIds.filter((id: string) => id != item[column_ref])
                  );
                }}
              >
                {!!renderDisplay === true
                  ? renderDisplay(item)
                  : item[display_column]}
              </Tag>
            );
          })}

          <Tag
            cursor={"pointer"}
            onClick={() => {
              setOpenSearchResult(true);
            }}
          >
            Add
          </Tag>
        </Flex>
      )}
      {!isMultiple && (
        <Button
          variant={"outline"}
          onClick={() => {
            setOpenSearchResult(true);
          }}
        >
          {getPickedValue()}
        </Button>
      )}

      <PopoverRoot
        open={openSearchResult}
        onOpenChange={(e) => setOpenSearchResult(e.open)}
        closeOnInteractOutside
        initialFocusEl={() => ref.current}
        positioning={{ placement: "bottom-start", strategy: "fixed" }}
      >
        <PopoverTrigger />
        <PopoverContent>
          <PopoverBody display={"grid"} gap={1}>
            <Input
              placeholder={typeToSearch ?? "Type To Search"}
              onChange={(event) => {
                onSearchChange(event);
                setOpenSearchResult(true);
              }}
              autoComplete="off"
              ref={ref}
            />
            <PopoverTitle />
            {(searchText?.length ?? 0) > 0 && (
              <>
                {isFetching && <>isFetching</>}
                {isLoading && <>isLoading</>}
                {isPending && <>isPending</>}
                {isError && <>isError</>}
                <Text
                  justifySelf={"center"}
                >{`${total ?? "Total"} ${count}, ${showing ?? "Showing"} ${limit}`}</Text>
                <Grid
                  gridTemplateColumns={"repeat(auto-fit, minmax(15rem, 1fr))"}
                  overflow={"auto"}
                  maxHeight={"50vh"}
                >
                  <Flex flexFlow={"column wrap"}>
                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      dataList.map((item: Record<string, any>) => {
                        const selected = isMultiple
                          ? watchIds.some((id) => item[column_ref] === id)
                          : watchId === item[column_ref];
                        return (
                          <Box
                            key={item[column_ref]}
                            cursor={"pointer"}
                            onClick={() => {
                              if (!isMultiple) {
                                setOpenSearchResult(false);
                                setValue(column, item[column_ref]);
                                return;
                              }
                              const newSet = new Set([
                                ...(watchIds ?? []),
                                item[column_ref],
                              ]);
                              setValue(column, [...newSet]);
                            }}
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                            {...(selected ? { color: "gray.400/50" } : {})}
                          >
                            {!!renderDisplay === true
                              ? renderDisplay(item)
                              : item[display_column]}
                          </Box>
                        );
                      })
                    }
                  </Flex>
                  {isDirty && (
                    <>
                      {dataList.length <= 0 && <Text>Empty Search Result</Text>}{" "}
                    </>
                  )}
                </Grid>
                <PaginationRoot
                  justifySelf={"center"}
                  count={query?.data?.count ?? 0}
                  pageSize={10}
                  defaultPage={1}
                  page={page}
                  onPageChange={(e) => setPage(e.page)}
                >
                  <HStack gap="4">
                    <PaginationPrevTrigger />
                    <PaginationPageText />
                    <PaginationNextTrigger />
                  </HStack>
                </PaginationRoot>
              </>
            )}
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {fieldRequired ?? "The field is requried"}
        </Text>
      )}
    </Field>
  );
};
