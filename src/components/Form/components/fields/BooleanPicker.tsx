import { CheckboxCard } from '@/components/ui/checkbox-card';
import { Field } from '@/components/ui/field';
import { useFormContext } from 'react-hook-form';
import { useFormLabel } from '../../utils/useFormLabel';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';

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
  const fieldError = errors[colLabel]?.message;
  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
      errorText={<>{fieldError}</>}
      invalid={!!fieldError}
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
