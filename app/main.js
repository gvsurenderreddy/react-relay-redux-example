require("babel-polyfill");

import App from './App';
import AppHomeRoute from './routes/AppHomeRoute';
import {createStore, combineReducers} from 'redux';
import {Provider} from './redux-compat';
import * as store from './reducers/language';
import * as React from 'react';
import * as Relay from 'react-relay';
import * as ReactDOM from 'react-dom';

require('imports?this=>window!../node_modules/wow.js/dist/wow.js');
require('style!css!../node_modules/wow.js/css/libs/animate.css');

const redux = createStore(combineReducers(store));

ReactDOM.render(
  <Provider store={redux}>
  	  <Relay.RootContainer Component={App} route={new AppHomeRoute()} />
  </Provider>,
  document.getElementById('root')
);

