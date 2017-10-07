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
		const { id } = this.props;
		id ? this.editPost() : this.newPost();
	}

	editPost(){

		const { id, post } = this.props;

		let edits = {
			postId: id,
			title: document.getElementById('title').value,
			body: document.getElementById('body').value
		}

		this.props.updatePost(edits);

		API.editPost(edits).then( location.href = `/${ post.category }/${ id }` );

	}

	newPost(){

		let post = {
			id: guid(),
			timestamp: new Date()*1,
			voteScore: 1,
			category: document.getElementById('category').value,
			author: document.getElementById('author').value,
			title: document.getElementById('title').value,
			body: document.getElementById('body').value,
		}

		if ( !post.author || !post.title || !post.body ){
			alert('Author name, post title or post body cannot be empty!');
			return false;
		}

		this.props.pushPosts([post]);

		API.newPost(post).then( location.href = "/" );

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

				<form className="form" id="form-new-post" name="form-new-post" onSubmit={ this.publishPost }>

					<input type="hidden" name="id" id="id" defaultValue={ post ? post.id : ''} />

					<label htmlFor="title">
						Author
						<input type="text" id="author" name="author" defaultValue={ post ? post.author : '' } />
					</label>

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
						Post
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
		id
	}
}


function mapDispatchToProps(dispatch){
	return {
		pushPosts: (data) => dispatch(addPosts(data)),
		updatePost: (data) => dispatch(editPost(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)