import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';	

import { addComments } from '../actions';

import * as API from '../utils/API';

import PostHeader from './PostHeader';
import Comments from './Comments';
import Page404 from './Page404';

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
			this.setState({ postData: json.id ? json : undefined });
		});

		// gets the comments of the post
		API.getCommentsByPost(id)
		.then((json) => { this.props.pushComments(json) });

	}


	render(){

		const { postData } = this.state;

		console.log('postData', postData)

		return (
			<div className="post-detail">
				{ postData ? 
					<article>
						<PostHeader data={postData} />
				  		<section className="post-body">
				  			{ postData.body }
				  		</section>
				  		<Comments postId={ postData.id } />
				  	</article>
				  :
				  	<Page404 />
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);