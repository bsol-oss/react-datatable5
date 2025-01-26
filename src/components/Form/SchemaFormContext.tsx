import { JSONSchema7 } from "json-schema";
import { createContext } from "react";

export interface SchemaFormContext {
  schema: JSONSchema7;
  serverUrl: string;
}

export const SchemaFormContext = createContext<SchemaFormContext>({
  schema: {} as JSONSchema7,
  serverUrl: "",
});
