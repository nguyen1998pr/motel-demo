import * as types from "../constants";

export const userRegisterRequest = (data) => {
  return {
    type: types.USER_REGISTER_REQUEST,
    payload: { data },
  };
};

export const userRegisterSuccess = (data) => {
  return {
    type: types.USER_REGISTER_SUCCESS,
    payload: { data },
  };
};

export const userRegisterFail = (data) => {
  return {
    type: types.USER_REGISTER_FAIL,
    payload: { data },
  };
};
