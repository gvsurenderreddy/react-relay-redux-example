import * as Relay from 'react-relay';
import Header from '../components/Header/Header';
import Page from '../components/Page/Page';

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
