import React from 'react';
import PropTypes from 'prop-types';

class SearchTodos extends React.Component {
	render() {
		return (	
			<form className="todo-header-form">
				<div className="todo-header-form-input">
					<input placeholder='Search...' />
				</div>
				<div className="todo-header-form-button">
					<button 
						type='submit'
					 	value=''
					 	className="fas fa-search">
				 	</button>
			 	</div>
			</form>
		);
	}

}

SearchTodos.propTypes = {};

export default SearchTodos;