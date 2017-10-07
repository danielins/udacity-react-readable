import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';	

import { addComments, deletePost, deleteCommentFromParent } from '../actions';

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

		// gets the data of the post
		API.getPostDetail(id)
		.then((json) => {
			this.setState({ postData: json });
		});

		// gets the comments of the post
		API.getCommentsByPost(id)
		.then((json) => { this.props.pushComments(json) });

	}

	deletePost(id){

		this.props.erasePost(id);
		this.props.eraseComments(id);

		API.deletePost(id);

		location.href = "/";

	}

	render(){

		const { postData } = this.state;

		return (
			<div className="post-detail">
				{ postData ? 
					<article>
						<PostHeader data={postData} />
				  		<section className="post-body">
				  			{ postData.body }
				  		</section>
						<Link className="bt bt-edit" to={`/edit/${ postData.id }`}>Edit Post</Link>
						<button className="bt bt-delete" type="button" onClick={ () => this.deletePost(postData.id) }>Delete Post</button>
				  		<Comments postId={ postData.id } />
				  	</article>
				  :
				  	'[404] Post not found'
				}
			</div>
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
    pushComments: (data) => dispatch(addComments(data)),
    erasePost: (data) => dispatch(deletePost(data)),
    eraseComments: (data) => dispatch(deleteCommentFromParent(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);