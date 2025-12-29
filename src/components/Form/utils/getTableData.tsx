import axios, { AxiosRequestConfig } from 'axios';

export interface GetTableDataConfig {
  in_table: string;
  limit?: number;
  offset?: number;
  where?: { id: string; value: string[] }[];
  searching?: string;
}

export interface GetTableResponse {
  data?: object[];
  count: number;
}

export const getTableData = async ({
  in_table,
  searching = '',
  where = [],
  limit = 10,
  offset = 0,
}: GetTableDataConfig) => {
  if (in_table === undefined || in_table.length == 0) {
    throw new Error('The in_table is missing');
  }

  throw new Error(
    'getTableData requires customQueryFn to be provided in foreign_key. serverUrl has been removed.'
  );
};
