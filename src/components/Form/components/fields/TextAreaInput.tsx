import { Box, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { removeIndex } from '../../utils/removeIndex';
import { getFieldError } from '../../utils/getFieldError';
import { useFormI18n } from '../../utils/useFormI18n';
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
    register,
    formState: { errors },
  } = useFormContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const form = useFormContext();
  const { setValue, watch } = form;
  const fieldError = getFieldError(errors, colLabel);
  const formI18n = useFormI18n(column, prefix, schema);

  const watchValue = watch(colLabel);

  return (
    <>
      <Field
        label={formI18n.label()}
        required={isRequired}
        gridColumn={gridColumn ?? 'span 4'}
        gridRow={gridRow ?? 'span 1'}
        display="grid"
        errorText={
          fieldError
            ? fieldError.includes('required')
              ? formI18n.required()
              : fieldError
            : undefined
        }
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
