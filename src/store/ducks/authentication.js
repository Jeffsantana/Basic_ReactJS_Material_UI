import { constants } from "../../config";

export const Types = {
  REQUEST_TOKEN_VALIDATE: "autentication/REQUEST_TOKEN_VALIDATE",
  TOKEN_VALIDATED: "autentication/TOKEN_VALIDATED",
  USER_FETCHED: "autentication/USER_FETCHED",
  LOGIN_REQUEST: "autentication/LOGIN_REQUEST",
  LOGIN_ERROR: "autentication/LOGIN_ERROR",
  SET_USER: "autentication/SET_USER"
};

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(constants.userKey)),
  token: JSON.parse(localStorage.getItem(constants.tokenKey)),
  validToken: false,
  loading: false,
  message: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SET_USER: {
      localStorage.setItem(
        constants.userKey,
        JSON.stringify({ ...state.user, user: action.payload })
      );
      return { ...state, user: { ...state.user, user: action.payload } };
    }
    case Types.TOKEN_VALIDATED: {
      if (action.payload) {
        return { ...state, validToken: true };
      } else {
        localStorage.removeItem(constants.userKey);
        localStorage.removeItem(constants.tokenKey);
        return { ...state, validToken: false, user: null };
      }
    }
    case Types.USER_FETCHED: {
      localStorage.setItem(constants.userKey, JSON.stringify(action.payload));
      localStorage.setItem(
        constants.tokenKey,
        JSON.stringify(action.payload.token)
      );
      return {
        ...state,
        user: action.payload,
        token: action.payload.user.token,
        validToken: true,
        loading: false
      };
    }
    case Types.LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        message: ""
      };
    }
    case Types.LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    }
    default:
      return state;
  }
};

export const Creators = {
  loginResquest: data => ({ type: Types.LOGIN_REQUEST, payload: { ...data } }),
  loginError: data => ({ type: Types.LOGIN_ERROR, payload: { ...data } }),
  loginSuccess: data => ({ type: Types.USER_FETCHED, payload: { ...data } }),
  logout: () => ({ type: Types.TOKEN_VALIDATED, payload: false }),
  validateToken: data => ({
    type: Types.REQUEST_TOKEN_VALIDATE,
    payload: data
  }),
  validated: data => ({ type: Types.TOKEN_VALIDATED, payload: data }),
  setUser: data => ({ type: Types.SET_USER, payload: data })
};
