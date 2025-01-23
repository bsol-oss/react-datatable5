import { useContext } from "react";
import { SchemaContext } from "./SchemaContext";

export const useSchemaContext = () => {
  const { schema } = useContext(SchemaContext);

  return {
    schema,
  };
};
