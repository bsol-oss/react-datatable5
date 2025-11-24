import { Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Field } from '../../../ui/field';
import { useSchemaContext } from '../../useSchemaContext';
import { removeIndex } from '../../utils/removeIndex';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';

export interface TextAreaViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const TextAreaViewer = ({
  column,
  schema,
  prefix,
}: TextAreaViewerProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(colLabel);
  return (
    <>
      <Field
        label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        required={isRequired}
        gridColumn={gridColumn}
        gridRow={gridRow}
      >
        <Text whiteSpace="pre-wrap">{value}</Text>{' '}
        {errors[colLabel] && (
          <Text color={'red.400'}>
            {translate.t(removeIndex(`${colLabel}.field_required`))}
          </Text>
        )}
      </Field>
    </>
  );
};
