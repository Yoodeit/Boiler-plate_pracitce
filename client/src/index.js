import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
//import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
//import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import rootReducer from './_reducers';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
//원래는 createStore만 하면 되는데 그러면 객체밖에 못받으니까 middleware와 함께 만들어줬다.
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider
      store={createStoreWithMiddleware(rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__())


      }>
    <App />
  </Provider>
  
  , document.getElementById('root'));
  
  
reportWebVitals();
//serviceWorker.unregister();
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
