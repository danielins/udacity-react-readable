/**
 * index.js action creatores for posts
 */

import * as Types from './types.js';


/**
 * addComments action creator
 */
export function addComments( comments ){
	return {
		type: Types.ADD_COMMENTS,
		comments
	}
}


/**
 * updateCommentScore action creator
 */
export function updateCommentScore({commentId, voteScore}){
	return {
		type: Types.UPDATE_COMMENT_SCORE,
		commentId,
		voteScore
	}
}

/**
 * editComment action creator
 */
export function editComment({ commentId, timestamp, body }){
	return {
		type: Types.EDIT_COMMENT,
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
		type: Types.DELETE_COMMENT,
		commentId
	}
}


/**
 * deleteCommentFromParent action creator
 */
export function deleteCommentFromParent( parentId ){
	return {
		type: Types.DELETE_COMMENT,
		parentId
	}
}