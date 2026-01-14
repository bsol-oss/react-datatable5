import axios, { AxiosRequestConfig } from 'axios';

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

export const getTableData = async ({
  searching = '',
  where = [],
  limit = 10,
  offset = 0,
}: GetTableDataConfig) => {
  throw new Error(
    'getTableData requires customQueryFn to be provided. serverUrl has been removed.'
  );
};
