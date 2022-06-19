import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, SUCCESS_STATUS_CODE } from "../constants";
import { IRequest, IResponse, IResult } from "../types";
import { axiosAgent } from "./_agent";

/**
 * @template T => Final Data (Result)
 * @template R => Request Response (Response)
 * @template B => Request Body (Body)
 */
export const sendRequest = async <T = any, R = any, B = Record<string, any>>({
  method = "get",
  body,
  headers = {},
  url,
  ...props
}: IRequest<B, R, T>): Promise<IResult<T>> => {
  let response: AxiosResponse<IResponse<R>>;
  try {
    const finalUrl = [BASE_URL, url].join("/");

    const config: AxiosRequestConfig = {
      headers,
    };
    switch (method) {
      case "post":
      case "put":
        response = await axiosAgent[method](finalUrl, body, config);
        break;
      case "delete":
        response = await axiosAgent.delete(finalUrl, {
          data: body,
          ...config,
        });
        break;
      case "get":
      default:
        response = await axiosAgent.get(finalUrl, config);
        break;
    }
    const isSuccess = !!(
      SUCCESS_STATUS_CODE.includes(response.status) || response.data.success
    );
    return {
      success: isSuccess,
      errorType: isSuccess ? null : "server",
      data: response.data as unknown as T,
      message: response.data.message,
    };
  } catch (err: any) {
    const error = err as AxiosError<IResponse<R>>;
    if (error?.response?.data.message) {
      console.log(error.response?.data.message);
    }
    console.log(JSON.stringify(error?.config));
    return {
      success: false,
      errorType: "client",
      data: null,
    };
  }
};
