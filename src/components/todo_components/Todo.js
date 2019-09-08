import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todo extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.deleteTodo(this.props.todo.id);
	}
	handleChange(e) {
		this.props.markComplete(this.props.todo.id);
	}

	prioritySymbol(priority) {
		return priority && (parseInt(priority) > 1 ? 'exclamation' : '');
	}

	getStyle = (completed) => {
		return {
			textDecoration: this.props.todo.completed ?
			  'line-through' :
			  'none'
		};
	}

	render() {
		const { title, priority, completed } = this.props.todo;
		return (
			<div className="todo-item" style={this.getStyle(completed)}>
				<div className="todo-item-title">
					<input type="checkbox" onChange={this.handleChange} />
					{ title } { ' ' }
					<i className={"fas fa-".concat(this.prioritySymbol(priority)) }></i>
				</div>
				<div className="todo-item-controls">
					<button className="far fa-trash-alt" onClick={this.handleClick}></button>
				</div>
			</div>
		);
	}
}

Todo.propTypes = {
	todo: PropTypes.object.isRequired
};

export default Todo;