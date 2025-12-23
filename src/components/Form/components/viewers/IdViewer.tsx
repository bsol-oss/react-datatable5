import { Tag } from '@/components/ui/tag';
import { Flex, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormI18n } from '../../utils/useFormI18n';
import {
  CustomJSONSchema7,
  defaultRenderDisplay,
} from '../types/CustomJSONSchema7';

export interface IdViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
  isMultiple?: boolean;
}

export const IdViewer = ({
  column,
  schema,
  prefix,
  isMultiple = false,
}: IdViewerProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { idMap, idPickerLabels, formButtonLabels } = useSchemaContext();
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    renderDisplay,
    foreign_key,
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const formI18n = useFormI18n(column, prefix, schema);

  const colLabel = `${prefix}${column}`;
  const watchId = watch(colLabel);
  const watchIds = (watch(colLabel) ?? []) as string[];

  const getPickedValue = () => {
    if (Object.keys(idMap).length <= 0) {
      return '';
    }
    const record = idMap[watchId];
    if (record === undefined) {
      return '';
    }
    const rendered = renderDisplay
      ? renderDisplay(record)
      : defaultRenderDisplay(record);
    return typeof rendered === 'string' ? rendered : JSON.stringify(record);
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
    >
      {isMultiple && (
        <Flex flexFlow={'wrap'} gap={1}>
          {watchIds.map((id: string) => {
            const item = idMap[id];
            if (item === undefined) {
              return (
                <Text key={id}>{idPickerLabels?.undefined ?? 'Undefined'}</Text>
              );
            }
            return (
              <Tag key={id} closable>
                {renderDisplay
                  ? renderDisplay(item)
                  : defaultRenderDisplay(item)}
              </Tag>
            );
          })}
        </Flex>
      )}
      {!isMultiple && <Text>{getPickedValue()}</Text>}

      {errors[`${colLabel}`] && (
        <Text color={'red.400'}>
          {formButtonLabels?.fieldRequired ?? formI18n.required()}
        </Text>
      )}
    </Field>
  );
};
