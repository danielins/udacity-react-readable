import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const Page404 = (props) => {
	return (
		<div className="page404">
			<span className="big">:(</span>
			<p>
				Page not found.<br />
				Make sure you have a valid URL or try returning to home.
			</p>
			<p>
				<Link to="/">Home</Link>
			</p>
		</div>
	)
}


export default Page404;