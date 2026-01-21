import { Box, Button, Flex, Grid, Icon } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { CgTrash } from 'react-icons/cg';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormLabel } from '../../utils/useFormLabel';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { SchemaRenderer } from './SchemaRenderer';

export interface ArrayRendererProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const ArrayRenderer = ({
  schema,
  column,
  prefix,
}: ArrayRendererProps) => {
  const { gridRow, gridColumn = '1/span 12', required, items } = schema;
  const itemsSchema = Array.isArray(items) ? items[0] : items;
  const { type } = itemsSchema ?? {};

  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const formI18n = useFormLabel(column, prefix, schema);
  const { setValue, watch } = useFormContext();
  const { formButtonLabels } = useSchemaContext();
  const fields = (watch(colLabel) ?? []) as any[];
  return (
    <Flex {...{ gridRow, gridColumn }} flexFlow={'column'} gap={2}>
      <Box as="label">
        {formI18n.label()}
        {isRequired && <span>*</span>}
      </Box>
      <Flex flexFlow={'column'} gap={2}>
        {fields.map((_, index) => (
          <Grid
            key={`${colLabel}.${index}`}
            gridTemplateColumns={'1fr auto'}
            gap={2}
            bgColor={{ base: 'colorPalette.100', _dark: 'colorPalette.900' }}
            p={2}
            borderRadius={4}
            borderWidth={1}
            borderColor={{
              base: 'colorPalette.200',
              _dark: 'colorPalette.800',
            }}
          >
            <Grid gridTemplateColumns={'repeat(12, 1fr)'} autoFlow={'row'}>
              <SchemaRenderer
                {...{
                  column: `${index}`,
                  prefix: `${colLabel}.`,
                  schema: {
                    showLabel: false,
                    ...(Array.isArray(items) ? items[0] : items ?? {}),
                  } as CustomJSONSchema7,
                }}
              />
            </Grid>
            <Flex justifyContent={'end'}>
              <Button
                variant={'ghost'}
                onClick={() => {
                  setValue(
                    colLabel,
                    fields.filter((_, curIndex) => {
                      return curIndex !== index;
                    })
                  );
                }}
              >
                <Icon>
                  <CgTrash />
                </Icon>
              </Button>
            </Flex>
          </Grid>
        ))}
      </Flex>
      <Flex>
        <Button
          onClick={() => {
            if (type === 'number') {
              setValue(colLabel, [...fields, 0]);
              return;
            }
            if (type === 'string') {
              setValue(colLabel, [...fields, '']);
              return;
            }
            if (type === 'boolean') {
              setValue(colLabel, [...fields, false]);
              return;
            }
            setValue(colLabel, [...fields, {}]);
          }}
        >
          {formButtonLabels?.add ?? 'Add'}
        </Button>
      </Flex>
    </Flex>
  );
};
