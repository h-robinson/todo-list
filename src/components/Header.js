import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
	return (
		<div className="header">
			<div className="heading">
				<h1>Todo</h1>
			</div>
			<div className="header-links">
				<Link id='todo-link' to="/todo-list">Todo List</Link>
				<Link id='about-link' to="/about">About</Link>
			</div>
		</div>	
	);
}