import { useQuery } from "@tanstack/react-query";
import { getTableData } from "../utils/getTableData";
import { useSchemaContext } from "../useSchemaContext";

export interface IdViewerProps {
  value: string | undefined;
  in_table: string;
  column_ref: string;
  display_column: string;
}

export const IdViewer = ({
  value,
  in_table,
  column_ref,
  display_column,
}: IdViewerProps) => {
  const { serverUrl } = useSchemaContext();

  const query = useQuery({
    queryKey: [`idpicker`, in_table],
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

  return (
    <>
      {JSON.stringify({
        value,
        in_table,
        column_ref,
        display_column,
      })}
      {JSON.stringify(query.data)}
    </>
  );
};
