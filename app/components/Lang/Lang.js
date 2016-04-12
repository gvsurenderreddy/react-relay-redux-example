import React from 'react';
import Relay from 'react-relay';
import { connect } from '../../redux-compat';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import LangIcon from '../LangIcon/LangIcon';

import CSSModules from 'react-css-modules';
import styles from './lang.scss';

@connect(state => ({
  language: state.language
}))
@CSSModules(styles, {allowMultiple: true})
class Lang extends React.Component {

	changeLang(lang) {
		this.props.store.dispatch({type: 'SET_LANGUAGE', lang: lang})
	}

	render(){
		const { wp_query } = this.props;
		const languages = wp_query.terms[0].children;

		return (
			<DropdownButton bsStyle="default" title={[<LangIcon language={this.props.language} />]} id="Lang" styleName="dropdown">
				{languages.map(lang => {
					return (
						<MenuItem key={lang.term_id} onClick={() => this.changeLang(lang.slug)} styleName="dropdown-menu">
							<LangIcon language={lang.slug} />
						</MenuItem>
					)
				})}
			</DropdownButton>
		)
	}
}

export default Relay.createContainer(Lang, {

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
	}
})