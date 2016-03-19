import React from 'react';
import Relay from 'react-relay';
import { IndexRoute, Route } from 'react-router';

import App from './App.js';
import Page from './components/Page/Page';

const AppQueries = {
  wp_query: () => Relay.QL`
    query {
      wp_query
    }
  `,
};

let routes = (
  <Route
    path="/" component={App}
    queries={AppQueries}
  >
    <Route
      path=":lang" component={Page}
      queries={AppQueries}
    >
    </Route>
  </Route>
);

export default routes;
