import * as Types from '../actions/types.js';

/**
 * posts reducer
 * reducer for posts viewing
 
 * @param state {Array} - the existing state of posts
 * @param action {Object} - the action taking place 
 */
export default function posts(state = [], action){

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