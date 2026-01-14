import { Field } from '@/components/ui/field';
import { Grid, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useFormLabel } from '../../utils/useFormLabel';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';

export interface DatePickerProps {
  schema: CustomJSONSchema7;
  column: string;
  prefix: string;
}

export const RecordViewer = ({ column, schema, prefix }: DatePickerProps) => {
  const {
    formState: { errors },
    getValues,
  } = useFormContext();
  const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const entries = Object.entries(getValues(column) ?? {});
  const formI18n = useFormLabel(column, prefix, schema);

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{ gridColumn, gridRow }}
    >
      {entries.length === 0 ? (
        <Text color="gray.500">No entries</Text>
      ) : (
        <Grid templateColumns={'1fr 1fr'} gap={2}>
          {entries.map(([key, value]) => {
            return (
              <Grid key={key} templateColumns={'1fr 1fr'} gap={2}>
                <Text fontWeight="medium">{key}:</Text>
                <Text>{String(value ?? '')}</Text>
              </Grid>
            );
          })}
        </Grid>
      )}
      {errors[`${column}`] && (
        <Text color={'red.400'}>{formI18n.required()}</Text>
      )}
    </Field>
  );
};
