import { all, takeLatest } from "redux-saga/effects";
import { Types as TypesAuth } from "../ducks/authentication";
import { requestLogin, validateToken } from "./autentication";

export default function* rootSaga() {
  yield all([
    takeLatest(TypesAuth.LOGIN_REQUEST, requestLogin),
    takeLatest(TypesAuth.REQUEST_TOKEN_VALIDATE, validateToken)
  ]);
}
