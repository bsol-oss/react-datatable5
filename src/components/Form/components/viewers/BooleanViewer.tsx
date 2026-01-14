import { Field } from '@/components/ui/field';
import { Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { useFormLabel } from '../../utils/useFormLabel';

export interface BooleanViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const BooleanViewer = ({
  schema,
  column,
  prefix,
}: BooleanViewerProps) => {
  const { watch } = useFormContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(colLabel);
  const formI18n = useFormLabel(column, prefix, schema);
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
      <Text>{value ? 'True' : 'False'}</Text>
    </Field>
  );
};
