import produce from "immer";
import * as types from "../constants";
import { union } from "lodash";

export const initialState = {
  realEstate: {
    isRequesting: false,
    motels: {},
    motelIds: [],
    total: 0,
    currentPage,
  },
  user: {
    isRequesting: false,
    info: {},
    jwt: "",
  },
};

const motelRuducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case types.USER_REGISTER_REQUEST:
        draft.user = {
          ...state.user,
          isRequesting: true,
        };
        break;
      case types.USER_REGISTER_SUCCESS:
        draft.user = {};
        break;
      case types.USER_REGISTER_FAIL:
        break;
    }
  });

export default motelRuducer;
