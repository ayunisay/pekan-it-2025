import _ from "lodash";
import axiosInstanceDefault from "../providers/axiosInstance";
import type { AxiosInstance, AxiosResponse } from "axios";
import { useEffect, useState, useRef } from "react";
import type { ApiError } from "../types/apiType";
import { isRequestSuccessful, sanitizeData } from "../helpers/apiHelpers";

type FetchOptions<T> = {
  url: string;
  initialData?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
  initialCall?: boolean;
  callbackFun?: (data: T) => void;
  axiosInstance?: AxiosInstance;
};

export function useFetchData<T>({
  url,
  initialData,
  params,
  initialCall,
  callbackFun,
  axiosInstance,
}: FetchOptions<T>) {
  if (initialCall === undefined) {
    initialCall = true;
  }
  let axios = axiosInstanceDefault;
  if (axiosInstance) {
    axios = axiosInstance;
  }
  const [initialUrl, setInitialUrl] = useState<string>(url);
  const [allowApiCall, setAllowApiCall] = useState<boolean>(initialCall);
  const [loading, setLoading] = useState<boolean>(initialCall);
  const [apiData, setData] = useState<T>(initialData ? initialData : ([] as T));
  const [queryParams, updateQueryParams] = useState<object>(params);
  const resStateRef = useRef<boolean>(false);
  const didCancelRef = useRef<boolean>(false);

  const updateInitialUrl = (
    value: string,
    withLoading: boolean = false,
    queryParams: object
  ) => {
    if (withLoading) {
      setLoading(true);
    }
    setInitialUrl(value);
    updateQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      ...queryParams,
    }));
    setAllowApiCall(true);
  };

  const reCallAPI = () => {
    setQueryParams(queryParams);
  };

  const setQueryParams = (queryParams: object) => {
    setLoading(true);
    updateQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      ...queryParams,
    }));
    setAllowApiCall(true);
  };

  useEffect(() => {
    didCancelRef.current = false;
    const fetchData = () => {
      resStateRef.current = true;
      let params = {};
      if (!_.isEmpty(queryParams)) {
        params = {
          ...trimObjectValues(queryParams),
        };
      }
      axios
        .get(initialUrl, { params: sanitizeData(params) })
        .then((data: AxiosResponse) => {
          resStateRef.current = false;
          if (!didCancelRef.current) {
            // setAllowApiCall(false)
            if (isRequestSuccessful(data.status)) {
              setLoading(false);
              setData(data.data);
              if (callbackFun) callbackFun(data.data);
            } else {
              setLoading(false);

              setData(initialData ? initialData : ({} as T));
              if (callbackFun) callbackFun(data.data);
            }
          }
        })
        .catch((error: ApiError) => {
          console.error(error);
          if (error.response?.data?.message) {
            if (callbackFun) callbackFun(error.response.data as T);
          } else {
            if (callbackFun) callbackFun(error as T);
          }
          setLoading(false);
        });
    };

    if (allowApiCall && !resStateRef.current) fetchData();
    return () => {
      didCancelRef.current = true;
    };
  }, [initialUrl, queryParams, allowApiCall]);

  return [
    {
      loading,
      apiData,
      initialUrl,
      queryParams,
    },
    {
      setData,
      setLoading,
      updateInitialUrl,
      setQueryParams,
      reCallAPI,
    },
  ] as const;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trimObjectValues = (obj: any) => {
  if (_.isEmpty(obj)) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    }
  });
  return obj;
};
