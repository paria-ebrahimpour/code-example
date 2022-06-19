import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi, UserAuthenticatePayloadType } from "../../apis/services/user";
import { RootState } from "../reducers";
import { removeUserToken, setUserCarts, setUserToken } from "./slice";

const USER_ACTION_NAMES = {
  INITIAL_USER: "initialUser",
  GET_USER_TOKEN: "getUserToken",
  GET_USER: "getUser",
  REMOVE_USER: "removeUser",
};

export const getUserTokenAction = createAsyncThunk<
  void,
  UserAuthenticatePayloadType
>(`user/${USER_ACTION_NAMES.GET_USER_TOKEN}`, async (payload, { dispatch }) => {
  const response = await UserApi.authenticateUser(payload);
  if (response.success && response.data) {
    dispatch(setUserToken(response.data.token));
  }
});

export const getUserCartsAction = createAsyncThunk<void, { userId: number }>(
  `user/${USER_ACTION_NAMES.GET_USER}`,
  async (payload, { dispatch, getState }) => {
    if ((getState() as RootState).user.userCarts?.userId === payload.userId)
      return;
    const response = await UserApi.getUserCarts(payload.userId.toString());
    if (response.success && response.data) {
      dispatch(setUserCarts(response.data));
    }
  }
);

export const initialUserAction = createAsyncThunk<
  void,
  UserAuthenticatePayloadType
>(`user/${USER_ACTION_NAMES.INITIAL_USER}`, async (payload, { dispatch }) => {
  await dispatch(getUserTokenAction(payload));
});

export const removeUserAction = createAsyncThunk<void>(
  `user/${USER_ACTION_NAMES.REMOVE_USER}`,
  async (payload, { dispatch }) => {
    dispatch(removeUserToken());
  }
);
