import { Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { removeIndex } from '../../utils/removeIndex';
export interface NumberInputFieldProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const NumberViewer = ({
  schema,
  column,
  prefix,
}: NumberInputFieldProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(colLabel);

  // Format the value for display if formatOptions are provided
  const formatValue = (val: string | number | undefined) => {
    if (val === undefined || val === null || val === '') return '';

    const numValue = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(numValue)) return String(val);

    // Use formatOptions if available, otherwise display as-is
    if (schema.formatOptions) {
      try {
        return new Intl.NumberFormat(undefined, schema.formatOptions).format(
          numValue
        );
      } catch {
        return String(val);
      }
    }

    return String(val);
  };

  return (
    <Field
      label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
      required={isRequired}
      {...{ gridColumn, gridRow }}
    >
      <Text>{formatValue(value)}</Text>
      {errors[`${column}`] && (
        <Text color={'red.400'}>
          {translate.t(removeIndex(`${colLabel}.field_required`))}
        </Text>
      )}
    </Field>
  );
};
