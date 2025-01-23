import { JSONSchema7 } from "json-schema";
import { createContext } from "react";

export interface SchemaContext {
  schema: JSONSchema7;
}

export const SchemaContext = createContext<SchemaContext>({
  schema: {} as JSONSchema7,
});
