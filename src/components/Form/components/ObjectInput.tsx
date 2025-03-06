import { ColumnRenderer } from "./ColumnRenderer";
import { CustomJSONSchema7 } from "./StringInputField";

export interface ObjectInputProps {
  schema: CustomJSONSchema7;
  column: string;
  prefix: string;
}

export const ObjectInput = ({ schema, column, prefix }: ObjectInputProps) => {
  const { properties } = schema;
  if (properties === undefined) {
    throw new Error(`properties is undefined when using ObjectInput`);
  }

  return (
    <>
      {Object.keys(properties ?? {}).map((key) => {
        console.log(properties, key, "gkor");
        return (
          <ColumnRenderer
            key={`form-${column}`}
            {...{
              column: `${key}`,
              prefix: `${prefix}.${column}.`,
              properties,
            }}
          />
        );
      })}
    </>
  );
};
