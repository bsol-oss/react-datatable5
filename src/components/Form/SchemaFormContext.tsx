import { JSONSchema7 } from "json-schema";
import { createContext } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export interface SchemaFormContext<TData extends FieldValues> {
  schema: JSONSchema7;
  serverUrl: string;
  title: string;
  order: string[];
  ignore: string[];
  onSubmit?: SubmitHandler<TData>;
  preLoadedValues: object;
}


//@ts-expect-error TODO: find appropriate type
export const SchemaFormContext = createContext<SchemaFormContext<unknown>>({
  schema: {} as JSONSchema7,
  serverUrl: "",
  title: "",
  order: [],
  ignore: [],
  onSubmit: () => {},
  preLoadedValues: {},
});
