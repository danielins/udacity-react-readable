import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comment from './Comment'

import * as API from '../utils/API';

import { sorting, guid } from '../utils/';

import { addComments, updateCommentScore, editComment, deleteComment } from '../actions/comments.js';


/**
 * Comments section in Post Deal
 * Comment listing and new comment form
 */

class Comments extends Component{

	constructor(props){
		super(props);

		// binded functions to child component and form event handling
		this.publishComment = this.publishComment.bind(this);
		this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
		this.editCommentHandler = this.editCommentHandler.bind(this);
		this.voteScoreHandler = this.voteScoreHandler.bind(this);

	}

	/**
	 * Initial state
	 * THIS STATE MUST HANDLE ONLY DATA FOR USER INTERFACE
	 */
	state = {
		editing: false,
		comments: []
	}

	/**
	 * Function fired when submitting the new comment form
	 */
	publishComment(e){
		e.preventDefault();

		// builds object with form data
		let newComment = {	
			id: guid(),
			timestamp: new Date()*1,
			voteScore: 1,
			author: document.getElementById('author').value,
			body: document.getElementById('body').value,
			parentId: this.props.postId
		};

		// checks the mandatory data
		if ( !newComment.author || !newComment.body ){
			alert('Author name or comment cannot be empty!');
			return false;
		}

		// updates the store
		this.props.pushComments([newComment]);

		// updates data on the server
		API.newComment(newComment);

		// cleans the form
		document.querySelector('#form-new-comment').reset();
	}


	/**
	 * Function fired when submitting the edit comment form
	 * This function is called on the child Comment Component
	 */
	editCommentHandler(editObject){

		this.props.updateComment(editObject);

		API.editComment(editObject);

	}


	/**
	 * Function fired when deletting a comment
	 * This function is called on the child Comment Component
	 */
	deleteCommentHandler(id){
		this.props.removeComment(id);
		API.deleteComment(id);
	}


	/**
	 * Handles the vote event triggered by click on the button
	 * - calculates the new score
	 * @param vote {String} - 'upVote' or 'downVote', how the voteScore will be calculated
	 * @param commentId {String} - id of the comment being voted
	 */
	voteScoreHandler(vote, commentId) {

		// looks for the comment being voted
		const comment = this.props.comments.find((comment) => comment.id === commentId);

		// calculate its new score
		const voteScore = vote === 'upVote' ? comment.voteScore+1 : comment.voteScore-1;

		// updates the store
		this.props.voteComment({commentId, voteScore});

		// updates data on the server
		API.voteComment(commentId, vote);

	}

	render(){

		const { comments } = this.props;

		return (

			<section className="comments">
				<h2>
					Comments
				</h2>
				{ comments.length ?
					comments.map((comment) => { 
						if ( !comment.deleted)
							return (
								<Comment key={ comment.id } data={comment} voteScoreHandler={this.voteScoreHandler} deleteCommentHandler={this.deleteCommentHandler} editCommentHandler={this.editCommentHandler} />
							)
						else 
							return false
						}
					)
					:
					<p>No comments yet</p>
				}
				<h2>
					Post a comment
				</h2>
				<form className="form" id="form-new-comment" onSubmit={ this.publishComment }>
					<input id="author" name="author" type="text" placeholder="Your name" />
					<textarea id="body" name="body" placeholder="Your comment..."/>
					<button type="submit">Send</button>
				</form>
			</section>

		)
	}

}


/**
 * mapStateToProps
 */
function mapStateToProps({comments}, {postId}){
	return {
		comments: comments.filter(comment => comment.parentId === postId).sort( sorting('voteScore', 'desc') ),
	}
}


/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
	return {
		voteComment: (data) => dispatch(updateCommentScore(data)),
		pushComments: (data) => dispatch(addComments(data)),
		updateComment: (data) => dispatch(editComment(data)),
		removeComment: (data) => dispatch(deleteComment(data))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments)