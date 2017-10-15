import React, { Component } from 'react';
import { connect } from 'react-redux';	

import { fetchPostDetail } from '../actions/posts.js';
import { fetchComments } from '../actions/comments.js';

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
		this.props.fetchPostDetail(id);
	}

	render(){

		const { postData } = this.props;

		return (
			<div className="post-detail">
				{ postData 
					? <article>
						<PostHeader data={postData} returnPage={ postData.category } />
				  		<section className="post-body">
				  			{ postData.body }
				  		</section>
				  		<Comments postId={ postData.id } />
				  	</article>
				  	: <Page404 />
				}
			</div>
		);

	}

}


/**
 * mapStateToProps
 */
function mapStateToProps({posts, comments}, { match }){
	const id = match.params.id;
	return {
		id,
		postData: posts.filter((post) => post.id === id)[0],
		comments: comments.filter((comment) => comment.parentId === id ),
	}
}

/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
  return {
    fetchPostDetail: (id) => fetchPostDetail(id, dispatch),
    fetchComments: (id) => dispatch(fetchComments(id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);