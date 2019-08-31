import React from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			priority: 1
		}
	}

	onChange(e) {
		this.setState(
			{ [e.target.name]: e.target.value }
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.addTodo(this.state.title);
		this.setState({title: ""});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)} className="todo-header-form">
				<div className="todo-header-form-input">
					<input 
						type='text'
						name='title'
						placeholder='Add todo...'
						onChange={this.onChange.bind(this)}
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

export default AddTodo;
