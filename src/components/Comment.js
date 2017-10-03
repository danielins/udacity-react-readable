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
				<button type="button" onClick={ () => voteScoreHandler('upVote', data.id) }>+1</button>
				<span>
					{ data.voteScore }
				</span>
				<button type="button" onClick={ () => voteScoreHandler('downVote', data.id) }>-1</button>
				<p>
					{ data.body }
				</p>
				<p>
					{ data.author } - { getDateByTimestamp(data.timestamp) }
				</p>
				<p>
					<button type="button" onClick={ () => this.editComment() }>edit</button> | <button type="button" onClick={ () => this.props.deleteCommentHandler(data.id) }>delete</button>
				</p>

				{ this.state.editing &&
					<form className="form-edit-comment" onSubmit={ this.publishEditComment }>
						<input id="author" name="author" type="text" placeholder="Your name" value={ data.author } readOnly/>
						<textarea id="body" name="body" placeholder="Your comment..." defaultValue={ data.body } />
						<button type="submit">Edit</button>
					</form>
				}

				--

			</article>
		);

	}

}


export default connect(null, null)(Comment);