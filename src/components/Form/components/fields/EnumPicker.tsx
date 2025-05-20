import { Button } from "@/components/ui/button";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag } from "@/components/ui/tag";
import {
  Box,
  Flex,
  Grid,
  HStack,
  Input,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { useSchemaContext } from "../../useSchemaContext";
import { filterArray } from "../../utils/filterArray";
import { removeIndex } from "../../utils/removeIndex";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";

export interface IdPickerProps {
  column: string;
  isMultiple?: boolean;
  schema: CustomJSONSchema7;
  prefix: string;
  showTotalAndLimit?: boolean;
}

export const EnumPicker = ({
  column,
  isMultiple = false,
  schema,
  prefix,
  showTotalAndLimit = false,
}: IdPickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, variant } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const { gridColumn = "span 4", gridRow = "span 1", renderDisplay } = schema;
  const [searchText, setSearchText] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
  const ref = useRef<HTMLInputElement>(null);
  const colLabel = `${prefix}${column}`;
  const watchEnum = watch(colLabel);
  const watchEnums = (watch(colLabel) ?? []) as string[];
  const dataList = schema.enum ?? [];
  const count = schema.enum?.length ?? 0;
  const isDirty = (searchText?.length ?? 0) > 0;
  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setLimit(10);
  };

  if (variant === "radio") {
    return (
      <Field
        label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        required={isRequired}
        alignItems={"stretch"}
        {...{
          gridColumn,
          gridRow,
        }}
      >
        <RadioGroup.Root defaultValue="1">
          <HStack gap="6">
            {filterArray(dataList as string[], searchText ?? "").map(
              (item: string) => {
                return (
                  <RadioGroup.Item
                    key={`${colLabel}-${item}`}
                    onClick={() => {
                      if (!isMultiple) {
                        setOpenSearchResult(false);
                        setValue(colLabel, item);
                        return;
                      }
                      const newSet = new Set([...(watchEnums ?? []), item]);
                      setValue(colLabel, [...newSet]);
                    }}
                    value={item}
                  >
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>
                      {!!renderDisplay === true
                        ? renderDisplay(item)
                        : translate.t(removeIndex(`${colLabel}.${item}`))}
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                );
              }
            )}
          </HStack>
        </RadioGroup.Root>
      </Field>
    );
  }

  return (
    <Field
      label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
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
                  setValue(
                    column,
                    watchEnums.filter((id: string) => id != item)
                  );
                }}
              >
                {!!renderDisplay === true
                  ? renderDisplay(item)
                  : translate.t(removeIndex(`${colLabel}.${item}`))}
              </Tag>
            );
          })}
          <Tag
            cursor={"pointer"}
            onClick={() => {
              setOpenSearchResult(true);
            }}
          >
            {translate.t(removeIndex(`${colLabel}.add_more`))}
          </Tag>
        </Flex>
      )}
      {!isMultiple && (
        <Button
          variant={"outline"}
          onClick={() => {
            setOpenSearchResult(true);
          }}
          justifyContent={"start"}
        >
          {watchEnum === undefined
            ? ""
            : translate.t(removeIndex(`${colLabel}.${watchEnum}`))}
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
              placeholder={translate.t(`${colLabel}.type_to_search`)}
              onChange={(event) => {
                onSearchChange(event);
                setOpenSearchResult(true);
              }}
              autoComplete="off"
              ref={ref}
            />
            <PopoverTitle />
            {showTotalAndLimit && (
              <Text>{`${translate.t(`${colLabel}.total`)}: ${count}, ${translate.t(`${colLabel}.showing`)} ${limit}`}</Text>
            )}

            <Grid
              gridTemplateColumns={"repeat(auto-fit, minmax(15rem, 1fr))"}
              overflow={"auto"}
              maxHeight={"50vh"}
            >
              <Flex flexFlow={"column wrap"}>
                {(dataList as string[]).filter((item: string) => {
                  const searchTerm = (searchText || "").toLowerCase();
                  if (!searchTerm) return true;
                  
                  // Check if the original enum value contains the search text
                  const enumValueMatch = item.toLowerCase().includes(searchTerm);
                  
                  // Check if the display value (translation) contains the search text
                  const displayValue = !!renderDisplay === true
                    ? renderDisplay(item)
                    : translate.t(removeIndex(`${colLabel}.${item}`));
                  
                  // Convert to string and check if it includes the search term
                  const displayValueString = String(displayValue).toLowerCase();
                  const displayValueMatch = displayValueString.includes(searchTerm);
                  
                  return enumValueMatch || displayValueMatch;
                }).map(
                  (item: string) => {
                    const selected = isMultiple
                      ? watchEnums.some((enumValue) => item === enumValue)
                      : watchEnum == item;
                    return (
                      <Box
                        key={`${colLabel}-${item}`}
                        cursor={"pointer"}
                        onClick={() => {
                          if (!isMultiple) {
                            setOpenSearchResult(false);
                            setValue(colLabel, item);
                            return;
                          }
                          const newSet = new Set([...(watchEnums ?? []), item]);
                          setValue(colLabel, [...newSet]);
                        }}
                        {...(selected ? { color: "colorPalette.400/50" } : {})}
                      >
                        {!!renderDisplay === true
                          ? renderDisplay(item)
                          : translate.t(removeIndex(`${colLabel}.${item}`))}
                      </Box>
                    );
                  }
                )}
              </Flex>
              {isDirty && (
                <>
                  {dataList.length <= 0 && (
                    <>
                      {translate.t(
                        removeIndex(`${colLabel}.empty_search_result`)
                      )}
                    </>
                  )}
                </>
              )}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${colLabel}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.field_required`))}
        </Text>
      )}
    </Field>
  );
};
