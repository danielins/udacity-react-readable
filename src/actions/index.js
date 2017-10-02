/**
 * index.js actions
 */

export const ADD_CATEGORIES = 'ADD_CATEGORIES';

export const ADD_POSTS = 'ADD_POSTS';
export const RESET_POSTS = 'RESET_POSTS';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE';
export const DELETE_COMMENT = 'DELETE_COMMENT';

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


/**
 * addComments action creator
 */
export function addComments( comments ){
	return {
		type: ADD_COMMENTS,
		comments
	}
}


/**
 * updateCommentScore action creator
 */
export function updateCommentScore({commentId, voteScore}){
	return {
		type: UPDATE_COMMENT_SCORE,
		commentId,
		voteScore
	}
}

/**
 * deleteComment action creator
 */
export function deleteComment( commentId ){
	return {
		type: DELETE_COMMENT,
		commentId
	}
}