import { ColumnDef, RowData } from "@tanstack/react-table";
import { JSONSchema7 } from "json-schema";
import { UseTranslationResponse } from "react-i18next";
export interface GetColumnsConfigs<K extends RowData> {
    schema: JSONSchema7;
    ignore?: K[];
    width?: number[];
    meta?: {
        [key in K as string]?: object;
    };
    defaultWidth?: number;
    translate?: UseTranslationResponse<any, any>;
}
export declare const widthSanityCheck: <K extends unknown>(widthList: number[], ignoreList: K[], properties: { [key in K as string]?: object | undefined; }) => void;
export declare const getColumns: <TData extends unknown>({ schema, ignore, width, meta, defaultWidth, translate, }: GetColumnsConfigs<TData>) => ColumnDef<TData>[];
