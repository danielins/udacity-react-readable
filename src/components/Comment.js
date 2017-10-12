import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDateByTimestamp } from '../utils/';

//import { editComment } from '../actions/';


class Comment extends Component {

	constructor(props){
		super(props);

		// binded functions to form event handling
		this.publishEditComment = this.publishEditComment.bind(this);

	}

	state = {
		editing: false,
	}

	editComment() {

		// toggle the editing state
		this.setState({ editing: this.state.editing ? false : true });

	}

	publishEditComment(e){

		e.preventDefault();

		const { data, editCommentHandler } = this.props;

		let edits = {
			commentId: data.id,
			timestamp: new Date()*1,
			body: document.getElementById('body').value,
		}

		editCommentHandler(edits);

		this.setState({ editing: false });

	}

	render(){

		const { data, voteScoreHandler } = this.props;

		return (
			<article className="comment" key={ data.id }>
				<div className="post-header__voteScore">
					<button className="bt-vote" type="button" title="Upvote this" onClick={ () => voteScoreHandler('upVote', data.id) }>+1</button>
					<span>
						{ data.voteScore }
					</span>
					<button className="bt-vote" type="button" title="Downvote this" onClick={ () => voteScoreHandler('downVote', data.id) }>-1</button>
				</div>
				<div className="post-header__content">
					<p>
						{ data.body }
					</p>
					<p className="comment-details">
						{ data.author } - { getDateByTimestamp(data.timestamp) }
					</p>
					<div className="comment-footer">
						<button className="bt bt-edit" type="button" onClick={ () => this.editComment() }>{ this.state.editing ? 'cancel' : 'edit' }</button>
						<button className="bt bt-delete" type="button" onClick={ () => this.props.deleteCommentHandler(data.id) }>delete</button>
					</div>
				</div>

				{ this.state.editing &&
					<form className="form form-edit-comment" onSubmit={ this.publishEditComment }>
						<label>
							Author
							<input id="author" name="author" type="text" placeholder="Your name" value={ data.author } readOnly/>
						</label>
						<label>
							Comment
							<textarea id="body" name="body" placeholder="Your comment..." defaultValue={ data.body } />
						</label>
						<button type="submit">Edit</button>
					</form>
				}

			</article>
		);

	}

}


export default Comment;