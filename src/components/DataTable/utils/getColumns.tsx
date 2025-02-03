import { idListSanityCheck } from "@/components/Form/utils/idListSanityCheck";
import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table";
import { JSONSchema7 } from "json-schema";
import { TextCell } from "../TextCell";
import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";

export interface GetColumnsConfigs {
  schema: JSONSchema7;
  ignore?: string[];
  width?: number[];
  defaultWidth?: number
}

export const widthSanityCheck = (
  widthList: number[],
  ignoreList: string[],
  properties: object
) => {
  const widthListToolong = widthList.length > Object.keys(properties).length;

  if (widthListToolong) {
    throw new Error(
      `The width list is too long given from the number of properties.`
    );
  }

  const widthListToolongWithIgnore =
    widthList.length > Object.keys(properties).length - ignoreList.length;

  if (widthListToolongWithIgnore) {
    throw new Error(
      `The width list is too long given from the number of remaining properties after ignore some.`
    );
  }
};

export const getColumns = <TData extends RowData>({
  schema,
  ignore = [],
  width = [],
  defaultWidth = 400,
}: GetColumnsConfigs) => {
  const { properties } = schema;
  idListSanityCheck("ignore", ignore, properties as object);
  widthSanityCheck(width, ignore, properties as object);
  const keys = Object.keys(properties as object);
  const ignored = keys.filter((key) => {
    return !ignore.some((shouldIgnoreKey) => key === shouldIgnoreKey);
  });

  const columnHelper = createColumnHelper();
  // @ts-expect-error find type for unknown
  const columns: ColumnDef<TData>[] = [
    ...ignored.map((column, index) => {
      return columnHelper.accessor(column, {
        cell: (props) => {
          // @ts-expect-error find type for unknown
          return <TextCell>{props.row.original[column]}</TextCell>;
        },
        header: () => <span>{snakeToLabel(column)}</span>,
        footer: () => <span>{snakeToLabel(column)}</span>,
        size: width[index] ?? defaultWidth,
      });
    }),
  ];
  return columns;
};
