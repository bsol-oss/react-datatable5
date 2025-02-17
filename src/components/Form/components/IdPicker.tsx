import { Button } from "@/components/ui/button";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag } from "@/components/ui/tag";
import { Box, Grid, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [idMap, setIdMap] = useState<object>({});
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

  const newIdMap = Object.fromEntries(
    dataList.map((item) => {
      return [
        item[column_ref],
        {
          ...item,
        },
      ];
    })
  );

  useEffect(() => {
    setIdMap((state) => {
      return { ...state, ...newIdMap };
    });
  }, [newIdMap]);

  if (selectedIds.length >= 1 && isMultiple === false) {
    const item = idMap[selectedIds[0]];
    return (
      <Field
        label={`${title ?? snakeToLabel(column)}`}
        required={isRequired}
        cursor={"pointer"}
        onClick={() => {
          setSelectedIds([]);
          setValue(column, "");
        }}
        {...{
          gridColumn,
          gridRow,
        }}
      >
        {!!renderDisplay === true ? renderDisplay(item) : item[display_column]}
      </Field>
    );
  }
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
      {selectedIds.map((id) => {
        const item = idMap[id];
        if (item === undefined) {
          return <>undefined</>;
        }
        return (
          <Tag
            closable
            onClick={() => {
              setSelectedIds([]);
              setValue(column, "");
            }}
          >
            {!!renderDisplay === true
              ? renderDisplay(item)
              : item[display_column]}
          </Tag>
        );
      })}
      <Input
        placeholder="Type to search"
        onChange={(event) => {
          onSearchChange(event);
          setOpenSearchResult(true);
        }}
        autoComplete="off"
        ref={ref}
      />

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
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dataList.map((item: Record<string, any>) => (
                  <Box
                    onClick={() => {
                      const ids = watch(column);
                      setSelectedIds((state) => [...state, item[column_ref]]);
                      setValue(column, [...(ids ?? []), item[column_ref]]);
                      setOpenSearchResult(false);
                    }}
                  >
                    {!!renderDisplay === true
                      ? renderDisplay(item)
                      : item[display_column]}
                  </Box>
                ))
              }
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
