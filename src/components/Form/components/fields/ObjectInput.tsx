import { Box, Grid } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ColumnRenderer } from './ColumnRenderer';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { useFormLabel } from '../../utils/useFormLabel';

export interface ObjectInputProps {
  schema: CustomJSONSchema7;
  column: string;
  prefix: string;
}

export const ObjectInput = ({ schema, column, prefix }: ObjectInputProps) => {
  const {
    properties,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    required,
    showLabel = true,
  } = schema;
  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const formI18n = useFormLabel(column, prefix, schema);
  useFormContext();
  if (properties === undefined) {
    throw new Error(`properties is undefined when using ObjectInput`);
  }
  return (
    <Box {...{ gridRow, gridColumn }}>
      {showLabel && (
        <Box as="label">
          {formI18n.label()}
          {isRequired && <span>*</span>}
        </Box>
      )}
      <Grid
        bgColor={{ base: 'colorPalette.100', _dark: 'colorPalette.900' }}
        p={2}
        borderRadius={4}
        borderWidth={1}
        borderColor={{
          base: 'colorPalette.200',
          _dark: 'colorPalette.800',
        }}
        gap="4"
        padding={'4'}
        gridTemplateColumns={'repeat(12, 1fr)'}
        autoFlow={'row'}
      >
        {Object.keys(properties ?? {}).map((key) => {
          return (
            // @ts-expect-error find suitable types
            <ColumnRenderer
              key={`form-${colLabel}-${key}`}
              {...{
                column: `${key}`,
                prefix: `${prefix}${column}.`,
                properties,
                parentRequired: required,
              }}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
