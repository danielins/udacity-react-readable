import * as Types from '../actions/types.js';

/**
 * categories reducer
 * reducer for categories viewing
 
 * @param state {Array} - the existing state of categories
 * @param action {Object} - the action taking place 
 */
export default function categories(state = [], action) {

	const { type, categories } = action;

	switch ( type ) {
		
		case Types.ADD_CATEGORIES:
			return state.concat(categories);
		
		default: 
			return state
	}
}
