import React, { Component } from 'react';
import { connect } from 'react-redux';	

import { resetPosts, addComments } from '../actions';

import * as API from '../utils/API';

import PostHeader from './PostHeader';

/**
 * Page listing all posts or posts for a specfic category
 */
class PostDetail extends Component {

	state = {
		postData: null,
		comments: []
	}

	componentWillMount(){

		const {id} = this.props;

		API.getPostDetail(id)
		.then((json) => {
			this.props.clearPosts();
			this.setState({ postData: json });
		});

		API.getCommentsByPost(id)
		.then((json) => { console.log('comments', json); this.props.pushComments(json) });

	}

	render(){

		const { postData } = this.state;

		return (
			<main>
				{ postData ? 
					<article>
						<PostHeader data={postData} />
				  		<section className="postBody">
				  			{ postData.body }
				  		</section>
				  	</article>
				  :
				  	'404 Post not found'
				}
			</main>
		);

	}

}


/**
 * mapStateToProps
 */
function mapStateToProps({posts, comments}, { match }){
	const id = match.params.id;
	return {
		posts,
		comments,
		id
	}
}

/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
  return {
    clearPosts: (data) => dispatch(resetPosts(data)),
    pushComments: (data) => dispatch(addComments(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);