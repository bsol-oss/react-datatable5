import { useQuery } from "@tanstack/react-query";
import { getTableData } from "../utils/getTableData";
import { useSchemaContext } from "../useSchemaContext";
import { DataListItem } from "@/components/ui/data-list";
import { snakeToLabel } from "../utils/snakeToLabel";
import { CustomJSONSchema7 } from "./StringInputField";

export interface IdViewerProps {
  value: string | undefined;
  column: string;
}

export const IdViewer = ({ value, column }: IdViewerProps) => {
  const { schema, serverUrl } = useSchemaContext();
  if (schema.properties == undefined) {
    throw new Error("schema properties when using DatePicker");
  }
  const { title, foreign_key } = schema.properties[column] as CustomJSONSchema7;
  if(foreign_key === undefined){
    throw new Error('foreign_key when variant is id-picker')
  }
  const { table, column: foreginKeyColumn, display_column } = foreign_key;
  const query = useQuery({
    queryKey: [`idpicker`, table, value],
    queryFn: async () => {
      return await getTableData({
        serverUrl,
        in_table: foreginKeyColumn ?? '',
        where: [
          {
            id: column,
            value: value,
          },
        ],
      });
    },
    staleTime: 10000,
  });

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

  return (
    <>
      <DataListItem
        label={`${title ?? snakeToLabel(column)}`}
        {...getDataListProps((query.data?.data[0] ?? {})[display_column])}
      />
    </>
  );
};
