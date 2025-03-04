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
    idMap,
    setIdMap,
    translate,
  } = useContext(SchemaFormContext);

  return {
    schema,
    serverUrl,
    order,
    ignore,
    onSubmit,
    rowNumber,
    idMap,
    setIdMap,
    translate,
  };
};
