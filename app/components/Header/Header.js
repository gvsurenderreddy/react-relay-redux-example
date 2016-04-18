import React from 'react';
import Relay from 'react-relay';
import { connect } from '../../redux-compat';

import Lang from '../Lang/Lang';
import Menu from '../Menu/Menu';
import CSSModules from 'react-css-modules';
import styles from './header.scss';

@connect(state => ({
  language: state.language
}))
@CSSModules(styles, {allowMultiple: true})
class Header extends React.Component {

	render() {
		const { wp_query } = this.props;

		return(
			  <header styleName="header" className="global-padding">
				<div styleName="logo" data-wow-delay="0.5s">
				  <h3>yourdevelopers</h3>
				</div>
				<nav styleName="top-menu">
				  <Menu wp_query={wp_query} />
				  <Lang wp_query={wp_query} />
				</nav>
			  </header>
		)
	}
}

export default Relay.createContainer(Header, {

  fragments: {
    wp_query: () => Relay.QL`
    	fragment on WPQuery {
    		${Lang.getFragment('wp_query')},
      		${Menu.getFragment('wp_query')}
    	}
    `
  },
});