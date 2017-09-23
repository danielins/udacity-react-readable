import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { Link } from 'react-router-dom';

// import * as API from '../utils/API';


/**
 * Class for the preview of a single post inside the Posts listing
 */
class PostHeader extends Component {

	render() {

		const { data } = this.props;

		return (
			<article className="PostHeader">
				<div className="PostHeader__voteScore">
					<button type="button">+1</button>
					<span>
						{ data.voteScore }
					</span>
					<button type="button">-1</button>
				</div>
				<Link to={`/${data.category}/${data.id}`}>
					<h2 className="PostHeader__title">
						{ data.title }
					</h2>
				</Link>
				<p>
					by { data.author } - { data.timestamp }
				</p>
			</article>
		);

	}

}

function mapDispatchToProps(dispatch){
	return {
		//voteScore: (data) => dispatch(updateScore(data))
	}
}

export default connect(null, mapDispatchToProps)(PostHeader)