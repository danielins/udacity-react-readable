/**
 * index.js actions
 */

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_POSTS = 'ADD_POSTS';
export const RESET_POSTS = 'RESET_POSTS';

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
 * resetPosts action creator
 */
export function resetPosts(){
	return {
		type: RESET_POSTS
	}
}