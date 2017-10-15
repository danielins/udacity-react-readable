import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { Link } from 'react-router-dom';

import { getDateByTimestamp } from '../utils/';

import { sendVote, erasePost } from '../actions/posts.js';


/**
 * Class for the preview of a single post inside the Posts listing
 * and the header os the Post Detail page
 */
class PostHeader extends Component {

	/**
	 * Initial state
	 * THIS STATE MUST HANDLE ONLY DATA FOR USER INTERFACE
	 */
	state = {
		voteScore: 0
	}

	/**
	 * When the component mounts, updates the local state
	 */
	componentDidMount(){
		this.setState({ 
			voteScore: this.props.data.voteScore
		});
	}

	/**
	 * Handles the vote event triggered by click on the button
	 * - calculates the new score
	 * @param vote {String} - 'upVote' or 'downVote', how the voteScore will be calculated
	 */
	voteScoreHandler(vote) {

		const postId = this.props.data.id;
		const voteScore = vote === 'upVote' ? this.state.voteScore+1 : this.state.voteScore-1;
		
		// updates the UI
		this.setState({ voteScore });

		// dispatches the action to the reducer update the state
		this.props.sendVote({postId, vote});

		// triggers the parent component sort function
		if ( typeof this.props.handleVote === 'function'){
			this.props.handleVote();
		}

	}

	/**
	 * Will trigger the deletion of the post
	 * @param id {String} - the id of the post
	 */
	deletePostHandler(id){

		const { returnPage } = this.props

		// call the actions
		this.props.erasePost(id)
		.then(() => {
			if ( returnPage ){
				location.href = `/${ returnPage }`
			}
		});

	}

	render() {

		const { data } = this.props;

		return (
			<article className="post-header">
				<div className="post-header__voteScore">
					<button className="bt-vote" type="button" title="Upvote this" onClick={ () => this.voteScoreHandler('upVote') }>+1</button>
					<span className="current-vote">
						{ this.state.voteScore }
					</span>
					<button className="bt-vote" type="button" title="Downvote this" onClick={ () => this.voteScoreHandler('downVote') }>-1</button>
				</div>
				<div className="post-header__content">
					<Link to={`/${data.category}/${data.id}`}>
						<h2 className="post-header__title">
							{ data.title }
						</h2>
					</Link>
					<p>
						by { data.author } - { getDateByTimestamp(data.timestamp) }
					</p>
					<p>
						{ data.commentTotal ? data.commentTotal > 1 ? `${data.commentTotal} comments` : '1 comment' : 'No comments' }
					</p>
					<Link className="bt bt-edit" to={`/edit/${ data.id }`}>Edit Post</Link>
					<button className="bt bt-delete" type="button" onClick={ () => this.deletePostHandler(data.id) }>Delete Post</button>
				</div>
			</article>
		);

	}

}

function mapDispatchToProps(dispatch){
	return {
		sendVote: (data) => sendVote(data, dispatch),
		erasePost: (data) => erasePost(data, dispatch),
	}
}

export default connect(null, mapDispatchToProps)(PostHeader)