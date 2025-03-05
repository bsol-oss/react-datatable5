import { useContext } from "react";
import { SchemaFormContext } from "./SchemaFormContext";

export const useSchemaContext = () => {
  const {
    schema,
    serverUrl,
    requestUrl,
    order,
    ignore,
    onSubmit,
    rowNumber,
    idMap,
    setIdMap,
    translate,
    requestOptions,
  } = useContext(SchemaFormContext);

  return {
    schema,
    serverUrl,
    requestUrl,
    order,
    ignore,
    onSubmit,
    rowNumber,
    idMap,
    setIdMap,
    translate,
    requestOptions,
  };
};
