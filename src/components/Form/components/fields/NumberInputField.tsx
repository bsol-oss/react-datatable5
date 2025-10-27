import {
  NumberInputField as ChakraNumberInputField,
  NumberInputRoot,
} from '@/components/ui/number-input';
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
  const { translate } = useSchemaContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(`${colLabel}`);
  return (
    <Field
      label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
      required={isRequired}
      {...{ gridColumn, gridRow }}
    >
      <NumberInputRoot
        value={value}
        onValueChange={(details) => {
          setValue(`${colLabel}`, details.value); // Store as string to avoid floating-point precision issues
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
      {errors[`${column}`] && (
        <Text color={'red.400'}>
          {translate.t(removeIndex(`${colLabel}.field_required`))}
        </Text>
      )}
    </Field>
  );
};
