import { useContext } from "react";
import { SchemaFormContext } from "./SchemaFormContext";

export const useSchemaContext = () => {
  const {
    schema,
    serverUrl,
    title,
    order,
    ignore,
    onSubmit,
    preLoadedValues,
    rowNumber,
  } = useContext(SchemaFormContext);

  return {
    schema,
    serverUrl,
    title,
    order,
    ignore,
    onSubmit,
    preLoadedValues,
    rowNumber,
  };
};
