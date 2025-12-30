import { Heading } from '@chakra-ui/react';
import { useSchemaContext } from '../../useSchemaContext';

export const FormTitle = () => {
  const { schema } = useSchemaContext();

  // Debug log when form title is missing
  if (!schema.title) {
    console.debug(
      '[Form Title] Missing title in root schema. Add title property to schema.',
      {
        schema: {
          type: schema.type,
          properties: schema.properties
            ? Object.keys(schema.properties)
            : undefined,
        },
      }
    );
  }

  return <Heading>{schema.title ?? 'Form'}</Heading>;
};
