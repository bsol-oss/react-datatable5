import { Tag } from '@/components/ui/tag';
import {
  Combobox,
  Flex,
  HStack,
  Portal,
  RadioGroup,
  Text,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormI18n } from '../../utils/useFormI18n';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';

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
  const { enumPickerLabels, insideDialog } = useSchemaContext();
  const formI18n = useFormI18n(column, prefix, schema);
  const { required, variant } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const { gridColumn = 'span 12', gridRow = 'span 1', renderDisplay } = schema;
  const colLabel = formI18n.colLabel;
  const watchEnum = watch(colLabel);
  const watchEnums = (watch(colLabel) ?? []) as string[];
  const dataList = schema.enum ?? [];

  // Helper function to render enum value
  // If renderDisplay is provided, use it; otherwise show the enum string value directly
  const renderEnumValue = (value: string) => {
    if (renderDisplay) {
      return renderDisplay(value);
    }
    // If no renderDisplay provided, show the enum string value directly
    return value;
  };

  // Debug log when renderDisplay is missing
  if (!renderDisplay) {
    console.debug(
      `[EnumPicker] Missing renderDisplay for field '${colLabel}'. Add renderDisplay function to schema for field '${colLabel}' to provide custom UI rendering. Currently showing enum string values directly.`,
      {
        fieldName: column,
        colLabel,
        prefix,
        enumValues: dataList,
      }
    );
  }

  // Current value for combobox (array format)
  const currentValue = isMultiple
    ? watchEnums.filter((val) => val != null && val !== '')
    : watchEnum
      ? [watchEnum]
      : [];

  // Transform enum data for combobox collection
  // Note: label is used internally for search/filtering only
  // All UI display relies on renderEnumValue (see Combobox.ItemText below)
  type ComboboxItem = {
    label: string; // Used for combobox search/filtering (not displayed)
    value: string;
    raw: string; // Raw enum value passed to renderEnumValue for UI rendering
  };

  const comboboxItems = useMemo<ComboboxItem[]>(() => {
    return (dataList as string[]).map((item: string) => ({
      label: item, // Internal: used for search/filtering only
      value: item,
      raw: item, // Passed to renderEnumValue for UI rendering
    }));
  }, [dataList]);

  // Use filter hook for combobox
  const { contains } = useFilter({ sensitivity: 'base' });

  // Create collection for combobox
  const { collection, filter } = useListCollection({
    initialItems: comboboxItems,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
    filter: contains,
  });

  // Handle input value change (search)
  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails
  ) => {
    filter(details.inputValue);
  };

  // Handle value change
  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    if (isMultiple) {
      setValue(colLabel, details.value);
    } else {
      setValue(colLabel, details.value[0] || '');
    }
  };

  if (variant === 'radio') {
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
        <RadioGroup.Root
          value={!isMultiple ? watchEnum : undefined}
          onValueChange={(details) => {
            if (!isMultiple) {
              setValue(colLabel, details.value);
            }
          }}
        >
          <HStack gap="6">
            {(dataList as string[]).map((item: string) => {
              return (
                <RadioGroup.Item key={`${colLabel}-${item}`} value={item}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>
                    {renderEnumValue(item)}
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
              );
            })}
          </HStack>
        </RadioGroup.Root>
      </Field>
    );
  }

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
      {isMultiple && currentValue.length > 0 && (
        <Flex flexFlow={'wrap'} gap={1} mb={2}>
          {currentValue.map((enumValue: string) => {
            if (!enumValue) {
              return null;
            }
            return (
              <Tag
                key={enumValue}
                size="lg"
                closable
                onClick={() => {
                  const newValue = currentValue.filter(
                    (val: string) => val !== enumValue
                  );
                  setValue(colLabel, newValue);
                }}
              >
                {renderEnumValue(enumValue)}
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
        multiple={isMultiple}
        closeOnSelect={!isMultiple}
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
            placeholder={enumPickerLabels?.typeToSearch ?? 'Type to search'}
          />
          <Combobox.IndicatorGroup>
            {!isMultiple && currentValue.length > 0 && (
              <Combobox.ClearTrigger
                onClick={() => {
                  setValue(colLabel, '');
                }}
              />
            )}
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        {insideDialog ? (
          <Combobox.Positioner>
            <Combobox.Content>
              {showTotalAndLimit && (
                <Text p={2} fontSize="sm" color="fg.muted">
                  {`${enumPickerLabels?.total ?? 'Total'}: ${
                    collection.items.length
                  }`}
                </Text>
              )}
              {collection.items.length === 0 ? (
                <Combobox.Empty>
                  {enumPickerLabels?.emptySearchResult ?? 'No results found'}
                </Combobox.Empty>
              ) : (
                <>
                  {collection.items.map((item: ComboboxItem, index) => (
                    <Combobox.Item
                      key={item.value ?? `item-${index}`}
                      item={item}
                    >
                      <Combobox.ItemText>
                        {renderEnumValue(item.raw)}
                      </Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </>
              )}
            </Combobox.Content>
          </Combobox.Positioner>
        ) : (
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                {showTotalAndLimit && (
                  <Text p={2} fontSize="sm" color="fg.muted">
                    {`${enumPickerLabels?.total ?? 'Total'}: ${
                      collection.items.length
                    }`}
                  </Text>
                )}
                {collection.items.length === 0 ? (
                  <Combobox.Empty>
                    {enumPickerLabels?.emptySearchResult ?? 'No results found'}
                  </Combobox.Empty>
                ) : (
                  <>
                    {collection.items.map((item: ComboboxItem, index) => (
                      <Combobox.Item
                        key={item.value ?? `item-${index}`}
                        item={item}
                      >
                        <Combobox.ItemText>
                          {renderEnumValue(item.raw)}
                        </Combobox.ItemText>
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    ))}
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
