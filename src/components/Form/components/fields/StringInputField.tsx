import { Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { removeIndex } from '../../utils/removeIndex';
import { getFieldError } from '../../utils/getFieldError';
import { InputDefaultProps } from './types';

export interface StringInputFieldProps extends InputDefaultProps {}

export interface CustomQueryFnResponse {
  /**
   * The data of the query
   */
  data: any;

  /**
   * The id map of the data
   */
  idMap: Record<string, any>;
}

export interface CustomQueryFnParams {
  searching: string;
  limit: number;
  offset: number;
  where?: Array<{ id: string; value: string | string[] }>;
}

export type CustomQueryFn = (
  params: CustomQueryFnParams
) => Promise<CustomQueryFnResponse>;

export interface ForeignKeyProps {
  column: string;
  table: string;
  display_column: string;
  customQueryFn?: CustomQueryFn;
}
export const StringInputField = ({
  column,
  schema,
  prefix,
}: StringInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const fieldError = getFieldError(errors, colLabel);
  return (
    <>
      <Field
        label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        required={isRequired}
        gridColumn={gridColumn}
        gridRow={gridRow}
        errorText={fieldError}
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
