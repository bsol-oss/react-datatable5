import { CustomJSONSchema7 } from "./StringInputField";
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
  if (properties === undefined) {
    return <></>;
  }
  console.log(
    `${column} does not exist when using ColumnRenderer`,
    { properties, column, prefix },
    "fdpok"
  );
  const colSchema = properties[column];
  if (colSchema === undefined) {
    throw new Error(`${column} does not exist when using ColumnRenderer`);
  }
  return <SchemaRenderer schema={colSchema} {...{ prefix, column }} />;
};
