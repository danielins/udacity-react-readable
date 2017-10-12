import * as Types from '../actions/types.js';

/**
 * comments reducer
 * reducer for comments viewing
 
 * @param state {Array} - the existing state of comments
 * @param action {Object} - the action taking place 
 */

export default function comments(state = [], action){

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