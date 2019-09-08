import React from 'react';
import PropTypes from 'prop-types';

class SearchTodos extends React.Component {
	render() {
		return (	
			<form onSubmit={this.props.onSubmit.bind(this)} name='search-form' className="todo-header-form">
				<div className="todo-header-form-input">
					<input
						type='text'
						name='search'
						placeholder='Search...'
						value={this.props.searchString}
						onChange={this.props.onChange.bind(this)}
				 />
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

SearchTodos.propTypes = {
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	searchString: PropTypes.string.isRequired
};

export default SearchTodos;