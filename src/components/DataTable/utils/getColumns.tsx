import { idListSanityCheck } from "@/components/Form/utils/idListSanityCheck";
import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table";
import { JSONSchema7 } from "json-schema";
import { TextCell } from "../TextCell";
import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";

export interface getColumnsConfigs {
  schema: JSONSchema7;
  ignore: string[];
}

export const getColumns = <TData extends RowData>({
  schema,
  ignore,
}: getColumnsConfigs) => {
  const { properties } = schema;
  idListSanityCheck("ignore", ignore, properties as object);
  const keys = Object.keys(properties as object);
  const ignored = keys.filter((key) => {
    return !ignore.some((shouldIgnoreKey) => key === shouldIgnoreKey);
  });

  const columnHelper = createColumnHelper();
  // @ts-expect-error find type for unknown
  const columns: ColumnDef<TData>[] = [
    ...ignored.map((column) => {
      return columnHelper.accessor(column, {
        cell: (props) => {
          // @ts-expect-error find type for unknown
          return <TextCell>{props.row.original[column]}</TextCell>;
        },
        header: () => <span>{snakeToLabel(column)}</span>,
        footer: () => <span>{snakeToLabel(column)}</span>,
        size: 400,
      });
    }),
  ];
  return columns;
};
