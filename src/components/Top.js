import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Top Component
 * The header of the application
 * Contains the logo and the main menu
 * The menu is used to navigate through the categories
 */

class Top extends Component {
	render () {
		return (
			<header className="top">
				<h1>
					<Link to='/'>Readable</Link>
				</h1>
				<ul className="top__menu">
					<li><Link to={{ pathname:'/category', query:{ 'catId': 'One' } }}>Item 1</Link></li>
					<li><Link to={{ pathname:'/category', query:{ 'catId': 'Two' } }}>Item 2</Link></li>
					<li><Link to={{ pathname:'/category', query:{ 'catId': 'Three' } }}>Item 3</Link></li>
				</ul>
			</header>
		);
	}
}

export default Top;