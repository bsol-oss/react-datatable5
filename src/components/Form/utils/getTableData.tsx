import axios, { AxiosRequestConfig } from "axios";

export interface GetTableDataConfig {
  serverUrl: string;
  in_table: string;
  limit?: number;
  where?: { id: string; value: string[] }[];
  searching?: string;
}

export interface GetTableResponse {
  data?: object[];
  count: number;
}

export const getTableData = async ({
  serverUrl,
  in_table,
  searching = "",
  where = [],
  limit = 10,
}: GetTableDataConfig) => {
  if (serverUrl === undefined || serverUrl.length == 0) {
    throw new Error("The serverUrl is missing");
  }
  if (in_table === undefined || in_table.length == 0) {
    throw new Error("The in_table is missing");
  }

  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${serverUrl}/api/g/${in_table}`,
    headers: {
      Apikey: "YOUR_SECRET_TOKEN",
      "Content-Type": "application/json",
    },
    params: {
      searching,
      where,
      limit,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
