import { useContext } from "react";
import { SchemaFormContext } from "./SchemaFormContext";

export const useSchemaContext = () => {
  const {
    schema,
    serverUrl,
    order,
    ignore,
    onSubmit,
    preLoadedValues,
    rowNumber,
    displayText,
  } = useContext(SchemaFormContext);

  return {
    schema,
    serverUrl,
    order,
    ignore,
    onSubmit,
    preLoadedValues,
    rowNumber,
    displayText,
  };
};
