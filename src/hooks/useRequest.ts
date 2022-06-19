import { useEffect, useState } from "react";
import { IResult } from "../apis/types";
import useIsMounted from "./useIsMounted";

export interface UseRequestProps<T, E> {
  defaultData?: T | null;
  fireOnLoad?: boolean;
  initialArgs?: E;
  successMessageKey?: string;
  successCallback?: (data: T) => void;
  api: (args: E) => Promise<IResult<T>>;
}

export interface UseRequestOptions {
  withLoading: boolean;
}

export interface UseRequestState<T> {
  data: T | null;
  loading: boolean;
  hasError: boolean;
}

export interface UseRequestReturnType<T, E> extends UseRequestState<T> {
  setData: (payload: T | null) => void;
  request: (args?: E, options?: Partial<UseRequestOptions>) => Promise<T>;
}

function useRequest<T, E = unknown>({
  initialArgs,
  fireOnLoad = false,
  successMessageKey,
  successCallback,
  api,
}: UseRequestProps<T, E>): UseRequestReturnType<T, E> {
  const isMounted = useIsMounted();
  const [state, setState] = useState<UseRequestState<T>>({
    data: null,
    loading: fireOnLoad || false,
    hasError: false,
  });

  const setData = (payload: T | null): void => {
    setState((prevState) => ({
      ...prevState,
      data: payload,
    }));
  };

  const updateState = (payload: Partial<UseRequestState<T>>): void => {
    if (isMounted()) {
      setState((prevState) => ({
        ...prevState,
        ...payload,
      }));
    }
  };

  const request = async (
    args?: E,
    options: Partial<UseRequestOptions> = { withLoading: true }
  ): Promise<T> => {
    try {
      if (options.withLoading) {
        updateState({ loading: true, hasError: false });
      }
      const result = await api(args || ({} as E));
      updateState({
        data: result.data,
        loading: false,
        hasError: !result.success,
      });

      if (successMessageKey && result.success) {
        console.log({ messageKey: successMessageKey, variant: "success" });
      }

      if (result.data) {
        successCallback?.(result.data);
        return result.data;
      }

      return await Promise.reject(result?.message);
    } catch (err) {
      updateState({
        data: null,
        loading: false,
        hasError: true,
      });
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    if (fireOnLoad) {
      request(initialArgs);
    }
  }, []);

  return { ...state, setData, request };
}

export default useRequest;
