import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPosts, editPost } from '../actions';

import * as API from '../utils/API';

import { guid } from '../utils/';

/**
 * View of submitting a new post or editing an existing one
 */
class NewPost extends Component {

	constructor(props){
		super(props);

		// binded functions to form event handling
		this.publishPost = this.publishPost.bind(this);
	}

	/**
	 * When the component mounts, get the post from the API and sort them
	 */
	componentDidMount(){
		API.getPosts()
		.then((json) => this.props.pushPosts(json));
	}

	publishPost(e){
		e.preventDefault();
	}

	// Used for when the router changes to the same route
	// but with different parameter
	componentDidUpdate(){
		this.render();
		document.getElementById('form-new-post').reset();
	}

	render(){

		const { categories, post } = this.props;

		return (
			<main>
				<h1>
					Publish new post
				</h1>

				<form id="form-new-post" name="form-new-post" onSubmit={ this.publishPost }>

					<input type="hidden" name="id" id="id" defaultValue={ post ? post.id : ''} />

					<label htmlFor="category">
						Category <small>(must choose one):</small>
						<select id="category" name="category" defaultValue={ post ? post.category : '' }>
							{ categories.map((category) => 
								<option key={ category.path } value={ category.path }>{ category.name }</option>
							)}
						</select>
					</label>

					<label htmlFor="title">
						Title
						<input type="text" id="title" name="title" defaultValue={ post ? post.title : '' } />
					</label>

					<label htmlFor="body">
						<textarea id="body" name="body" defaultValue={ post ? post.body : '' } />
					</label>

					<button type="submit">Send</button>

				</form>

			</main>
		)

	}

}


function mapStateToProps({categories, posts}, {match}){
	const id = match.params.id;
	return {
		categories,
		post: id ? posts.find((post) => post.id === id) : null,
	}
}


function mapDispatchToProps(dispatch){
	return {
		pushPosts: (data) => dispatch(addPosts(data)),
		updatePost: (data) => dispatch(editPost(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)