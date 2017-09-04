/**
 * index.js actions
 */

export const ADD_CATEGORY = 'ADD_CATEGORY';

/**
 * addCategory action creator
 * @param name {String} - name of the category
 * @param path {String} - path of the category
 */
export function addCategory({ name, path }){
	return {
		type: ADD_CATEGORY,
		name,
		path,
	}
}