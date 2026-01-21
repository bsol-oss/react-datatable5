import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useFormLabel } from '../../utils/useFormLabel';
import { getNestedError } from '../../utils/getNestedError';
import { InputDefaultProps } from './types';

export interface StringInputFieldProps extends InputDefaultProps {}

export const StringInputField = ({
  column,
  schema,
  prefix,
}: StringInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const fieldError = getNestedError(errors, colLabel);
  const formI18n = useFormLabel(column, prefix, schema);

  return (
    <>
      <Field
        label={formI18n.label()}
        required={isRequired}
        gridColumn={gridColumn}
        gridRow={gridRow}
        errorText={<>{fieldError}</>}
        invalid={!!fieldError}
      >
        <Input
          {...register(`${colLabel}`, { required: isRequired })}
          autoComplete="off"
        />
      </Field>
    </>
  );
};
