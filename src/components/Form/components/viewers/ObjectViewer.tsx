import { Box, Grid, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { ColumnViewer } from './ColumnViewer';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { removeIndex } from '../../utils/removeIndex';
import { useFormI18n } from '../../utils/useFormI18n';

export interface ObjectViewerProps {
  schema: CustomJSONSchema7;
  column: string;
  prefix: string;
}

export const ObjectViewer = ({ schema, column, prefix }: ObjectViewerProps) => {
  const {
    properties,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    required,
    showLabel = true,
  } = schema;
  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const formI18n = useFormI18n(column, prefix, schema);
  const {
    formState: { errors },
  } = useFormContext();
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
        gap="4"
        padding={'4'}
        gridTemplateColumns={'repeat(12, 1fr)'}
        autoFlow={'row'}
        bgColor={{ base: 'colorPalette.100', _dark: 'colorPalette.900' }}
        p={'1'}
        borderRadius={'md'}
        borderWidth={'thin'}
        borderColor={{
          base: 'colorPalette.200',
          _dark: 'colorPalette.800',
        }}
      >
        {Object.keys(properties ?? {}).map((key) => {
          return (
            // @ts-expect-error find suitable types
            <ColumnViewer
              key={`form-objectviewer-${colLabel}-${key}`}
              {...{
                column: `${key}`,
                prefix: `${prefix}${column}.`,
                properties,
              }}
            />
          );
        })}
      </Grid>
      {errors[`${column}`] && (
        <Text color={'red.400'}>{formI18n.required()}</Text>
      )}
    </Box>
  );
};
