import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

class Todos extends React.Component {
	render() {	
		return (
			<div className="todos-list">{
				this.props.todos.map((todo) => (
					<Todo
					  key={todo.id}
					  todo={todo}
					  markComplete={this.props.markComplete}
					  deleteTodo={this.props.deleteTodo}
					/>
				))
			}</div>
		);
	}

}

Todo.propTypes = {
	todos: PropTypes.array.isRequired,
	// markComplete: PropTypes.function.isRequired
}

export default Todos;
