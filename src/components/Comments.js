import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as API from '../utils/API';

import { sorting, getDateByTimestamp, guid } from '../utils/';

import { addComments, updateCommentScore, deleteComment } from '../actions/';


/**
 * Comments section in Post Deal
 * Comment listing and new comment form
 */

class Comments extends Component{

	constructor(props){
		super(props);

		// binded function to handle select field
		this.publishComment = this.publishComment.bind(this);
		this.deleteCommentHandler = this.deleteCommentHandler.bind(this);

	}

	/**
	 * Initial state
	 * THIS STATE MUST HANDLE ONLY DATA FOR USER INTERFACE
	 */
	state = {
		comments: []
	}

	publishComment(e){
		e.preventDefault();

		let newComment = {	
			id: guid(),
			timestamp: new Date()*1,
			author: document.getElementById('author').value,
			body: document.getElementById('body').value,
			parentId: this.props.postId
		};

		if ( !newComment.author || !newComment.body ){
			alert('Author name or comment cannot be empty!');
			return false;
		}

		// updates the store
		this.props.pushComments([newComment]);

		// updates data on the server
		API.newComment(newComment).then((json) => console.log(json));

		// cleans the form
		document.querySelector('#form-new-comment').reset();
	}


	editCommentHandler(id){}

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
								<article className="comment" key={ comment.id }>
									<button type="button" onClick={ () => this.voteScoreHandler('upVote', comment.id) }>+1</button>
									<span>
										{ comment.voteScore }
									</span>
									<button type="button" onClick={ () => this.voteScoreHandler('downVote', comment.id) }>-1</button>
									<p>
										{ comment.body }
									</p>
									<p>
										{ comment.author } - { getDateByTimestamp(comment.timestamp) }
									</p>
									<p>
										<button type="button" onClick={ () => this.editCommentHandler(comment.id) }>edit</button> | <button type="button" onClick={ () => this.deleteCommentHandler(comment.id) }>delete</button>
									</p>
								</article>
							)
						else 
							return false
						}
					)
					:
					<p>No comments yet</p>
				}
				<form id="form-new-comment" onSubmit={ this.publishComment }>
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
function mapStateToProps({comments}){
	return {
		comments: comments.sort( sorting('voteScore', 'desc') ),
	}
}


/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
	return {
		voteComment: (data) => dispatch(updateCommentScore(data)),
		pushComments: (data) => dispatch(addComments(data)),
		removeComment: (data) => dispatch(deleteComment(data))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments)