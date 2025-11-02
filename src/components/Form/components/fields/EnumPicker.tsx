import { Button } from '@/components/ui/button';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tag } from '@/components/ui/tag';
import {
  Box,
  Flex,
  Grid,
  HStack,
  Input,
  RadioGroup,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { filterArray } from '../../utils/filterArray';
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
  const { enumPickerLabels } = useSchemaContext();
  const formI18n = useFormI18n(column, prefix);
  const { required, variant } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const { gridColumn = 'span 12', gridRow = 'span 1', renderDisplay } = schema;
  const [searchText, setSearchText] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [openSearchResult, setOpenSearchResult] = useState<boolean>();
  const ref = useRef<HTMLInputElement>(null);
  const colLabel = formI18n.colLabel;
  const watchEnum = watch(colLabel);
  const watchEnums = (watch(colLabel) ?? []) as string[];
  const dataList = schema.enum ?? [];
  const count = schema.enum?.length ?? 0;
  const isDirty = (searchText?.length ?? 0) > 0;
  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setLimit(10);
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
        <RadioGroup.Root defaultValue="1">
          <HStack gap="6">
            {filterArray(dataList as string[], searchText ?? '').map(
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
                        : formI18n.t(item)}
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
      {isMultiple && (
        <Flex flexFlow={'wrap'} gap={1}>
          {watchEnums.map((enumValue) => {
            const item = enumValue;
            if (!!item === false) {
              return <></>;
            }
            return (
              <Tag
                key={item}
                size="lg"
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
                  : formI18n.t(item)}
              </Tag>
            );
          })}
          <Tag
            key={`${colLabel}-add-more-tag`}
            size="lg"
            cursor={'pointer'}
            onClick={() => {
              setOpenSearchResult(true);
            }}
          >
            {enumPickerLabels?.addMore ?? formI18n.t('add_more')}
          </Tag>
        </Flex>
      )}
      {!isMultiple && (
        <Button
          variant={'outline'}
          onClick={() => {
            setOpenSearchResult(true);
          }}
          justifyContent={'start'}
        >
          {!!watchEnum === false ? '' : formI18n.t(watchEnum ?? 'null')}
        </Button>
      )}
      <PopoverRoot
        open={openSearchResult}
        onOpenChange={(e) => setOpenSearchResult(e.open)}
        closeOnInteractOutside
        initialFocusEl={() => ref.current}
        positioning={{ placement: 'bottom-start' }}
      >
        <PopoverTrigger />
        <PopoverContent portalled={false}>
          <PopoverBody display={'grid'} gap={1}>
            <Input
              placeholder={
                enumPickerLabels?.typeToSearch ?? formI18n.t('type_to_search')
              }
              onChange={(event) => {
                onSearchChange(event);
                setOpenSearchResult(true);
              }}
              autoComplete="off"
              ref={ref}
            />
            <PopoverTitle />
            {showTotalAndLimit && (
              <Text>{`${enumPickerLabels?.total ?? formI18n.t('total')}: ${count}, ${enumPickerLabels?.showing ?? formI18n.t('showing')} ${limit}`}</Text>
            )}

            <Grid overflow={'auto'} maxHeight={'20rem'}>
              <Flex flexFlow={'column wrap'}>
                {(dataList as string[])
                  .filter((item: string) => {
                    const searchTerm = (searchText || '').toLowerCase();
                    if (!searchTerm) return true;

                    // Check if the original enum value contains the search text
                    const enumValueMatch = item
                      .toLowerCase()
                      .includes(searchTerm);

                    // Check if the display value (translation) contains the search text
                    const displayValue =
                      !!renderDisplay === true
                        ? renderDisplay(item)
                        : formI18n.t(item);

                    // Convert to string and check if it includes the search term
                    const displayValueString =
                      String(displayValue).toLowerCase();
                    const displayValueMatch =
                      displayValueString.includes(searchTerm);

                    return enumValueMatch || displayValueMatch;
                  })
                  .map((item: string) => {
                    const selected = isMultiple
                      ? watchEnums.some((enumValue) => item === enumValue)
                      : watchEnum == item;
                    return (
                      <Box
                        key={`${colLabel}-${item}`}
                        cursor={'pointer'}
                        onClick={() => {
                          if (!isMultiple) {
                            setOpenSearchResult(false);
                            setValue(colLabel, item);
                            return;
                          }
                          const newSet = new Set([...(watchEnums ?? []), item]);
                          setValue(colLabel, [...newSet]);
                        }}
                        {...(selected ? { color: 'colorPalette.400/50' } : {})}
                      >
                        {!!renderDisplay === true
                          ? renderDisplay(item)
                          : formI18n.t(item)}
                      </Box>
                    );
                  })}
              </Flex>
              {isDirty && (
                <>
                  {dataList.length <= 0 && (
                    <>
                      {enumPickerLabels?.emptySearchResult ??
                        formI18n.t('empty_search_result')}
                    </>
                  )}
                </>
              )}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </Field>
  );
};
