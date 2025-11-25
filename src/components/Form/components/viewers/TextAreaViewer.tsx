import { Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { removeIndex } from '../../utils/removeIndex';
import { useFormI18n } from '../../utils/useFormI18n';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';

export interface TextAreaViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const TextAreaViewer = ({
  column,
  schema,
  prefix,
}: TextAreaViewerProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(colLabel);
  const formI18n = useFormI18n(column, prefix, schema);
  return (
    <>
      <Field
        label={formI18n.label()}
        required={isRequired}
        gridColumn={gridColumn}
        gridRow={gridRow}
      >
        <Text whiteSpace="pre-wrap">{value}</Text>{' '}
        {errors[colLabel] && (
          <Text color={'red.400'}>{formI18n.required()}</Text>
        )}
      </Field>
    </>
  );
};
