// * UserAuthenticate
export type UserAuthenticatePayloadType = {
  username: string;
  password: string;
};

export type UserAuthenticateBodyType = {
  username: string;
  password: string;
};

export type UserAuthenticateResponseType = {
  token: string;
};

export type UserAuthenticateResultType = {
  token: string;
};
// * UserAuthenticate

// * UserCarts
export type FavoritedProduct = {
  productId: number;
  quantity: number;
};

export type FavoritedProducts = FavoritedProduct[];

export type UserCartsType = {
  id: number;
  userId: number;
  date: Date;
  products: FavoritedProducts | null;
};
// * UserCarts

// * addCarts
export type AddCartsType = {
  userId: number;
  date: string;
  products: Array<FavoritedProduct | null>;
};
// * addCarts
