import axios from "axios";
import { useState, useEffect } from "react";

export interface useDataFromUrlReturn<T> {
  data: T;
  loading: boolean;
  hasError: boolean;
  refreshData: () => void;
}

export interface useDataFromUrlProps<T> {
  url: string;
  params?: object;
  defaultData: T;
}

export const useDataFromUrl = <T,>({
  url,
  params = {},
  defaultData,
}: useDataFromUrlProps<T>): useDataFromUrlReturn<T> => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [data, setData] = useState<T>(defaultData);
  const refreshData = async () => {
    await getData();
  };

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<T>(url, { params: params });
      console.log("get DataFromUrl success", data);
      setLoading(false);
      setData(data);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getData().catch((e) => {
      console.error(e);
    });
  }, []);

  return { data, loading, hasError, refreshData };
};

