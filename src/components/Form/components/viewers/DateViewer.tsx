import { Field } from '@/components/ui/field';
import { Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { removeIndex } from '../../utils/removeIndex';
import { useFormLabel } from '../../utils/useFormLabel';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import dayjs from 'dayjs';

export interface DateViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const DateViewer = ({ column, schema, prefix }: DateViewerProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { timezone } = useSchemaContext();
  const {
    required,
    gridColumn = 'span 4',
    gridRow = 'span 1',
    displayDateFormat = 'YYYY-MM-DD',
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const selectedDate = watch(colLabel);
  const formI18n = useFormLabel(column, prefix, schema);
  const displayDate = dayjs(selectedDate)
    .tz(timezone)
    .format(displayDateFormat);

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      <Text> {selectedDate !== undefined ? displayDate : ''}</Text>
      {errors[`${column}`] && (
        <Text color={'red.400'}>{formI18n.required()}</Text>
      )}
    </Field>
  );
};
