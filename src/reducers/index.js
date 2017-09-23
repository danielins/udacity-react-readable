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

	const { type, posts } = action;

	switch ( type ){

		case Actions.ADD_POSTS:
			return state.concat( posts.filter((post) => !post.deleted) );

		case Actions.RESET_POSTS:
			return [];

		default:
			return state

	}
}


export default combineReducers({
	categories,
	posts,
})