import { Button } from "@/components/ui/button";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag } from "@/components/ui/tag";
import { Box, Flex, Grid, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
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
  const { gridColumn, gridRow, title, renderDisplay } = schema.properties[
    column
  ] as CustomJSONSchema7;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
  const [idMap, setIdMap] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const ref = useRef<HTMLInputElement>(null);
  const query = useQuery({
    queryKey: [`idpicker`, searchText, in_table, limit],
    queryFn: async () => {
      return await getTableData({
        serverUrl,
        searching: searchText ?? "",
        in_table: in_table,
        limit: limit,
      });
    },
    staleTime: 10000,
  });

  const { isLoading, isFetching, data, isPending, isError } = query;

  const dataList = data?.data ?? [];
  const count = data?.count ?? 0;
  const isDirty = (searchText?.length ?? 0) > 0;
  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setLimit(10);
  };
  const ids = (watch(column) ?? []) as string[];
  const newIdMap = useMemo(
    () =>
      Object.fromEntries(
        dataList.map((item: Record<string, string>) => {
          return [
            item[column_ref],
            {
              ...item,
            },
          ];
        })
      ),
    [dataList, column_ref]
  );

  useEffect(() => {
    setIdMap((state) => {
      return { ...state, ...newIdMap };
    });
  }, [newIdMap]);

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
          {selectedIds.map((id) => {
            const item = idMap[id];
            if (item === undefined) {
              return <>undefined</>;
            }
            return (
              <Tag
                closable
                onClick={() => {
                  setSelectedIds((state) =>
                    state.filter((id) => id != item[column_ref])
                  );
                  setValue(
                    column,
                    ids.filter((id: string) => id != item[column_ref])
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
          onClick={(event) => {
            setOpenSearchResult(true);
          }}
        >
          {selectedIds[0] ? idMap[selectedIds[0]][display_column] ?? "" : ""}
        </Button>
      )}

      <PopoverRoot
        open={openSearchResult}
        onOpenChange={(e) => setOpenSearchResult(e.open)}
        closeOnInteractOutside
        initialFocusEl={() => ref.current}
        positioning={{ placement: "bottom-start" }}
      >
        <PopoverTrigger />
        <PopoverContent>
          <PopoverBody>
            <Input
              placeholder="Type to search"
              onChange={(event) => {
                onSearchChange(event);
                setOpenSearchResult(true);
              }}
              autoComplete="off"
              ref={ref}
            />
            <PopoverTitle />
            <Grid
              gridTemplateColumns={"repeat(auto-fit, minmax(15rem, 1fr))"}
              overflow={"auto"}
              maxHeight={"50vh"}
            >
              {isFetching && <>isFetching</>}
              {isLoading && <>isLoading</>}
              {isPending && <>isPending</>}
              {isError && <>isError</>}
              <Text>{`Search Result: ${count}, Showing ${limit}`}</Text>
              <Button
                onClick={async () => {
                  setOpenSearchResult(false);
                }}
              >
                close
              </Button>
              <Flex flexFlow={"column wrap"}>
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  dataList.map((item: Record<string, any>) => {
                    const selected = ids.some((id) => item[column_ref] === id);
                    return (
                      <Box
                        cursor={"pointer"}
                        onClick={() => {
                          if (!isMultiple) {
                            setOpenSearchResult(false);
                            setSelectedIds(() => [item[column_ref]]);
                            setValue(column, [item[column_ref]]);
                            return;
                          }
                          const newSet = new Set([
                            ...(ids ?? []),
                            item[column_ref],
                          ]);
                          setSelectedIds(() => [...newSet]);
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
                  {dataList.length <= 0 && <>Empty Search Result</>}{" "}
                  {count > dataList.length && (
                    <>
                      <Button
                        onClick={async () => {
                          setLimit((limit) => limit + 10);
                          await getTableData({
                            serverUrl,
                            searching: searchText ?? "",
                            in_table: in_table,
                            limit: limit + 10,
                          });
                        }}
                      >
                        show more
                      </Button>
                    </>
                  )}
                </>
              )}
            </Grid>
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
