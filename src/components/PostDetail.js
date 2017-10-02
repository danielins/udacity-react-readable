import React, { Component } from 'react';
import { connect } from 'react-redux';	

import { addComments } from '../actions';

import * as API from '../utils/API';

import PostHeader from './PostHeader';
import Comments from './Comments';

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
			this.setState({ postData: json });
		});

		API.getCommentsByPost(id)
		.then((json) => { this.props.pushComments(json) });

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
				  		<Comments postId={ postData.id } />
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
function mapStateToProps({comments}, { match }){
	const id = match.params.id;
	return {
		comments: comments.filter((comment) => comment.parentId === id ),
		id
	}
}

/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
  return {
    pushComments: (data) => dispatch(addComments(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);