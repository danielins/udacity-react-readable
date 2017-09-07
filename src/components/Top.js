import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Top Component
 * The header of the application
 * Contains the logo and the main menu
 * The menu is used to navigate through the categories
 */

class Top extends Component {
	render () {

		const { categories } = this.props;

		return (
			<header className="top">
				<h1>
					<NavLink to='/'>Readable</NavLink>
				</h1>
				<ul className="top__menu">
					{
						categories.map((cat, index) => <TopItem key={index} item={{path: cat.path, name: cat.name}} />)
					}
				</ul>
			</header>
		);
	}
}

/**
 * TopItem Component
 * A Link for a Category page
 */
class TopItem extends Component {
	render() {

		const { path, name } = this.props.item;

		return (
			<li className="top__menu-item">
				<NavLink to={`/c/${path}`} activeClassName="current">
					{name}
				</NavLink>
			</li>
		);
	}
}


export default Top;