import { Button } from "@/components/ui/button";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";
import { Tag } from "@/components/ui/tag";
import { Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../ui/field";
import { useSchemaContext } from "../useSchemaContext";
import { useQuery } from "@tanstack/react-query";
import { snakeToLabel } from "../utils/snakeToLabel";
import { getTableData } from "../utils/getTableData";
import { CustomJSONSchema7 } from "./StringInputField";

export interface IdPickerProps {
  column: string;
  in_table: string;
  column_ref: string;
  display_column: string;
}

export const IdPicker = ({
  column,
  in_table,
  column_ref,
  display_column,
}: IdPickerProps) => {
  const {
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
  const { gridColumn, gridRow, title } = schema.properties[
    column
  ] as CustomJSONSchema7;
  const [selectedId, setSelectedId] = useState();
  const [searchText, setSearchText] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getItemList = (data: any[]) => {
    return data.map((item) => {
      return {
        label: item[display_column],
        key: item[column_ref],
        value: item[column_ref],
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getIdMap = (data: any[]) => {
    return Object.fromEntries(
      data.map((item) => {
        return [
          item[column_ref],
          {
            ...item,
          },
        ];
      })
    );
  };

  const getSelectedName = () => {
    const selectedItem = getIdMap(dataList)[selectedId ?? ""];
    if (selectedItem == undefined) {
      return "";
    }
    return selectedItem[display_column];
  };
  if (selectedId != undefined) {
    return (
      <Field
        label={`${title ?? snakeToLabel(column)}`}
        required={isRequired}
        {...{
          gridColumn,
          gridRow,
        }}
      >
        <Tag
          closable
          onClick={() => {
            setSelectedId(undefined);
            setValue(column, "");
          }}
        >
          {getSelectedName()}
        </Tag>
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
      >
        <PopoverTrigger />
        <PopoverContent>
          <PopoverBody>
            <PopoverTitle />
            <RadioCardRoot
              display={"grid"}
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
                getItemList(dataList).map((item: any) => (
                  <RadioCardItem
                    label={item.label}
                    description={item.description}
                    key={item.key}
                    value={item.value}
                    onClick={() => {
                      setSelectedId(item.key);
                      setValue(column, item.key);
                      setOpenSearchResult(false);
                    }}
                    indicator={false}
                  />
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
            </RadioCardRoot>
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
