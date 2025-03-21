import { idListSanityCheck } from "@/components/Form/utils/idListSanityCheck";
import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table";
import { JSONSchema7 } from "json-schema";
import { TextCell } from "../display/TextCell";
import { RecordDisplay } from "../display/RecordDisplay";
import { Grid } from "@chakra-ui/react";
import { UseTranslationResponse } from "react-i18next";

export interface GetColumnsConfigs<K extends RowData> {
  schema: JSONSchema7;
  include?: K[];
  ignore?: K[];
  width?: number[];
  meta?: {
    [key in K as string]?: object;
  };
  defaultWidth?: number;
  translate?: UseTranslationResponse<any, any>;
}

export const widthSanityCheck = <K extends RowData>(
  widthList: number[],
  ignoreList: K[],
  properties: {
    [key in K as string]?: object;
  }
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
  include = [],
  ignore = [],
  width = [],
  meta = {},
  defaultWidth = 400,
  translate,
}: GetColumnsConfigs<TData>): ColumnDef<TData>[] => {
  const { properties } = schema;
  idListSanityCheck("ignore", ignore as string[], properties as object);
  widthSanityCheck(width, ignore, properties as object);
  idListSanityCheck("meta", Object.keys(meta), properties as object);

  const getColumn = ({ column }) => {
    if (translate !== undefined) {
      return translate.t(`${column}`);
    }
    return snakeToLabel(column);
  };
  const keys = Object.keys(properties as object);
  const included = include.length > 0 ? include : keys;
  const ignored = included.filter((key) => {
    return !ignore.some((shouldIgnoreKey) => key === shouldIgnoreKey);
  });

  const columnHelper = createColumnHelper();
  // @ts-expect-error find type for unknown
  const columns: ColumnDef<TData>[] = [
    ...ignored.map((column, index) => {
      return columnHelper.accessor(column, {
        cell: (props) => {
          // @ts-expect-error find type for unknown
          const value = props.row.original[column];
          if (typeof value === "object") {
            return (
              <Grid overflow={"auto"}>
                <RecordDisplay object={value} {...{ translate }} />
              </Grid>
            );
          }
          return <TextCell>{value}</TextCell>;
        },
        header: (columnHeader) => {
          const displayName =
            columnHeader.column.columnDef.meta?.displayName ??
            getColumn({ column });

          return <span>{displayName}</span>;
        },
        footer: (columnFooter) => {
          const displayName =
            columnFooter.column.columnDef.meta?.displayName ??
            getColumn({ column });

          return <span>{displayName}</span>;
        },
        size: width[index] ?? defaultWidth,
        meta: Object.keys(meta).length > 0 ? meta[column] : {},
      });
    }),
  ];
  return columns;
};
