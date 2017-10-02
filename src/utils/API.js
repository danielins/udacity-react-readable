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


/**
 * votePost
 * update the voteScore of a post
 * @param id {String} - the id of the post being voted
 * @param option {String} - 'upVote' to inscrease or 'downVote' to decrease the score
 */
export const votePost = (id, option) => {
	const method = 'POST';
	const body = JSON.stringify({option});
	return fetch(`${url}/posts/${id}`, { method, headers: {
		...headers,
		"Content-Type": "application/json"
	}, body })
	.then(res => res.json())
}


/**
 * getCommentsByPost
 * get the comments of a single post
 * @param id {String} - the id of the post
 */
export const getCommentsByPost = (id) => {
	return fetch(`${url}/posts/${id}/comments`, { headers })
			.then(res => res.json())
}


/**
 * voteComment
 * update the voteScore of a comment
 * @param id {String} - the id of the comment being voted
 * @param option {String} - 'upVote' to inscrease or 'downVote' to decrease the score
 */
export const voteComment = (id, option) => {
	const method = 'POST';
	const body = JSON.stringify({option});
	return fetch(`${url}/comments/${id}`, { method, headers: {
		...headers,
		"Content-Type": "application/json"
	}, body })
	.then(res => res.json())
}

/**
 * newComment
 * publishes a new comment on a post
 */
export const newComment = (comment) => {
	const method = 'POST';
	const body = JSON.stringify(comment);
	return fetch(`${url}/comments`, { method, headers: {
		...headers,
		"Content-Type": "application/json"
	}, body })
		.then(res => res.json())
}

/**
 * deleteComment
 * sets deleted flag of a comment to true
 */
export const deleteComment = (commentId) => {
	const method = 'DELETE';
	return fetch(`${url}/comments/${commentId}`, { method, headers })
			.then(res => res.json())
}