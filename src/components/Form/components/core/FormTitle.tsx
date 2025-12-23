import { Heading } from '@chakra-ui/react';
import { useSchemaContext } from '../../useSchemaContext';

export const FormTitle = () => {
  const { schema } = useSchemaContext();
  return <Heading>{schema.title ?? 'Form'}</Heading>;
};
