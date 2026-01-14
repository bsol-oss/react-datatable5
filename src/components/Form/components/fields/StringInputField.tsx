import { Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useFormLabel } from '../../utils/useFormLabel';
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
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const fieldError = errors[colLabel]?.message;
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
