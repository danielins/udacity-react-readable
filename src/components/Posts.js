import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPosts } from '../actions';

import * as API from '../utils/API'

import PostHeader from './PostHeader';

/**
 * Page listing all posts or posts for a specfic category
 */
class Posts extends Component {

	componentDidMount(){

		API.getPosts()
		.then((json) => this.props.pushPosts(json));

	}

	// Used for when the router changes to the same route
	// but with different parameter
	componentDidUpdate(){
		this.render();
	}

	render(){

		const {posts} = this.props;

		return (
			<main>
				<h1>
					{ this.props.category }
				</h1>
				{
					posts.length ? posts.map((post) => <PostHeader data={post} key={post.id} />) : 'No posts were found. :('
				}
			</main>
		);

	}

}

/**
 * mapStateToProps
 */
function mapStateToProps({posts}, { match }){
	const category = match.params.id || 'home';
	return {
		category,
		posts: category === 'home' ? posts: posts.filter((post) => post.category === category),
	}
}

/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
  return {
    pushPosts: (data) => dispatch(addPosts(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);