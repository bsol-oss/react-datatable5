import { DataListItem } from "@/components/ui/data-list";
import { useSchemaContext } from "../useSchemaContext";
import { snakeToLabel } from "../utils/snakeToLabel";
import { CustomJSONSchema7 } from "./StringInputField";
import { DataListItemProps } from "@chakra-ui/react";

export interface IdViewerProps {
  value: string | undefined;
  column: string;
  dataListItemProps?: DataListItemProps;
}

export const IdViewer = ({
  value,
  column,
  dataListItemProps,
}: IdViewerProps) => {
  const { schema, idMap } = useSchemaContext();
  if (schema.properties == undefined) {
    throw new Error("schema properties when using DatePicker");
  }
  const { title, foreign_key } = schema.properties[column] as CustomJSONSchema7;
  if (foreign_key === undefined) {
    throw new Error("foreign_key when variant is id-picker");
  }
  const { display_column } = foreign_key;

  const getDataListProps = (value: string | undefined) => {
    if (value == undefined || value.length <= 0) {
      return {
        value: "<empty>",
        color: "gray.400",
      };
    }
    return {
      value: value,
    };
  };
  if (value === undefined) {
    return <>undefined</>;
  }

  return (
    <DataListItem
      label={`${title ?? snakeToLabel(column)}`}
      {...getDataListProps(idMap[value][display_column])}
      {...dataListItemProps}

    />
  );
};
