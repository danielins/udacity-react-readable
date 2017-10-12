/**
 * index.js action creatores for posts
 */

import * as Types from './types.js';


/**
 * addCategories action creator
 */
export function addCategories(categories){
	return {
		type: Types.ADD_CATEGORIES,
		categories
	}
}


/**
 * addPosts action creator
 */
export function addPosts( posts ){
	return {
		type: Types.ADD_POSTS,
		posts
	}
}


export function addCommentTotal({postId, commentTotal}){
	return {
		type: Types.ADD_COMMENT_TOTAL,
		postId,
		commentTotal
	}
}


/**
 * updatePostScore action creator
 */
export function updatePostScore({postId, voteScore}){
	return {
		type: Types.UPDATE_POST_SCORE,
		postId,
		voteScore
	}
}


/**
 * editPost action creator
 */
export function editPost({ postId, title, body }){
	return {
		type: Types.EDIT_POST,
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
		type: Types.RESET_POSTS
	}
}


/**
 * deletePost action creator
 */
export function deletePost( postId ){
	return {
		type: Types.DELETE_POST,
		postId
	}
}