import React from 'react';
import Relay from 'react-relay';
import { connect } from '../../redux-compat';

@connect(state => ({
  language: state.language
}))
class Page extends React.Component {

	setLangVariable() {
		this.props.relay.setVariables({
			lang: this.props.language
		})
	}

	render() {
		const posts = this.props.wp_query.posts;
		this.unsubscribe = this.props.store.subscribe(::this.setLangVariable);

		this.setLangVariable();
		
		return(
			<div>
				{posts.map(post => {
					return (
						<div>{post.title}</div>
					)
				})}
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