import React from 'react';
import Relay from 'react-relay';
import { connect } from '../../redux-compat';

import { DropdownButton, MenuItem } from 'react-bootstrap';

import CSSModules from 'react-css-modules';
import styles from './menu.scss';

@connect(state => ({
    language: state.language
}))
@CSSModules(styles, {allowMultiple: true})
class Menu extends React.Component {

    setLangVariable() {
        this.props.relay.setVariables({
            lang: this.props.language
        })
    }

    changeLang() {

    }

	render(){
        const menu = this.props.wp_query.menu;
        this.unsubscribe = this.props.store.subscribe(::this.setLangVariable);
        this.setLangVariable();

		return (
           <div>
               <ul styleName="menu">
                   {menu.map(menuItem => {
                       return(
                           <li><a className="scroll">{menuItem.title}</a></li>
                       )
                   })}
               </ul>
               <DropdownButton bsStyle="default" noCaret title={[<span></span>]} styleName="dropdown">
                   {menu.map(menuItem => {
                       return (
                           <MenuItem key={menuItem.id} onClick={() => this.changeLang()} styleName="dropdown-menu">
                               {menuItem.title}
                           </MenuItem>
                       )
                   })}
               </DropdownButton>
           </div>
		)
	}
}

export default Relay.createContainer(Menu, {

    initialVariables: {
        lang: ''
    },

    fragments: {
        wp_query: () => Relay.QL`
            fragment on WPQuery {
                menu(name: $lang) {
                    id
                    title
                }
            }
        `
    }
})