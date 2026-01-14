import { NumberInput } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useFormLabel } from '../../utils/useFormLabel';
import { getNestedError } from '../../utils/getNestedError';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';

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
  const fieldError = getNestedError(errors, colLabel);
  const formI18n = useFormLabel(column, prefix, schema);

  // Convert value to string for NumberInput (it uses string values internally)
  // NumberInput expects string values to preserve locale-specific formatting
  // Do not fill any default value if initial value doesn't exist
  const stringValue =
    value !== undefined && value !== null && value !== ''
      ? String(value)
      : undefined;

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      {...{ gridColumn, gridRow }}
      errorText={fieldError}
      invalid={!!fieldError}
    >
      <NumberInput.Root
        value={stringValue}
        onValueChange={(details) => {
          // Store as string or number based on configuration, default to number
          // Handle empty values properly - if value is empty string, store undefined
          if (details.value === '' || details.value === undefined) {
            setValue(`${colLabel}`, undefined);
            return;
          }
          const newValue =
            numberStorageType === 'string'
              ? details.value
              : details.valueAsNumber;
          setValue(`${colLabel}`, newValue);
        }}
        step={schema.multipleOf || 0.01}
        allowOverflow={false}
        clampValueOnBlur={true}
        inputMode="decimal"
        formatOptions={schema.formatOptions}
        disabled={schema.readOnly}
        required={isRequired}
        variant="outline"
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Field>
  );
};
