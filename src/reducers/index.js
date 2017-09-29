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
			return state.concat( posts.filter((post) => !post.deleted) );

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

	const { type, comments } = action;

	switch ( type ){

		case Actions.ADD_COMMENTS:
			// only adds comments that aren't already on the state
			let newState = state.slice();
			comments.forEach((comment) => {
				let exists = state.find((com) => com.id === comment.id);
				if ( !exists ) {
					newState.push(comment);
				}
			});
			return newState;

		default:
			return state;

	}

}


export default combineReducers({
	categories,
	posts,
	comments
})