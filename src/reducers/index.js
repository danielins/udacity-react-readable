/**
 * index.js reducer
 */

import { combineReducers } from 'redux';

import { ADD_CATEGORY } from '../actions';

// The initial blank state for category viewing
// The category view consists on the list of posts of a category
// or all the categories
const initState = {
	categories: null,
	posts: null,
	comments: null,
}


/**
 * categories reducer
 * reducer for categories viewing
 
 * @param state {Object} - the existing state
 * @param action {String} - the action taking place 
 */
function categories(state = initState, action) {

	const { name, path } = action;

	switch ( action.type ) {
		case ADD_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					[name]: path
				}
			}
		default: 
			return state
	}

}


export default combineReducers({
	categories,
})