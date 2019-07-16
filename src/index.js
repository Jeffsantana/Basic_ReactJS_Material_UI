import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom';
import Main from './Main';
import store from './store';



ReactDOM.render(
        <Provider store={store} >
            <Main />
        </Provider>
    , document.getElementById('root'));

