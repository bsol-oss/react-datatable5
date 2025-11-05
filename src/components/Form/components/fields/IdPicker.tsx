import { Button } from '@/components/ui/button';
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { InfoTip } from '@/components/ui/toggle-tip';
import { Tag } from '@/components/ui/tag';
import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { getTableData } from '../../utils/getTableData';
import { ForeignKeyProps } from './StringInputField';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { useFormI18n } from '../../utils/useFormI18n';
import { BiError } from 'react-icons/bi';

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
    getValues,
    formState: { errors },
    setValue,
  } = useFormContext();
  const {
    serverUrl,
    idMap,
    setIdMap,
    schema: parentSchema,
    idPickerLabels,
  } = useSchemaContext();
  const formI18n = useFormI18n(column, prefix);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    renderDisplay,
    foreign_key,
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const {
    table,
    column: column_ref,
    display_column,
    customQueryFn,
  } = foreign_key as ForeignKeyProps;
  const [searchText, setSearchText] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
  const [page, setPage] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const colLabel = formI18n.colLabel;

  const watchedValue = watch(colLabel);
  const watchId = !isMultiple ? watchedValue : undefined;
  const watchIds = isMultiple
    ? ((Array.isArray(watchedValue) ? watchedValue : []) as string[])
    : [];

  // Get initial values immediately to ensure query can trigger on mount
  const initialValue = getValues(colLabel);
  const initialId = !isMultiple ? initialValue : undefined;
  const initialIds = isMultiple
    ? ((Array.isArray(initialValue) ? initialValue : []) as string[])
    : [];

  // Use watched values if available, otherwise fall back to initial values
  // This ensures the query can trigger on mount with initial values
  const currentId = watchId !== undefined ? watchId : initialId;
  const currentIds =
    watchedValue !== undefined && isMultiple ? watchIds : initialIds;

  // Query for search results
  const query = useQuery({
    queryKey: [`idpicker`, { column, searchText, limit, page }],
    queryFn: async () => {
      if (customQueryFn) {
        const { data, idMap } = await customQueryFn({
          searching: searchText ?? '',
          limit: limit,
          offset: page * limit,
        });

        setIdMap((state) => {
          return { ...state, ...idMap };
        });

        return data;
      }
      const data = await getTableData({
        serverUrl,
        searching: searchText ?? '',
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
    enabled: openSearchResult === true,
    staleTime: 300000,
  });

  // Query for currently selected items (to display them properly)
  // Use currentId/currentIds in queryKey so it includes initial values and updates when watched values change
  const queryDefault = useQuery({
    queryKey: [
      `idpicker-default`,
      {
        form: parentSchema.title,
        column,
        id: isMultiple ? currentIds : currentId,
      },
    ],
    queryFn: async () => {
      // Use current values (which include initial) for the query
      const queryId = currentId;
      const queryIds = currentIds;

      if (customQueryFn) {
        const { data, idMap } = await customQueryFn({
          searching: queryIds.join(','),
          limit: isMultiple ? queryIds.length : 1,
          offset: 0,
        });

        setIdMap((state) => {
          return { ...state, ...idMap };
        });

        return data;
      }

      if (!queryId && (!queryIds || queryIds.length === 0)) {
        return { data: [] };
      }

      const searchValue = isMultiple ? queryIds.join(',') : queryId;

      const data = await getTableData({
        serverUrl,
        searching: searchValue,
        in_table: table,
        where: [{ id: column_ref, value: isMultiple ? queryIds : queryId }],
        limit: isMultiple ? queryIds.length : 1,
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
      ? Array.isArray(currentIds) && currentIds.length > 0
      : !!currentId,
  });

  // Effect to trigger initial data fetch when popover opens
  useEffect(() => {
    if (openSearchResult) {
      // Reset search text when opening the popover
      setSearchText('');
      // Reset page to first page
      setPage(0);
      // Fetch initial data
      query.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSearchResult]);

  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0);
    query.refetch();
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    // Reset to first page when changing limit
    setPage(0);
    // Trigger a new search with the updated limit
    query.refetch();
  };

  const { isLoading, isFetching, data, isPending, isError } = query;
  const dataList = data?.data ?? [];
  const count = data?.count ?? 0;

  const getPickedValue = (): ReactNode => {
    if (Object.keys(idMap).length <= 0) {
      return '';
    }
    const record = idMap[watchId] as RecordType | undefined;
    if (record === undefined) {
      return '';
    }
    if (!!renderDisplay === true) {
      return renderDisplay(record);
    }

    return record[display_column];
  };

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
      errorText={errors[`${colLabel}`] ? formI18n.required() : undefined}
      invalid={!!errors[colLabel]}
    >
      {/* Multiple Picker */}
      {isMultiple && (
        <Flex flexFlow={'wrap'} gap={1}>
          {watchIds.map((id: string) => {
            const item = idMap[id] as RecordType | undefined;
            if (item === undefined) {
              return (
                <Text key={id}>
                  {idPickerLabels?.undefined ?? formI18n.t('undefined')}
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
            cursor={'pointer'}
            onClick={() => {
              setOpenSearchResult(true);
            }}
          >
            {idPickerLabels?.addMore ?? formI18n.t('add_more')}
          </Tag>
        </Flex>
      )}

      {/* Single Picker */}
      {!isMultiple && (
        <Button
          variant={'outline'}
          onClick={() => {
            setOpenSearchResult(true);
          }}
          justifyContent={'start'}
        >
          {queryDefault.isLoading ? <Spinner size="sm" /> : getPickedValue()}
        </Button>
      )}

      <PopoverRoot
        open={openSearchResult}
        onOpenChange={(e) => setOpenSearchResult(e.open)}
        closeOnInteractOutside
        initialFocusEl={() => ref.current}
        positioning={{ placement: 'bottom-start', strategy: 'fixed' }}
      >
        <PopoverTrigger />
        <PopoverContent portalled={false}>
          <PopoverBody display={'grid'} gap={1}>
            {/* Search Input */}
            <Input
              placeholder={
                idPickerLabels?.typeToSearch ?? formI18n.t('type_to_search')
              }
              onChange={onSearchChange}
              autoComplete="off"
              ref={ref}
              value={searchText}
            />
            <PopoverTitle />
            {openSearchResult && (
              <>
                {(isFetching || isLoading || isPending) && <Spinner />}
                {isError && (
                  <Icon color={'red.400'}>
                    <BiError />
                  </Icon>
                )}

                {/* Total and Limit */}
                <Flex justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center" gap="2">
                    <InfoTip>
                      {`${idPickerLabels?.total ?? formI18n.t('total')} ${count}, ${idPickerLabels?.showing ?? formI18n.t('showing')} ${limit} ${idPickerLabels?.perPage ?? formI18n.t('per_page', { defaultValue: 'per page' })}`}
                    </InfoTip>
                    <Text fontSize="sm" fontWeight="bold">
                      {count}
                      <Text as="span" fontSize="xs" ml="1" color="gray.500">
                        /{' '}
                        {count > 0
                          ? `${page * limit + 1}-${Math.min((page + 1) * limit, count)}`
                          : '0'}
                      </Text>
                    </Text>
                  </Flex>
                  <Box>
                    <select
                      value={limit}
                      onChange={handleLimitChange}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </Box>
                </Flex>

                {/* Data List */}
                <Grid overflowY={'auto'}>
                  {dataList.length > 0 ? (
                    <Flex flexFlow={'column wrap'} gap={1}>
                      {dataList.map((item: RecordType) => {
                        const selected = isMultiple
                          ? watchIds.some((id) => item[column_ref] === id)
                          : watchId === item[column_ref];
                        return (
                          <Box
                            key={item[column_ref]}
                            cursor={'pointer'}
                            onClick={() => {
                              if (!isMultiple) {
                                setOpenSearchResult(false);
                                setValue(colLabel, item[column_ref]);
                                return;
                              }
                              // For multiple selection, don't add if already selected
                              if (selected) return;

                              const newSet = new Set([
                                ...(watchIds ?? []),
                                item[column_ref],
                              ]);
                              setValue(colLabel, [...newSet]);
                            }}
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                            {...(selected
                              ? {
                                  color: 'colorPalette.400/50',
                                  fontWeight: 'bold',
                                }
                              : {})}
                          >
                            {!!renderDisplay === true
                              ? renderDisplay(item)
                              : item[display_column]}
                          </Box>
                        );
                      })}
                    </Flex>
                  ) : (
                    <Text>
                      {searchText
                        ? idPickerLabels?.emptySearchResult ??
                          formI18n.t('empty_search_result')
                        : idPickerLabels?.initialResults ??
                          formI18n.t('initial_results')}
                    </Text>
                  )}
                </Grid>

                {/* Pagination */}
                <PaginationRoot
                  justifySelf={'center'}
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
    </Field>
  );
};
