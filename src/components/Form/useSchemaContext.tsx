import { useContext } from "react";
import { SchemaFormContext } from "./SchemaFormContext";

export const useSchemaContext = () => {
  const { schema, serverUrl } = useContext(SchemaFormContext);

  return {
    schema,
    serverUrl,
  };
};
