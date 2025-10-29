import { Box, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { removeIndex } from '../../utils/removeIndex';
import { getFieldError } from '../../utils/getFieldError';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { Textarea } from '@/components/TextArea/TextArea';

export interface TextAreaInputProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export interface ForeignKeyProps {
  column: string;
  table: string;
  display_column: string;
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
  const { translate } = useSchemaContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const form = useFormContext();
  const { setValue, watch } = form;
  const fieldError = getFieldError(errors, colLabel);

  const watchValue = watch(colLabel);

  return (
    <>
      <Field
        label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        required={isRequired}
        gridColumn={gridColumn ?? 'span 4'}
        gridRow={gridRow ?? 'span 1'}
        display="grid"
        errorText={
          fieldError
            ? fieldError.includes('required')
              ? translate.t(removeIndex(`${colLabel}.field_required`))
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
