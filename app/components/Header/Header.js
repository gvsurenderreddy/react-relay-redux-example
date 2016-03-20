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
			<div styleName="banner">
		          <header styleName="header">
		            <div styleName="logo" data-wow-delay="0.5s">
		              <h3>yourdevelopers</h3>
		            </div>
		            <nav styleName="top-menu">
		              <Menu />
		              <Lang wp_query={wp_query} />
		            </nav>
		          </header>
		          <article styleName="banner-info" />
		     </div>
		)
	}
}

export default Relay.createContainer(Header, {

  fragments: {
    wp_query: () => Relay.QL`
      fragment on WPQuery {
        terms(slug: "languages") {
	      term_id
	      children {
	        term_id
	        slug
	      }
	    }
      }
    `
  },
});