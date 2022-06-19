import {
  FavoritedProduct,
  UserCartsType,
} from "../../apis/services/user/_types";

export interface UserState {
  tokenData: string | null;
  userCarts: UserCartsType | null;
  favoritedProducts: Array<FavoritedProduct | null>;
}
