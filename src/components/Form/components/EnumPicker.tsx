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
import { JSONSchema7 } from "json-schema";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../ui/field";
import { useSchemaContext } from "../useSchemaContext";
import { snakeToLabel } from "../utils/snakeToLabel";
import { CustomJSONSchema7 } from "./StringInputField";

export interface IdPickerProps {
  column: string;
  isMultiple?: boolean;
}

export const EnumPicker = ({ column, isMultiple = false }: IdPickerProps) => {
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
  const [selectedEnums, setSelectedEnums] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
  const ref = useRef<HTMLInputElement>(null);
  const watchEnums = (watch(column) ?? []) as string[];

  const properties = (schema.properties[column] ?? {}) as JSONSchema7;
  const dataList = properties.enum ?? [];
  const count = properties.enum?.length ?? 0;
  const isDirty = (searchText?.length ?? 0) > 0;
  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setLimit(10);
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
          {selectedEnums.map((enumValue) => {
            const item = enumValue;
            if (item === undefined) {
              return <>undefined</>;
            }
            return (
              <Tag
                closable
                onClick={() => {
                  setSelectedEnums((state) => state.filter((id) => id != item));
                  setValue(
                    column,
                    watchEnums.filter((id: string) => id != item)
                  );
                }}
              >
                {!!renderDisplay === true ? renderDisplay(item) : item}
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
          {selectedEnums[0]}
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
              <Text>{`Search Result: ${count}, Showing ${limit}`}</Text>
              <Button
                onClick={async () => {
                  setOpenSearchResult(false);
                }}
              >
                close
              </Button>
              <Flex flexFlow={"column wrap"}>
                {dataList.map((item: string) => {
                  const selected = watchEnums.some(
                    (enumValue) => item === enumValue
                  );
                  return (
                    <Box
                      cursor={"pointer"}
                      onClick={() => {
                        if (!isMultiple) {
                          setOpenSearchResult(false);
                          setSelectedEnums(() => [item]);
                          setValue(column, [item]);
                          return;
                        }
                        const newSet = new Set([...(watchEnums ?? []), item]);
                        setSelectedEnums(() => [...newSet]);
                        setValue(column, [...newSet]);
                      }}
                      {...(selected ? { color: "gray.400/50" } : {})}
                    >
                      {!!renderDisplay === true ? renderDisplay(item) : item}
                    </Box>
                  );
                })}
              </Flex>
              {isDirty && (
                <>{dataList.length <= 0 && <>Empty Search Result</>} </>
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
