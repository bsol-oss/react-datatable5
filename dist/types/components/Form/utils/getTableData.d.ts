export interface GetTableDataConfig {
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
export declare const getTableData: ({ searching, where, limit, offset, }: GetTableDataConfig) => Promise<never>;
