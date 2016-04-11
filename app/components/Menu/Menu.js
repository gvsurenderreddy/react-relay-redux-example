import React from 'react';

import CSSModules from 'react-css-modules';
import styles from './menu.scss';

@CSSModules(styles, {allowMultiple: true})
export default class Menu extends React.Component {
	render(){
		return (
          <div>
            <ul styleName="menu">
              <li><a className="scroll">Feaures</a></li>
              <li><a className="scroll">Products</a></li>
            </ul>
            <div styleName="btn-group">
              <button styleName="btn btn-default dropdown-toggle" id="btn-language" type="button"
                      data-toggle="dropdown">
                <span styleName="menu-drawer"></span>
              </button>
              <ul styleName="dropdown-menu">

              </ul>
            </div>
          </div>
		)
	}
}