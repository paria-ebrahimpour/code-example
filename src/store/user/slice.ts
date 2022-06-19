import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";
import {
  UserCartsType,
  FavoritedProduct,
} from "../../apis/services/user/_types";
import TokenServices from "../../services/token.service";

const initialState: UserState = {
  tokenData: TokenServices.getToken(),
  userCarts: null,
  favoritedProducts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      const tempState = state;
      tempState.tokenData = action.payload;
      TokenServices.setToken(action.payload);
    },
    removeUserToken: (state) => {
      const tempState = state;
      tempState.tokenData = null;
      tempState.userCarts = null;
      TokenServices.removeToken();
    },
    setUserCarts: (state, action: PayloadAction<UserCartsType>) => {
      const tempState = state;
      tempState.userCarts = action.payload;
    },
    setFavoritedProducts: (state, action: PayloadAction<FavoritedProduct>) => {
      const tempState = state;

      const existingCartItemIndex = tempState.favoritedProducts.findIndex(
        (item) => item?.productId === action.payload.productId
      );

      const existingCartItem =
        tempState.favoritedProducts[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.quantity,
        };
        updatedItems = [...tempState.favoritedProducts];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = tempState.favoritedProducts.concat(action.payload);
      }
      tempState.favoritedProducts = updatedItems;
    },
  },
});

export const {
  removeUserToken,
  setUserToken,
  setUserCarts,
  setFavoritedProducts,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
