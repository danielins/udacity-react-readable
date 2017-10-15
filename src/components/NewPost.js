import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendPost, sendUpdate, fetchPostDetail } from '../actions/posts.js';

import { guid, ROOT } from '../utils/';

/**
 * View of submitting a new post or editing an existing one
 */
class NewPost extends Component {

	constructor(props){
		super(props);

		// binded functions to form event handling
		this.publishPost = this.publishPost.bind(this);
	}

	componentWillMount(){
		const {id} = this.props;
		this.props.fetchPostDetail(id);
	}

	/**
	 * Triggers when the form is submitted
	 * Decides if it's going to be an edit or a new post by checking if there's an id
	 */
	publishPost(e){
		e.preventDefault();
		const { id } = this.props;
		id ? this.editPostHandler() : this.newPostHandler();
	}

	editPostHandler(){

		const { id, post } = this.props;

		const edits = {
			postId: id,
			title: document.getElementById('title').value,
			body: document.getElementById('body').value
		}

		// updates the post and then redirects to the detail page
		this.props.sendUpdate(edits).then(() => 
			location.href = `${ROOT}/${ post ? post.category : '' }${ post ? `/${post.id}` : '' }`
		);

	}

	newPostHandler(){

		const post = {
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

		this.props.sendPost(post).then( location.href = "/" );

	}

	// Used for when the router changes to the same route
	// but with different parameter
	componentDidUpdate(){
		this.render();
		document.getElementById('form-new-post').reset();
	}

	render(){

		const { categories, post } = this.props;

		const fieldOtions = {}
		if (post){
			fieldOtions['readOnly'] = 'readOnly';
			fieldOtions['disabled'] = 'disabled';
		}

		return (
			<main>
				<h1>
					{ post ? 'Edit post' : 'Publish new post' }
				</h1>

				<form className="form" id="form-new-post" name="form-new-post" onSubmit={ this.publishPost }>

					<input type="hidden" name="id" id="id" defaultValue={ post ? post.id : ''} />

					<label htmlFor="title">
						Author
						<input 
							type="text"
							id="author"
							name="author"
							defaultValue={ post ? post.author : '' }
							{ ...fieldOtions } />
					</label>

					<label htmlFor="category">
						Category <small>(must choose one):</small>
						<select 
							id="category"
							name="category"
							defaultValue={ post ? post.category : '' }
							{ ...fieldOtions } >
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
		sendPost: (data) => sendPost(data, dispatch),
		sendUpdate: (data) => sendUpdate(data, dispatch),
		fetchPostDetail: (id) => fetchPostDetail(id, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)