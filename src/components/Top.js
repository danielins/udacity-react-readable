import React, { Component } from 'react';

/**
 * Top Component
 * The header of the application
 * Contains the logo and the main menu
 * The menu is used to navigate through the categories
 */

class Top extends Component {
	render () {
		return {
			<header className="top">
				<h1>
					Readable
				</h1>
				<ul className="top__menu">
					<li><a href="#">Item 1</a></li>
					<li><a href="#">Item 2</a></li>
					<li><a href="#">Item 3</a></li>
				</ul>
			</header>
		}
	}
}

export default Top;