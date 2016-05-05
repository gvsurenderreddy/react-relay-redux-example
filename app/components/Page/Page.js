import React from 'react';
import Relay from 'react-relay';
import {connect} from '../../redux-compat';

import {animateScroll} from 'react-scroll';

import CSSModules from 'react-css-modules';
import styles from './page.scss';

@connect(state => ({
  language: state.language
}))
@CSSModules(styles, {allowMultiple: true})
class Page extends React.Component {

  setLangVariable() {
    this.props.relay.setVariables({
      lang: this.props.language
    })
  }

  scrollToTop() {
    animateScroll.scrollToTop();
  }

  render() {
    const posts = this.props.wp_query.posts;
    this.unsubscribe = this.props.store.subscribe(::this.setLangVariable);

    this.setLangVariable();

    return (
      <div>
        {posts.map(post => {
          return (
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          )
        })}
        <a styleName="toTop" onClick={this.scrollToTop}></a>
      </div>
    )
  }
}

export default Relay.createContainer(Page, {

  initialVariables: {
    lang: ''
  },

  fragments: {
    wp_query: () => Relay.QL`
			fragment on WPQuery {
				posts (category_name: $lang) {
					title
					content
				}
			}
		`
  }
})