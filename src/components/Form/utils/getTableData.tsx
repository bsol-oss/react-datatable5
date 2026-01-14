export interface GetTableDataConfig {
  limit?: number;
  offset?: number;
  where?: { id: string; value: string[] }[];
  searching?: string;
}

export interface GetTableResponse {
  data?: object[];
  count: number;
}

export const getTableData = async ({}: GetTableDataConfig) => {
  throw new Error(
    'getTableData requires customQueryFn to be provided. serverUrl has been removed.'
  );
};
