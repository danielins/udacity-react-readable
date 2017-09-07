/**
 * index.js reducer
 */

import { combineReducers } from 'redux';

import { ADD_CATEGORY } from '../actions';

// The initial blank state for category viewing
// The category view consists on the list of posts of a category
// or all the categories
/*
const initState = {
	categories: null,
	posts: null,
	comments: null,
}
*/


/**
 * categories reducer
 * reducer for categories viewing
 
 * @param state {Array} - the existing state of categories
 * @param action {Object} - the action taking place 
 */
function categories(state = [], action) {

	const { type, name, path } = action;

	switch ( type ) {
		
		case ADD_CATEGORY:
			let newState = state.slice();
			newState.push({name, path});
			return newState;
		
		default: 
			return state
	}

}

function posts(state = {}, action){
	return state
}


export default combineReducers({
	categories,
	posts,
})