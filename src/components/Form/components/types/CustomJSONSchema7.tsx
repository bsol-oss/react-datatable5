import { JSONSchema7 } from "json-schema";
import { ReactNode } from "react";
import { ForeignKeyProps } from "../fields/StringInputField";

export interface CustomJSONSchema7 extends JSONSchema7 {
  gridColumn?: string;
  gridRow?: string;
  foreign_key?: ForeignKeyProps;
  variant?: string;
  renderDisplay: (item: unknown) => ReactNode;
}
export interface TagPickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}
