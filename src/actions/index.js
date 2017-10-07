/**
 * index.js actions
 */

export const ADD_CATEGORIES = 'ADD_CATEGORIES';

export const ADD_POSTS = 'ADD_POSTS';
export const ADD_COMMENT_TOTAL = 'ADD_COMMENT_TOTAL';
export const EDIT_POST = 'EDIT_POST';
export const RESET_POSTS = 'RESET_POSTS';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';
export const DELETE_POST = 'DELETE_POST';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_FROM_PARENT = 'DELETE_COMMENT_FROM_PARENT';

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


export function addCommentTotal({postId, commentTotal}){
	return {
		type: ADD_COMMENT_TOTAL,
		postId,
		commentTotal
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
 * editPost action creator
 */
export function editPost({ postId, title, body }){
	return {
		type: EDIT_POST,
		postId,
		title,
		body
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
 * deletePost action creator
 */
export function deletePost( postId ){
	return {
		type: DELETE_POST,
		postId
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
 * editComment action creator
 */
export function editComment({ commentId, timestamp, body }){
	return {
		type: EDIT_COMMENT,
		commentId,
		timestamp,
		body,
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


/**
 * deleteCommentFromParent action creator
 */
export function deleteCommentFromParent( parentId ){
	return {
		type: DELETE_COMMENT,
		parentId
	}
}