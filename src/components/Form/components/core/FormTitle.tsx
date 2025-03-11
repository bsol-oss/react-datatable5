import { Heading } from "@chakra-ui/react";
import { useSchemaContext } from "../../useSchemaContext";

export const FormTitle = () => {
  const { translate } = useSchemaContext();
  return <Heading>{translate.t("title")}</Heading>;
};
