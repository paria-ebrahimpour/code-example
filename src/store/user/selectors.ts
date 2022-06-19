import { RootState } from "../reducers";

export const userTokenSelector = (state: RootState) => state.user.tokenData;
export const userCartsSelector = (state: RootState) => state.user.userCarts;
export const userFavoritesSelector = (state: RootState) =>
  state.user.favoritedProducts;
