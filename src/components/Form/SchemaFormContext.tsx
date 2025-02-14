import { JSONSchema7 } from "json-schema";
import { createContext } from "react";
import { FieldValues } from "react-hook-form";
import { DisplayTextProps } from "./Form";

export interface SchemaFormContext<TData extends FieldValues> {
  schema: JSONSchema7;
  serverUrl: string;
  order: string[];
  ignore: string[];
  displayText: DisplayTextProps;
  onSubmit?: (data: TData) => Promise<void>;
  preLoadedValues: object;
  rowNumber?: number | string;
}

//@ts-expect-error TODO: find appropriate type
export const SchemaFormContext = createContext<SchemaFormContext<unknown>>({
  schema: {} as JSONSchema7,
  serverUrl: "",
  order: [],
  ignore: [],
  onSubmit: async () => {},
  preLoadedValues: {},
  rowNumber: 0,
  displayText: {},
});
