/**
 * index.js actions
 */

export const ADD_CATEGORIES = 'ADD_CATEGORIES';

export const ADD_POSTS = 'ADD_POSTS';
export const RESET_POSTS = 'RESET_POSTS';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';

export const ADD_COMMENTS = 'ADD_COMMENTS';

/**
 * addCategories action creator
 */
export function addCategories(categories){
	return {
		type: ADD_CATEGORIES,
		categories
	}
}


/**
 * addPosts action creator
 */
export function addPosts( posts ){
	return {
		type: ADD_POSTS,
		posts
	}
}


/**
 * addComments action creator
 */
export function addComments( comments ){
	console.log('comments actions', comments)
	return {
		type: ADD_COMMENTS,
		comments
	}
}


/**
 * updatePostScore action creator
 */
export function updatePostScore({postId, voteScore}){
	return {
		type: UPDATE_POST_SCORE,
		postId,
		voteScore
	}
}


/**
 * resetPosts action creator
 */
export function resetPosts(){
	return {
		type: RESET_POSTS
	}
}