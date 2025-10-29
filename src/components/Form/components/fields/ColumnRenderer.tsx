import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { SchemaRenderer } from './SchemaRenderer';

export interface ColumnRendererProps {
  column: string;
  properties: Record<string, CustomJSONSchema7>;
  prefix: string;
  parentRequired?: string[];
}

export const ColumnRenderer = ({
  column,
  properties,
  prefix,
  parentRequired,
}: ColumnRendererProps) => {
  const colSchema = properties[column];
  const colLabel = `${prefix}${column}`;
  if (colSchema === undefined) {
    throw new Error(`${colLabel} does not exist when using ColumnRenderer`);
  }

  // Merge parent's required array with the schema's required array
  const schemaWithRequired = {
    ...colSchema,
    required: parentRequired || colSchema.required,
  };

  return <SchemaRenderer schema={schemaWithRequired} {...{ prefix, column }} />;
};
