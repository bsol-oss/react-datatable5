import { Flex, Grid } from '@chakra-ui/react';
import { useSchemaContext } from '../../useSchemaContext';
import { ColumnRenderer } from '../fields/ColumnRenderer';

export const FormBody = () => {
  const { schema } = useSchemaContext();
  const { properties } = schema;

  const ordered = Object.keys(properties as object);

  return (
    <Flex flexFlow={'column'} gap="2">
      <Grid gap="4" gridTemplateColumns={'repeat(12, 1fr)'} autoFlow={'row'}>
        {ordered.map((column) => {
          if (!properties) {
            console.error(
              'properties is undefined when using FormBody',
              schema
            );
            return null;
          }
          return (
            <ColumnRenderer
              properties={properties}
              prefix={``}
              key={`form-input-${column}`}
              parentRequired={schema.required as string[] | undefined}
              {...{ column }}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};
