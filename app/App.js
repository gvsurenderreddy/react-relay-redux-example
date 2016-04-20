import React from 'react';
import Relay from 'react-relay';

//import * from './styles.css';
require('./styles.scss');
import Header from './components/Header/Header';
import Page from './components/Page/Page';

class App extends React.Component {

  render() {
    const { wp_query } = this.props;

    return (
      <div className="application">
        <Header wp_query={wp_query} />
        <Page wp_query={wp_query} />
      </div>
    )
  }
}

export default Relay.createContainer(App, {

  fragments: {
    wp_query: () => Relay.QL`
      fragment on WPQuery {
        ${Header.getFragment('wp_query')}
        ${Page.getFragment('wp_query')}
      }
    `
  },
});
