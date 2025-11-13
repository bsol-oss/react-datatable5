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
  const formI18n = useFormI18n(column, prefix);
  const { required, variant } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const { gridColumn = 'span 12', gridRow = 'span 1', renderDisplay } = schema;
  const colLabel = formI18n.colLabel;
  const watchEnum = watch(colLabel);
  const watchEnums = (watch(colLabel) ?? []) as string[];
  const dataList = schema.enum ?? [];

  // Current value for combobox (array format)
  const currentValue = isMultiple
    ? watchEnums.filter((val) => val != null && val !== '')
    : watchEnum
      ? [watchEnum]
      : [];

  // Transform enum data for combobox collection
  const comboboxItems = useMemo(() => {
    return (dataList as string[]).map((item: string) => ({
      label:
        !!renderDisplay === true
          ? String(renderDisplay(item))
          : formI18n.t(item),
      value: item,
    }));
  }, [dataList, renderDisplay, formI18n]);

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
                    {!!renderDisplay === true
                      ? renderDisplay(item)
                      : formI18n.t(item)}
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
                {!!renderDisplay === true
                  ? renderDisplay(enumValue)
                  : formI18n.t(enumValue)}
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
            placeholder={
              enumPickerLabels?.typeToSearch ?? formI18n.t('type_to_search')
            }
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
                  {`${enumPickerLabels?.total ?? formI18n.t('total')}: ${
                    collection.items.length
                  }`}
                </Text>
              )}
              {collection.items.length === 0 ? (
                <Combobox.Empty>
                  {enumPickerLabels?.emptySearchResult ??
                    formI18n.t('empty_search_result')}
                </Combobox.Empty>
              ) : (
                <>
                  {collection.items.map((item, index) => (
                    <Combobox.Item
                      key={item.value ?? `item-${index}`}
                      item={item}
                    >
                      <Combobox.ItemText>{item.label}</Combobox.ItemText>
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
                    {`${enumPickerLabels?.total ?? formI18n.t('total')}: ${
                      collection.items.length
                    }`}
                  </Text>
                )}
                {collection.items.length === 0 ? (
                  <Combobox.Empty>
                    {enumPickerLabels?.emptySearchResult ??
                      formI18n.t('empty_search_result')}
                  </Combobox.Empty>
                ) : (
                  <>
                    {collection.items.map((item, index) => (
                      <Combobox.Item
                        key={item.value ?? `item-${index}`}
                        item={item}
                      >
                        <Combobox.ItemText>{item.label}</Combobox.ItemText>
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
