import { useContext } from "react";
import { SchemaFormContext } from "./SchemaFormContext";

export const useSchemaContext = () => {
  const {
    schema,
    serverUrl,
    order,
    ignore,
    onSubmit,
    rowNumber,
    displayText,
    idMap,
    setIdMap,
  } = useContext(SchemaFormContext);

  return {
    schema,
    serverUrl,
    order,
    ignore,
    onSubmit,
    rowNumber,
    displayText,
    idMap,
    setIdMap,
  };
};
