import axios from "axios";
import { useState, useEffect } from "react";

export interface RefreshDataConfig {
  debounce?: boolean;
  delay?: number;
}
export interface UseDataFromUrlReturn<T> {
  data: T;
  loading: boolean;
  hasError: boolean;

  /**
   * Delays sending the request when the `refreshData` function is called multiple times within a short period.
   */
  refreshData: (config?: RefreshDataConfig) => void;
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
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const refreshData = async (
    config: RefreshDataConfig = {
      debounce: false,
      delay: 1000,
    }
  ) => {
    const { debounce, delay } = config;
    if (debounce) {
      await debouncedGetData(delay);
      return;
    }
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

  const debouncedGetData = async (delay = 1000) => {
    if (timer) {
      clearTimeout(timer); // Clear the previous timer
    }
    setTimer(
      setTimeout(async () => {
        await getData();
      }, delay)
    );
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
