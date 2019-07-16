import { createStore, compose, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from "redux-saga";
import thunk from 'redux-thunk';
import sagas from "./sagas";
import reducers from "./ducks";
import history from "../routes/history";

const middlewares = [
    routerMiddleware(history),
    thunk,
];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const store = createStore(connectRouter(history)(reducers), compose(applyMiddleware(...middlewares)));


sagaMiddleware.run(sagas);


export default store;