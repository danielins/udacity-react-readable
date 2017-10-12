/**
 * index.js reducer
 */

import { combineReducers } from 'redux';

import * as Types from '../actions/types.js';


/**
 * categories reducer
 * reducer for categories viewing
 
 * @param state {Array} - the existing state of categories
 * @param action {Object} - the action taking place 
 */
function categories(state = [], action) {

	const { type, categories } = action;

	switch ( type ) {
		
		case Types.ADD_CATEGORIES:
			return state.concat(categories);
		
		default: 
			return state
	}
}

function posts(state = [], action){

	const { type, posts, postId, commentTotal, voteScore, title, body } = action;

	switch ( type ){

		case Types.ADD_POSTS:
			// only adds posts that aren't already on the state and not deleted
			let newAddPost = state.slice();
			posts.forEach((post) => {
				let exists = state.find((pos) => post.id === post.id) ? true : false;
				if ( !exists && !post.deleted ){
					newAddPost.push(post);
				}
			});
			return newAddPost;

		case Types.ADD_COMMENT_TOTAL:
			let newCountPost = state.map((post) => {
				if ( post.id === postId ){
					return {
						...post,
						commentTotal
					}
				}
				return post
			});
			return newCountPost;

		case Types.UPDATE_POST_SCORE:
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

		case Types.EDIT_COMMENT:
			let newEditPost = state.map((post) => {
				if ( post.id === postId ){
					return {
						...post,
						title,
						body,
					}
				}
				return post
			});
			return newEditPost;

		case Types.DELETE_POST:
			let newDelPost = state.map((post) => {
				if ( post.id === postId ) {
					return {
						...post,
						deleted: true
					}
				}
				return post
			});
			return newDelPost;

		case Types.RESET_POSTS:
			return [];

		default:
			return state

	}
}


function comments(state = [], action){

	const { type, comments, commentId, parentId, timestamp, body, voteScore } = action;

	switch ( type ){

		case Types.ADD_COMMENTS:
			// only adds comments that aren't already on the state and not deleted
			let newAddState = state.slice();
			comments.forEach((comment) => {
				let exists = state.find((com) => com.id === comment.id) ? true : false;
				if ( !exists && !comment.deleted ) {
					newAddState.push(comment);
				}
			});
			return newAddState;

		case Types.UPDATE_COMMENT_SCORE:
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

		case Types.EDIT_COMMENT:
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

		case Types.DELETE_COMMENT:
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

		case Types.DELETE_COMMENT_FROM_PARENT:
			let newDelParentState = state.map((comment) => {
				if ( comment.parentId === parentId ) {
					return {
						...comment,
						deleted: true
					}
				}
				return comment
			});
			return newDelParentState;

		default:
			return state;

	}

}


export default combineReducers({
	categories,
	posts,
	comments
})