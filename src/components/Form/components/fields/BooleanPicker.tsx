import { CheckboxCard } from '@/components/ui/checkbox-card';
import { Field } from '@/components/ui/field';
import { Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { removeIndex } from '../../utils/removeIndex';
import { useFormLabel } from '../../utils/useFormLabel';

export interface DatePickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const BooleanPicker = ({ schema, column, prefix }: DatePickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
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
      errorText={errors[`${colLabel}`] ? formI18n.required() : undefined}
      invalid={!!errors[colLabel]}
    >
      <CheckboxCard
        checked={value}
        variant={'surface'}
        onChange={() => {
          setValue(colLabel, !value);
        }}
      />
    </Field>
  );
};
