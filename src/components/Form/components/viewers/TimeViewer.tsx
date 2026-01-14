import { Field } from '@/components/ui/field';
import { Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormLabel } from '../../utils/useFormLabel';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';

export interface TimeViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const TimeViewer = ({ column, schema, prefix }: TimeViewerProps) => {
  const { watch } = useFormContext();
  const { timezone } = useSchemaContext();
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    displayTimeFormat = 'hh:mm A',
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const selectedDate = watch(colLabel);
  const formI18n = useFormLabel(column, prefix, schema);
  const displayedTime = dayjs(`1970-01-01T${selectedDate}`)
    .tz(timezone)
    .isValid()
    ? dayjs(`1970-01-01T${selectedDate}`).tz(timezone).format(displayTimeFormat)
    : '';
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
      <Text>{displayedTime}</Text>
    </Field>
  );
};
