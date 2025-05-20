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
import { InfoTip } from "@/components/ui/toggle-tip";
import { Tag } from "@/components/ui/tag";
import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { useSchemaContext } from "../../useSchemaContext";
import { getTableData } from "../../utils/getTableData";
import { ForeignKeyProps } from "./StringInputField";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { removeIndex } from "../../utils/removeIndex";
import { BiError } from "react-icons/bi";

export interface IdPickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
  isMultiple?: boolean;
}

// Define record type to fix TypeScript errors
interface RecordType {
  [key: string]: any;
}

export const IdPicker = ({
  column,
  schema,
  prefix,
  isMultiple = false,
}: IdPickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const {
    serverUrl,
    idMap,
    setIdMap,
    translate,
    schema: parentSchema,
  } = useSchemaContext();
  const {
    required,
    gridColumn = "span 4",
    gridRow = "span 1",
    renderDisplay,
    foreign_key,
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const {
    table,
    column: column_ref,
    display_column,
  } = foreign_key as ForeignKeyProps;
  const [searchText, setSearchText] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
  const [page, setPage] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const colLabel = `${prefix}${column}`;

  const query = useQuery({
    queryKey: [`idpicker`, { column, searchText, limit, page }],
    queryFn: async () => {
      const data = await getTableData({
        serverUrl,
        searching: searchText ?? "",
        in_table: table,
        limit: limit,
        offset: page * limit,
      });
      const newMap = Object.fromEntries(
        (data ?? { data: [] }).data.map((item: RecordType) => {
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

  const { isLoading, isFetching, data, isPending, isError } = query;
  const dataList = data?.data ?? [];
  const count = data?.count ?? 0;
  const isDirty = (searchText?.length ?? 0) > 0;
  const watchId = watch(colLabel);
  const watchIds = (watch(colLabel) ?? []) as string[];

  const queryDefault = useQuery({
    queryKey: [
      `idpicker-default`,
      { form: parentSchema.title, column, id: isMultiple ? watchIds : watchId },
    ],
    queryFn: async () => {
      if (!watchId && (!watchIds || watchIds.length === 0)) {
        return { data: [] };
      }

      const searchValue = isMultiple ? watchIds.join(",") : watchId;

      const data = await getTableData({
        serverUrl,
        searching: searchValue,
        in_table: table,
        where: [{ id: column_ref, value: isMultiple ? watchIds : watchId }],
        limit: isMultiple ? watchIds.length : 1,
        offset: 0,
      });

      const newMap = Object.fromEntries(
        (data ?? { data: [] }).data.map((item: RecordType) => {
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
    enabled: isMultiple
      ? Array.isArray(watchIds) && watchIds.length > 0
      : !!watchId,
  });

  // Effect to trigger the default query when the component mounts
  useEffect(() => {
    if (isMultiple ? watchIds.length > 0 : !!watchId) {
      queryDefault.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0);
    setLimit(10);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    // Reset to first page when changing limit
    setPage(0);

    // Trigger a new search with the updated limit
    if (searchText?.length) {
      query.refetch();
    }
  };

  const getPickedValue = (): ReactNode => {
    if (Object.keys(idMap).length <= 0) {
      return "";
    }
    const record = idMap[watchId] as RecordType | undefined;
    if (record === undefined) {
      return "";
    }
    if (!!renderDisplay === true) {
      return renderDisplay(record);
    }

    return record[display_column];
  };

  return (
    <Field
      label={`${translate.t(removeIndex(removeIndex(`${column}.field_label`)))}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      {isMultiple && (
        <Flex flexFlow={"wrap"} gap={1}>
          {watchIds.map((id: string) => {
            const item = idMap[id] as RecordType | undefined;
            if (item === undefined) {
              return (
                <Text key={id}>
                  {translate.t(removeIndex(`${colLabel}.undefined`))}
                </Text>
              );
            }
            return (
              <Tag
                key={id}
                closable
                onClick={() => {
                  setValue(
                    colLabel,
                    watchIds.filter(
                      (itemId: string) => itemId !== item[column_ref]
                    )
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
          {queryDefault.isLoading ? <Spinner size="sm" /> : getPickedValue()}
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
              placeholder={translate.t(
                removeIndex(`${colLabel}.type_to_search`)
              )}
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
                {(isFetching || isLoading || isPending) && <Spinner />}
                {isError && (
                  <Icon color={"red.400"}>
                    <BiError />
                  </Icon>
                )}
                <Flex justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center" gap="2">
                    <InfoTip>
                      {`${translate.t(removeIndex(`${colLabel}.total`))} ${count}, ${translate.t(removeIndex(`${colLabel}.showing`))} ${limit} ${translate.t(removeIndex(`${colLabel}.per_page`), "per page")}`}
                    </InfoTip>
                    <Text fontSize="sm" fontWeight="bold">
                      {count}
                      <Text as="span" fontSize="xs" ml="1" color="gray.500">
                        / {page * limit + 1}-{Math.min((page + 1) * limit, count)}
                      </Text>
                    </Text>
                  </Flex>
                  <Box>
                    <select
                      value={limit}
                      onChange={handleLimitChange}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </Box>
                </Flex>
                <Grid
                  gridTemplateColumns={"repeat(auto-fit, minmax(15rem, 1fr))"}
                  overflow={"auto"}
                  maxHeight={"50vh"}
                >
                  <Flex flexFlow={"column wrap"}>
                    {dataList.map((item: RecordType) => {
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
                              setValue(colLabel, item[column_ref]);
                              return;
                            }
                            const newSet = new Set([
                              ...(watchIds ?? []),
                              item[column_ref],
                            ]);
                            setValue(colLabel, [...newSet]);
                          }}
                          opacity={0.7}
                          _hover={{ opacity: 1 }}
                          {...(selected
                            ? { color: "colorPalette.400/50" }
                            : {})}
                        >
                          {!!renderDisplay === true
                            ? renderDisplay(item)
                            : item[display_column]}
                        </Box>
                      );
                    })}
                  </Flex>
                  {isDirty && (
                    <>
                      {dataList.length <= 0 && (
                        <Text>
                          {translate.t(
                            removeIndex(`${colLabel}.empty_search_result`)
                          )}
                        </Text>
                      )}
                    </>
                  )}
                </Grid>
                <PaginationRoot
                  justifySelf={"center"}
                  count={count}
                  pageSize={limit}
                  defaultPage={1}
                  page={page + 1}
                  onPageChange={(e) => setPage(e.page - 1)}
                >
                  <HStack gap="4">
                    <PaginationPrevTrigger />
                    {count > 0 && <PaginationPageText />}
                    <PaginationNextTrigger />
                  </HStack>
                </PaginationRoot>
              </>
            )}
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
