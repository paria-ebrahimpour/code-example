/**
 * @template T => Request body
 * @template R => Request Response
 * @template D => Transformed Data
 */
export interface IRequest<T = any, R = any, D = any> {
  method?: "get" | "post" | "put" | "delete";
  body?: T;
  headers?: Record<string, any>;
  url: string;
}

export interface IResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface IResult<T = any> {
  success: boolean;
  errorType: "server" | "client" | null;
  data: T | null;
  message?: string;
}

export type RequestFunc<T> = Promise<IResult<T>>;
