import React from 'react';
import { connect } from '../../redux-compat';

import { DropdownButton, MenuItem } from 'react-bootstrap';

import CSSModules from 'react-css-modules';
import styles from './lang.scss';

@connect(state => ({
  language: state.language
}))
@CSSModules(styles, {allowMultiple: true})
export default class Lang extends React.Component {

	changeLang(lang) {
		this.props.store.dispatch({type: 'SET_LANGUAGE', lang: lang})
	}

	render(){
		const { wp_query } = this.props;
		const languages = wp_query.terms[0].children;

		return (
			<div>
				<span className="flag-icon flag-icon-gb" styleName="lang-flag"></span>
				<DropdownButton bsStyle="default" title={["This ", <strong>IS</strong>, " working!"]} id="Lang" styleName="lang-dropdown-button">
					{languages.map(lang => {
						return (
							<MenuItem key={lang.term_id} onClick={() => this.changeLang(lang.slug)}>{lang.slug}</MenuItem>
						)
					})}
				</DropdownButton>
			</div>
		)
	}
}