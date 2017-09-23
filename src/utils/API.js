/**
 * API
 * All functions and settings for handling server data
 */


export const url = 'http://localhost:5001'
export const Authorization = 'udacity'

export const headers = { Authorization }

/**
 * getCategories
 * fetch all the categories
 */
export const getCategories = () => {
	return fetch(`${url}/categories`, { headers })
			.then(res => res.json())
}

/**
 * getPosts
 * fetch all the posts
 */
export const getPosts = () => {
	return fetch(`${url}/posts`, { headers })
			.then(res => res.json())
}


/**
 * getCategoryPosts
 * fetch all the posts from a category
 * @param category {String} - the category to be searched
 */
export const getCategoryPosts = (category) => {
	return fetch(`${url}/${category}/posts`, { headers })
			.then(res => res.json())
}

/**
 * getPostDetail
 * fetch all info of a single post
 * @param id {String} - the id of the post to be fetched
 */
export const getPostDetail = (id) => {
	return fetch(`${url}/posts/${id}`, { headers })
			.then(res => res.json())
}