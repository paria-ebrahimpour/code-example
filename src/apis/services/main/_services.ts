import { sendRequest } from "../../core/_request";
import { GET_PRODUCTS } from "./_endpionts";
import { ProductsType } from "./_types";

export const getProducts = () => {
  return sendRequest<ProductsType>({
    url: GET_PRODUCTS,
    method: "get",
  });
};
