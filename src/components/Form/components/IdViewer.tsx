import { RecordDisplay } from "@/components/DataTable/components/RecordDisplay";
import { Flex, Text } from "@chakra-ui/react";
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSchemaContext } from "../useSchemaContext";
import { CustomJSONSchema7 } from "./types/CustomJSONSchema7";

export interface IdViewerProps {
  value: string | undefined;
  column: string;
}

export const IdViewer = ({ value, column }: IdViewerProps) => {
  const { schema, idMap, translate } = useSchemaContext();
  if (schema.properties == undefined) {
    throw new Error("schema properties when using DatePicker");
  }
  const { foreign_key } = schema.properties[column] as CustomJSONSchema7;
  if (foreign_key === undefined) {
    throw new Error("foreign_key when variant is id-picker");
  }
  const { display_column } = foreign_key;

  if (value === undefined) {
    return (
      <Flex flexFlow={"column"}>
        <Text>{translate.t(`${column}.fieldLabel`)}</Text>
        <Text>{translate.t(`empty`)}</Text>
      </Flex>
    );
  }

  return (
    <Flex flexFlow={"column"}>
      <Text>{translate.t(`${column}.fieldLabel`)}</Text>

      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <Text cursor={'pointer'}>{idMap[value][display_column]}</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow />
          <RecordDisplay object={idMap[value]} />
        </HoverCardContent>
      </HoverCardRoot>
    </Flex>
  );
};
