import {
  Box,
  Button,
  Combobox,
  Flex,
  HStack,
  Icon,
  Portal,
  Show,
  Skeleton,
  Spinner,
  Text,
  useCombobox,
} from '@chakra-ui/react';
import { useFormLabel } from '../../utils/useFormLabel';
import { Field } from '../../../ui/field';
import { useIdPickerData, RecordType } from './useIdPickerData';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { defaultRenderDisplay } from '../types/CustomJSONSchema7';
import { BiError, BiX } from 'react-icons/bi';

export interface IdPickerSingleProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const IdPickerSingle = ({
  column,
  schema,
  prefix,
}: IdPickerSingleProps) => {
  const formI18n = useFormLabel(column, prefix, schema);
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
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
    collection,
    filter,
    idMap,
    idPickerLabels,
    insideDialog,
    renderDisplay: renderDisplayFn,
    itemToValue,
    itemToString,
    errors,
    setValue,
  } = useIdPickerData({
    column,
    schema,
    prefix,
    isMultiple: false,
  });

  // Get the selected value for single selection display
  const selectedId = currentValue.length > 0 ? currentValue[0] : null;
  const selectedItem = selectedId
    ? (idMap[selectedId] as RecordType | undefined)
    : undefined;

  // Use itemToValue to get the combobox value from the selected item, or use the ID directly
  const comboboxValue = selectedItem
    ? itemToString(selectedItem)
    : selectedId || '';

  // itemToString is available from the hook and can be used to get a readable string
  // representation of any item. The collection's itemToString is automatically used
  // by the combobox to display selected values.

  // Use useCombobox hook to control input value
  const combobox = useCombobox({
    collection,
    value: [comboboxValue],
    onInputValueChange(e) {
      setSearchText(e.inputValue);
      filter(e.inputValue);
    },
    onValueChange(e) {
      setValue(colLabel, e.value[0] || '');
      // Clear the input value after selection
      setSearchText('');
    },
    multiple: false,
    closeOnSelect: true,
    openOnClick: true,
    invalid: !!errors[colLabel],
  });

  // Use renderDisplay from hook (which comes from schema) or fallback to default
  const renderDisplayFunction = renderDisplayFn || defaultRenderDisplay;

  // Get the selected value for single selection display (already computed above)
  const selectedRendered = selectedItem
    ? renderDisplayFunction(selectedItem)
    : null;

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
      <Combobox.RootProvider value={combobox} width="100%">
        <Show when={selectedId && selectedRendered}>
          <HStack justifyContent={'space-between'}>
            <Box>{selectedRendered}</Box>
            {currentValue.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setValue(colLabel, '');
                }}
              >
                <Icon>
                  <BiX />
                </Icon>
              </Button>
            )}
          </HStack>
        </Show>
        <Show when={!selectedId || !selectedRendered}>
          <Combobox.Control position="relative">
            {/* For single selection: render ReactNode directly in input when value is selected */}

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
        </Show>
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
                      item: {
                        label: string;
                        displayLabel: string;
                        value: string;
                        raw: RecordType;
                      },
                      index: number
                    ) => (
                      <Combobox.Item
                        key={item.value ?? `item-${index}`}
                        item={item}
                      >
                        {renderDisplayFunction(item.raw)}
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
                          {renderDisplayFunction(item.raw)}
                        </Combobox.Item>
                      )
                    )}
                  </>
                )}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        )}
      </Combobox.RootProvider>
    </Field>
  );
};
