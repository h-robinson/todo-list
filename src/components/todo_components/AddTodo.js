import React from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.Component {
	render() {
		return (
			<form onSubmit={this.props.onSubmit.bind(this)} name='new-todo-form' className="todo-header-form">
				<div className="todo-header-form-input">
					<input 
						type='text'
						name='title'
						placeholder='Add todo...'
						value={this.props.newTodo.title}
						onChange={this.props.onChange.bind(this)}
					/>
				</div>
				<div className="todo-header-form-button">
					<button
					  type="submit"
					  value=""
						className="fas fa-plus"
					/>
				</div>
			</form>
		);
	}
}

AddTodo.propTypes = {
	newTodo: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default AddTodo;
