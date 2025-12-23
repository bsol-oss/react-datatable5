import { Tag } from '@/components/ui/tag';
import {
  Combobox,
  Flex,
  Icon,
  Portal,
  Skeleton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useFormI18n } from '../../utils/useFormI18n';
import { Field } from '../../../ui/field';
import { useIdPickerData, RecordType } from './useIdPickerData';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { defaultRenderDisplay } from '../types/CustomJSONSchema7';
import { BiError } from 'react-icons/bi';

export interface IdPickerMultipleProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const IdPickerMultiple = ({
  column,
  schema,
  prefix,
}: IdPickerMultipleProps) => {
  const formI18n = useFormI18n(column, prefix, schema);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    renderDisplay,
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);

  const {
    colLabel,
    currentValue,
    searchText,
    setSearchText,
    isLoading,
    isFetching,
    isPending,
    isError,
    isSearching,
    isLoadingInitialValues,
    isFetchingInitialValues,
    missingIds,
    collection,
    idMap,
    idPickerLabels,
    insideDialog,
    renderDisplay: renderDisplayFn,
    errors,
    setValue,
  } = useIdPickerData({
    column,
    schema,
    prefix,
    isMultiple: true,
  });

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails
  ) => {
    setSearchText(details.inputValue);
  };

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setValue(colLabel, details.value);
  };

  const renderDisplayFunction =
    renderDisplayFn || renderDisplay || defaultRenderDisplay;

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
      {/* Multiple Picker - Show selected tags */}
      {currentValue.length > 0 && (
        <Flex flexFlow={'wrap'} gap={1} mb={2}>
          {currentValue.map((id: string) => {
            const item = idMap[id] as RecordType | undefined;
            // Show loading skeleton while fetching initial values
            if (
              item === undefined &&
              (isLoadingInitialValues || isFetchingInitialValues) &&
              missingIds.includes(id)
            ) {
              return (
                <Skeleton
                  key={id}
                  height="24px"
                  width="100px"
                  borderRadius="md"
                />
              );
            }
            // Only show "not found" if we're not loading and item is still missing
            if (item === undefined) {
              return (
                <Text key={id} fontSize="sm">
                  {idPickerLabels?.undefined ?? 'Undefined'}
                </Text>
              );
            }
            return (
              <Tag
                key={id}
                closable
                onClick={() => {
                  const newValue = currentValue.filter(
                    (itemId: string) => itemId !== id
                  );
                  setValue(colLabel, newValue);
                }}
              >
                {renderDisplayFunction(item)}
              </Tag>
            );
          })}
        </Flex>
      )}

      <Combobox.Root
        collection={collection}
        value={currentValue}
        onValueChange={handleValueChange}
        onInputValueChange={handleInputValueChange}
        multiple={true}
        closeOnSelect={false}
        openOnClick
        invalid={!!errors[colLabel]}
        width="100%"
        positioning={
          insideDialog
            ? { strategy: 'fixed', hideWhenDetached: true }
            : undefined
        }
      >
        <Combobox.Control>
          <Combobox.Input
            placeholder={idPickerLabels?.typeToSearch ?? 'Type to search'}
          />
          <Combobox.IndicatorGroup>
            {(isFetching || isLoading || isPending) && <Spinner size="xs" />}
            {isError && (
              <Icon color="fg.error">
                <BiError />
              </Icon>
            )}
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        {insideDialog ? (
          <Combobox.Positioner>
            <Combobox.Content>
              {isError ? (
                <Text p={2} color="fg.error" fontSize="sm">
                  {idPickerLabels?.emptySearchResult ?? 'Loading failed'}
                </Text>
              ) : isFetching || isLoading || isPending || isSearching ? (
                // Show skeleton items to prevent UI shift
                <>
                  {Array.from({ length: 5 }).map((_, index: number) => (
                    <Flex
                      key={`skeleton-${index}`}
                      p={2}
                      align="center"
                      gap={2}
                    >
                      <Skeleton height="20px" flex="1" />
                    </Flex>
                  ))}
                </>
              ) : collection.items.length === 0 ? (
                <Combobox.Empty>
                  {searchText
                    ? idPickerLabels?.emptySearchResult ?? 'No results found'
                    : idPickerLabels?.initialResults ??
                      'Start typing to search'}
                </Combobox.Empty>
              ) : (
                <>
                  {collection.items.map(
                    (
                      item: { label: string; value: string; raw: RecordType },
                      index: number
                    ) => (
                      <Combobox.Item
                        key={item.value ?? `item-${index}`}
                        item={item}
                      >
                        <Combobox.ItemText>
                          {!!renderDisplayFunction === true
                            ? renderDisplayFunction(item.raw)
                            : item.label}
                        </Combobox.ItemText>
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    )
                  )}
                </>
              )}
            </Combobox.Content>
          </Combobox.Positioner>
        ) : (
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                {isError ? (
                  <Text p={2} color="fg.error" fontSize="sm">
                    {idPickerLabels?.emptySearchResult ?? 'Loading failed'}
                  </Text>
                ) : isFetching || isLoading || isPending || isSearching ? (
                  // Show skeleton items to prevent UI shift
                  <>
                    {Array.from({ length: 5 }).map((_, index: number) => (
                      <Flex
                        key={`skeleton-${index}`}
                        p={2}
                        align="center"
                        gap={2}
                      >
                        <Skeleton height="20px" flex="1" />
                      </Flex>
                    ))}
                  </>
                ) : collection.items.length === 0 ? (
                  <Combobox.Empty>
                    {searchText
                      ? idPickerLabels?.emptySearchResult ?? 'No results found'
                      : idPickerLabels?.initialResults ??
                        'Start typing to search'}
                  </Combobox.Empty>
                ) : (
                  <>
                    {collection.items.map(
                      (
                        item: { label: string; value: string; raw: RecordType },
                        index: number
                      ) => (
                        <Combobox.Item
                          key={item.value ?? `item-${index}`}
                          item={item}
                        >
                          <Combobox.ItemText>
                            {!!renderDisplayFunction === true
                              ? renderDisplayFunction(item.raw)
                              : item.label}
                          </Combobox.ItemText>
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      )
                    )}
                  </>
                )}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        )}
      </Combobox.Root>
    </Field>
  );
};
