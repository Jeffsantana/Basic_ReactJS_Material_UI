import { call, put } from "redux-saga/effects";
import { Autentication } from "../../services";
import { Creators as CreatorsAuth } from "../ducks/authentication";
import { Creators as CreatorsSnackBar } from "../ducks/snackbar";

export function* requestLogin(action) {
  try {
    const result = yield call(Autentication.login, { ...action.payload });
    if (result.ok) {
      yield put(CreatorsAuth.loginSuccess(result.data));
    } else {
      yield put(CreatorsSnackBar.showError(result.message));
      yield put(CreatorsAuth.loginError({ message: result.message }));
    }
  } catch (error) {
    yield put(CreatorsSnackBar.showError(error.message));
    yield put(CreatorsAuth.loginError({ message: error.message }));
  }
}
export function* validateToken(action) {
  try {
    const result = yield call(Autentication.validateToken, {
      token: action.payload
    });
    if (result.ok) yield put(CreatorsAuth.validated(true));
    else {
      yield put(CreatorsAuth.validated(false));
    }
  } catch (error) {
    yield put(CreatorsAuth.validated(false));
  }
}
