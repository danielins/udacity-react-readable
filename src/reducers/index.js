/**
 * index.js reducer
 */

import { combineReducers } from 'redux';

import * as Actions from '../actions';


/**
 * categories reducer
 * reducer for categories viewing
 
 * @param state {Array} - the existing state of categories
 * @param action {Object} - the action taking place 
 */
function categories(state = [], action) {

	const { type, categories } = action;

	switch ( type ) {
		
		case Actions.ADD_CATEGORIES:
			return state.concat(categories);
		
		default: 
			return state
	}
}

function posts(state = [], action){

	const { type, posts, postId, voteScore } = action;

	switch ( type ){

		case Actions.ADD_POSTS:
			// only adds posts that aren't already on the state and not deleted
			let newAddPost = state.slice();
			posts.forEach((post) => {
				let exists = state.find((pos) => post.id === post.id) ? true : false;
				if ( !exists && !post.deleted ){
					newAddPost.push(post);
				}
			});
			return newAddPost;

		case Actions.UPDATE_POST_SCORE:
			let newState = state.map((post) => {
				if ( post.id === postId ) {
					return {
						...post,
						voteScore
					}
				}
				return post
			});
			return newState;

		case Actions.RESET_POSTS:
			return [];

		default:
			return state

	}
}


function comments(state = [], action){

	const { type, comments, commentId, timestamp, body, voteScore } = action;

	switch ( type ){

		case Actions.ADD_COMMENTS:
			// only adds comments that aren't already on the state and not deleted
			let newAddState = state.slice();
			comments.forEach((comment) => {
				let exists = state.find((com) => com.id === comment.id) ? true : false;
				if ( !exists && !comment.deleted ) {
					newAddState.push(comment);
				}
			});
			return newAddState;

		case Actions.UPDATE_COMMENT_SCORE:
			let newUpState = state.map((comment) => {
				if ( comment.id === commentId ) {
					return {
						...comment,
						voteScore
					}
				}
				return comment
			});
			return newUpState;

		case Actions.EDIT_COMMENT:
			let newEditState = state.map((comment) => {
				if ( comment.id === commentId ){
					return {
						...comment,
						timestamp,
						body,
					}
				}
				return comment
			});
			return newEditState;

		case Actions.DELETE_COMMENT:
			let newDelState = state.map((comment) => {
				if ( comment.id === commentId ) {
					return {
						...comment,
						deleted: true
					}
				}
				return comment
			});
			return newDelState;

		default:
			return state;

	}

}


export default combineReducers({
	categories,
	posts,
	comments
})