import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useFormLabel } from '../../utils/useFormLabel';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { Textarea } from '@/components/TextArea/TextArea';

export interface TextAreaInputProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const TextAreaInput = ({
  column,
  schema,
  prefix,
}: TextAreaInputProps) => {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const fieldError = errors[colLabel]?.message;
  const formI18n = useFormLabel(column, prefix, schema);

  const watchValue = watch(colLabel);

  return (
    <>
      <Field
        label={formI18n.label()}
        required={isRequired}
        gridColumn={gridColumn ?? 'span 4'}
        gridRow={gridRow ?? 'span 1'}
        display="grid"
        errorText={fieldError}
        invalid={!!fieldError}
      >
        <Textarea
          value={watchValue}
          onChange={(value) => setValue(colLabel, value)}
        />
      </Field>
    </>
  );
};
