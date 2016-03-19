// import 'babel-polyfill';
// import { browserHistory } from 'react-router';
// import React from 'react';
// import { render } from 'react-dom';
// import { RelayRouter } from 'react-router-relay';
// import { Router } from 'react-router';
// import routes from './routes';

// render(
//   <RelayRouter history={browserHistory} routes={routes} />,
//   document.getElementById('root')
// )

import App from './App';
import Lang from './components/Lang/Lang';
import AppHomeRoute from './routes/AppHomeRoute';
import {createStore, combineReducers} from 'redux';
import {Provider} from './redux-compat';
import * as store from './reducers/language';
import * as React from 'react';
import * as Relay from 'react-relay';
import * as ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import routes from './routes';

const redux = createStore(combineReducers(store));

//<RelayRouter history={browserHistory} routes={routes} />

ReactDOM.render(
  <Provider store={redux}>
  	  <Relay.RootContainer Component={App} route={new AppHomeRoute()} />
  </Provider>,
  document.getElementById('root')
);

