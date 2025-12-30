export interface GetTableDataConfig {
    in_table: string;
    limit?: number;
    offset?: number;
    where?: {
        id: string;
        value: string[];
    }[];
    searching?: string;
}
export interface GetTableResponse {
    data?: object[];
    count: number;
}
export declare const getTableData: ({ in_table, searching, where, limit, offset, }: GetTableDataConfig) => Promise<never>;
