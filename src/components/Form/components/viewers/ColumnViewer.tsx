import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { SchemaViewer } from "./SchemaViewer";

export interface ColumnViewerProps {
  column: string;
  properties: Record<string, CustomJSONSchema7>;
  prefix: string;
}

export const ColumnViewer = ({
  column,
  properties,
  prefix,
}: ColumnViewerProps) => {
  if (properties === undefined) {
    return <></>;
  }
  const colSchema = properties[column];
  if (colSchema === undefined) {
    throw new Error(`${column} does not exist when using ColumnRenderer`);
  }
  return <SchemaViewer schema={colSchema} {...{ prefix, column }} />;
};
