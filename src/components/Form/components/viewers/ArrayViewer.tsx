import { Box, Flex, Grid } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useFormLabel } from '../../utils/useFormLabel';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { SchemaViewer } from './SchemaViewer';

export interface ArrayViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const ArrayViewer = ({ schema, column, prefix }: ArrayViewerProps) => {
  const {
    gridColumn = 'span 12',
    gridRow = 'span 1',
    required,
    items,
  } = schema;
  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const formI18n = useFormLabel(column, prefix, schema);
  const { watch } = useFormContext();
  const values = watch(colLabel) ?? [];

  return (
    <Box {...{ gridRow, gridColumn }}>
      <Box as="label" gridColumn={'1/span12'}>
        {formI18n.label()}
        {isRequired && <span>*</span>}
      </Box>
      <Flex flexFlow={'column'} gap={1}>
        {values.map((_: unknown, index: number) => (
          <Flex
            key={`form-${prefix}${column}.${index}`}
            flexFlow={'column'}
            bgColor={{ base: 'colorPalette.100', _dark: 'colorPalette.900' }}
            p={'2'}
            borderRadius={'md'}
            borderWidth={'thin'}
            borderColor={{
              base: 'colorPalette.200',
              _dark: 'colorPalette.800',
            }}
          >
            <Grid
              gap="4"
              gridTemplateColumns={'repeat(12, 1fr)'}
              autoFlow={'row'}
            >
              <SchemaViewer
                {...{
                  column: `${index}`,
                  prefix: `${colLabel}.`,
                  // @ts-expect-error find suitable types
                  schema: { showLabel: false, ...(items ?? {}) },
                }}
              />
            </Grid>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
