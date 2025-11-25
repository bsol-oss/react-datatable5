import {
  NumberInputField as ChakraNumberInputField,
  NumberInputRoot,
} from '@/components/ui/number-input';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { removeIndex } from '../../utils/removeIndex';
import { getFieldError } from '../../utils/getFieldError';
import { useFormI18n } from '../../utils/useFormI18n';
export interface NumberInputFieldProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const NumberInputField = ({
  schema,
  column,
  prefix,
}: NumberInputFieldProps) => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    numberStorageType = 'number',
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(`${colLabel}`);
  const fieldError = getFieldError(errors, colLabel);
  const formI18n = useFormI18n(column, prefix, schema);
  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      {...{ gridColumn, gridRow }}
      errorText={
        fieldError
          ? fieldError.includes('required')
            ? formI18n.required()
            : fieldError
          : undefined
      }
      invalid={!!fieldError}
    >
      <NumberInputRoot
        value={value}
        onValueChange={(details) => {
          // Store as string or number based on configuration, default to number
          const value =
            numberStorageType === 'string'
              ? details.value
              : details.valueAsNumber;
          setValue(`${colLabel}`, value);
        }}
        min={schema.minimum}
        max={schema.maximum}
        step={schema.multipleOf || 0.01} // Default to 0.01 for cents/decimals
        allowOverflow={false}
        clampValueOnBlur={false}
        inputMode="decimal"
        formatOptions={schema.formatOptions as Intl.NumberFormatOptions}
      >
        <ChakraNumberInputField required={isRequired} />
      </NumberInputRoot>
    </Field>
  );
};
