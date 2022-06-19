import { sendRequest } from "../../core/_request";
import {
  ADD_CART,
  AUTHENTICATE_USER,
  REMOVE_CART,
  USER_CARTS,
} from "./_endpionts";
import {
  AddCartsType,
  UserAuthenticateBodyType,
  UserAuthenticatePayloadType,
  UserAuthenticateResponseType,
  UserAuthenticateResultType,
  UserCartsType,
} from "./_types";

export const authenticateUser = (payload: UserAuthenticatePayloadType) => {
  return sendRequest<
    UserAuthenticateResultType,
    UserAuthenticateResponseType,
    UserAuthenticateBodyType
  >({
    url: AUTHENTICATE_USER,
    method: "post",
    body: {
      username: payload.username,
      password: payload.password,
    },
  });
};

export const getUserCarts = (userId: string) => {
  return sendRequest<UserCartsType>({
    url: USER_CARTS(userId),
    method: "get",
  });
};

export const removeUserCart = (cartId: number) => {
  return sendRequest<UserCartsType>({
    url: REMOVE_CART(cartId),
    method: "delete",
  });
};

export const addToFavorites = (payload: AddCartsType) => {
  return sendRequest<AddCartsType>({
    url: ADD_CART,
    method: "post",
    body: {
      userId: payload.userId,
      date: payload.date,
      products: payload.products,
    },
  });
};
