import React from 'react';
import Relay from 'react-relay';
import { connect } from '../../redux-compat';

@connect(state => ({
  language: state.language
}))
class Page extends React.Component {

	componentDidMount() {
		console.log(this.props);
	}

	fetchNewLang() {
		const { language } = this.props.store.getState();

		this.props.relay.setVariables({
			lang: language
		})
	}

	render() {
		const { wp_query } = this.props;
		const posts = wp_query.posts;
		this.unsubscribe = this.props.store.subscribe(::this.fetchNewLang);

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
		lang: 'gb'
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