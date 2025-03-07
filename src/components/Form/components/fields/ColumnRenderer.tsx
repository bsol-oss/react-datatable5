import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { SchemaRenderer } from "./SchemaRenderer";

export interface ColumnRendererProps {
  column: string;
  properties: Record<string, CustomJSONSchema7>;
  prefix: string;
}

export const ColumnRenderer = ({
  column,
  properties,
  prefix,
}: ColumnRendererProps) => {
  const colSchema = properties[column];
  const colLabel = `${prefix}${column}`
  if (colSchema === undefined) {
    throw new Error(`${colLabel} does not exist when using ColumnRenderer`);
  }
  return <SchemaRenderer schema={colSchema} {...{ prefix, column }} />;
};
