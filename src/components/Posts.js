import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPosts } from '../actions';

import { sorting } from '../utils/';
import * as API from '../utils/API';

import PostHeader from './PostHeader';

/**
 * Page listing all posts or posts for a specfic category
 */
class Posts extends Component {

	constructor(props){
		super(props);

		// binded function to be passed on children
		this.handleVote = this.handleVote.bind(this);

		// binded function to handle select field
		this.orderHandler = this.orderHandler.bind(this);

		// initial state
		this.state = {
			orderBy: 'voteScore',
			posts: []
		};
	}

	/**
	 * When the component mounts, get the post from the API and sort them
	 */
	componentDidMount(){
		API.getPosts()
		.then((json) => { this.props.pushPosts(json); this.orderPosts( this.state.orderBy ); });
	}

	componentWillReceiveProps(newProps){
		let sorted = newProps.posts.slice().sort( sorting(this.state.orderBy, 'desc') );
		this.setState({ posts: sorted });
	}

	/** When the option of sorting is selected
	 * @param event {Object} - data of the triggered event
	 */
	orderHandler( event ){
		const orderBy = event.target.value;
		this.setState({ orderBy });
		this.orderPosts( orderBy );
	}

	orderPosts(orderBy = this.state.orderBy){
		let sorted = this.props.posts.slice().sort( sorting(orderBy, 'desc') );
		this.setState({ posts: sorted });
	}

	handleVote(){
		this.orderPosts();
	}

	render(){

		const {posts} = this.state;

		return (
			<main>
				<header>
					<h1>
						{ this.props.category }
					</h1>
					<form>
						<label htmlFor="cmpOrder">Order by:</label>
						<select value={ this.state.orderBy } onChange={ this.orderHandler }>
							<option value="voteScore">Post Score</option>
							<option value="timestamp">Most Recent</option>
						</select>
					</form>
				</header>
				{
					posts.length ? posts.map((post) => <PostHeader handleVote={this.handleVote} data={post} key={post.id} />) : 'No posts were found. :('
				}
			</main>
		);

	}

}

/**
 * mapStateToProps
 */
function mapStateToProps({posts}, { match }){
	const category = match.params.id || 'home';
	return {
		category,
		posts: category === 'home' ? posts : posts.filter((post) => post.category === category),
	}
}

/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
  return {
    pushPosts: (data) => dispatch(addPosts(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);