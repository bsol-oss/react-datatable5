import { Tag } from '@/components/ui/tag';
import { Flex, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import {
  CustomJSONSchema7,
  defaultRenderDisplay,
} from '../types/CustomJSONSchema7';
import { useFormLabel } from '../../utils/useFormLabel';

export interface EnumViewerProps {
  column: string;
  isMultiple?: boolean;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const EnumViewer = ({
  column,
  isMultiple = false,
  schema,
  prefix,
}: EnumViewerProps) => {
  const { watch } = useFormContext();
  const formI18n = useFormLabel(column, prefix, schema);
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const { gridColumn = 'span 12', gridRow = 'span 1', renderDisplay } = schema;
  const colLabel = formI18n.colLabel;
  const watchEnum = watch(colLabel);
  const watchEnums = (watch(colLabel) ?? []) as string[];
  const renderDisplayFunction = renderDisplay || defaultRenderDisplay;

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
          {watchEnums.map((enumValue) => {
            const item = enumValue;
            if (item === undefined) {
              return <>undefined</>;
            }
            return (
              <Tag key={item} size="lg">
                {renderDisplayFunction(item)}
              </Tag>
            );
          })}
        </Flex>
      )}
      {!isMultiple && <Text>{renderDisplayFunction(watchEnum)}</Text>}
    </Field>
  );
};
