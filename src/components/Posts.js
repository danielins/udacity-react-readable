import React, { Component } from 'react';

class Posts extends Component {

	state = {
		posts: null
	}

	componentDidMount(){

		const url = `http://localhost:5001/${ this.props.category ? (this.props.category+"/") : this.props.category }posts`;

		console.log(url);

		fetch(url, {headers: {'Authorization': 'udacity'}})
		.then((r) => r.json())
		.then((json) => {
			console.log('json', json);
			this.setState(() => {
				posts: json
			})
		});

	}

	componentDidUpdate(){
		console.log('update');
		this.render();
	}

	render(){

		const {posts} = this.state;

		return (
			<main>
				<h1>
					Title
				</h1>
			{
				posts && posts.map((category) => <Post data={category} />)
			}
			</main>
		);

	}

}

class Post extends Component {

	render() {
		console.loog('Post data', this.props.data)
		return (
			<article className="post">
			</article>
		);
	}

}

export default Posts;