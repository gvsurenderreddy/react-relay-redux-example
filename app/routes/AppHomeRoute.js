import * as Relay from 'react-relay';

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    wp_query: () => Relay.QL`
      query {
        wp_query
      }
    `
  };
  static routeName = 'AppHomeRoute';
}
