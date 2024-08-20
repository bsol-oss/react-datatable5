import axios from "axios";
import { useState, useEffect } from "react";

export interface UseDataFromUrlReturn<T> {
  data: T;
  loading: boolean;
  hasError: boolean;
  refreshData: () => void;
}

export interface UseDataFromUrlProps<T> {
  url: string;
  params?: object;
  defaultData: T;
  disableFirstFetch?: boolean;
  onFetchSuccess?: (data: T) => void;
}

export const useDataFromUrl = <T,>({
  url,
  params = {},
  disableFirstFetch = false,
  onFetchSuccess = () => {},
  defaultData,
}: UseDataFromUrlProps<T>): UseDataFromUrlReturn<T> => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [data, setData] = useState<T>(defaultData);
  const refreshData = async () => {
    await getData();
  };

  const getData = async () => {
    try {
      setHasError(false);
      setLoading(true);
      const { data } = await axios.get<T>(url, { params: params });
      console.debug("get DataFromUrl success", data);
      onFetchSuccess(data);
      setLoading(false);
      setData(data);
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    if (disableFirstFetch) {
      return;
    }
    getData().catch((e) => {
      console.error(e);
    });
  }, [url]);

  return { data, loading, hasError, refreshData };
};
