import { ColumnDef, RowData } from '@tanstack/react-table';
import { JSONSchema7 } from 'json-schema';
export interface GetColumnsConfigs<K extends RowData> {
    schema: JSONSchema7;
    include?: K[];
    ignore?: K[];
    width?: number[];
    meta?: {
        [key in K as string]?: object;
    };
    defaultWidth?: number;
}
export declare const widthSanityCheck: <K extends unknown>(widthList: number[], ignoreList: K[], properties: { [key in K as string]?: object | undefined; }) => void;
export declare const getColumns: <TData extends unknown>({ schema, include, ignore, width, meta, defaultWidth, }: GetColumnsConfigs<TData>) => ColumnDef<TData>[];
