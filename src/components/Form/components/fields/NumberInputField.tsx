import { NumberInput } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { getFieldError } from '../../utils/getFieldError';
import { useFormI18n } from '../../utils/useFormI18n';
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
  const fieldError = getFieldError(errors, colLabel);
  const formI18n = useFormI18n(column, prefix, schema);

  // Determine default value: use minimum if provided, otherwise use 0
  const defaultValue = schema.minimum !== undefined ? schema.minimum : 0;
  const hasInitialized = useRef(false);

  // Initialize with default value if no value is provided (only once on mount)
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      if (value === undefined || value === null || value === '') {
        const initialValue =
          numberStorageType === 'string' ? String(defaultValue) : defaultValue;
        setValue(`${colLabel}`, initialValue, { shouldValidate: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Convert value to string for NumberInput (it uses string values internally)
  // NumberInput expects string values to preserve locale-specific formatting
  const stringValue =
    value !== undefined && value !== null && value !== ''
      ? String(value)
      : String(defaultValue);

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
        min={schema.minimum}
        max={schema.maximum}
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
