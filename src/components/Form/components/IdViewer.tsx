import { useQuery } from "@tanstack/react-query";
import { getTableData } from "../utils/getTableData";
import { useSchemaContext } from "../useSchemaContext";
import { DataListItem } from "@/components/ui/data-list";
import { snakeToLabel } from "../utils/snakeToLabel";

export interface IdViewerProps {
  value: string | undefined;
  in_table: string;
  column_ref: string;
  display_column: string;
  column: string;
}

export const IdViewer = ({
  value,
  in_table,
  column_ref,
  display_column,
  column,
}: IdViewerProps) => {
  const { serverUrl } = useSchemaContext();

  const query = useQuery({
    queryKey: [`idpicker`, in_table, value],
    queryFn: async () => {
      return await getTableData({
        serverUrl,
        in_table: in_table,
        where: [
          {
            id: column_ref,
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
        label={`${snakeToLabel(column)}`}
        {...getDataListProps((query.data?.data[0] ?? {})[display_column])}
      />
    </>
  );
};
