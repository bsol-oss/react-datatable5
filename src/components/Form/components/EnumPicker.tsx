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
import { filterArray } from "../utils/filterArray";
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
  const { schema, translate } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using DatePicker");
  }
  const { gridColumn, gridRow, renderDisplay } = schema.properties[
    column
  ] as CustomJSONSchema7;
  const [searchText, setSearchText] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
  const ref = useRef<HTMLInputElement>(null);
  const watchEnum = watch(column);
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
      label={`${translate.t(`${column}.fieldLabel`)}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      {isMultiple && (
        <Flex flexFlow={"wrap"} gap={1}>
          {watchEnums.map((enumValue) => {
            const item = enumValue;
            if (item === undefined) {
              return <>undefined</>;
            }
            return (
              <Tag
                closable
                onClick={() => {
                  // setSelectedEnums((state) => state.filter((id) => id != item));
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
          onClick={() => {
            setOpenSearchResult(true);
          }}
        >
          {watchEnum}
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
          <PopoverBody display={"grid"} gap={1}>
            <Input
              placeholder={translate.t(`${column}.typeToSearch`)}
              onChange={(event) => {
                onSearchChange(event);
                setOpenSearchResult(true);
              }}
              autoComplete="off"
              ref={ref}
            />
            <PopoverTitle />
            <Text>{`${translate.t(`${column}.total`)}: ${count}, ${translate.t(`${column}.showing`)} ${limit}`}</Text>

            <Grid
              gridTemplateColumns={"repeat(auto-fit, minmax(15rem, 1fr))"}
              overflow={"auto"}
              maxHeight={"50vh"}
            >
              <Flex flexFlow={"column wrap"}>
                {filterArray(dataList as string[], searchText ?? "").map(
                  (item: string) => {
                    const selected = isMultiple
                      ? watchEnums.some((enumValue) => item === enumValue)
                      : watchEnum == item;
                    return (
                      <Box
                        key={`${column}-${item}`}
                        cursor={"pointer"}
                        onClick={() => {
                          if (!isMultiple) {
                            setOpenSearchResult(false);
                            setValue(column, item);
                            return;
                          }
                          const newSet = new Set([...(watchEnums ?? []), item]);
                          setValue(column, [...newSet]);
                        }}
                        {...(selected ? { color: "gray.400/50" } : {})}
                      >
                        {!!renderDisplay === true ? renderDisplay(item) : item}
                      </Box>
                    );
                  }
                )}
              </Flex>
              {isDirty && (
                <>{dataList.length <= 0 && <>Empty Search Result</>} </>
              )}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${column}`] && (
        <Text color={"red.400"}>{translate.t(`${column}.fieldRequired`)}</Text>
      )}
    </Field>
  );
};
