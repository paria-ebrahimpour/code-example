export const AUTHENTICATE_USER = `auth/login`;
export const ADD_CART = `carts/`;
export const REMOVE_CART = (cardId: number) => `carts/${cardId}/`;
export const USER_CARTS = (userId: string) => `carts/user/${userId}/`;
