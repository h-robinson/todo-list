import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
// Custom components
import Header from './components/layouts/Header';
import AddTodo from './components/todo_components/AddTodo';
import SearchTodos from './components/todo_components/SearchTodos';
import Todos from './components/todo_components/Todos';
import About from './pages/About';

import './css/App.css';

    const todos = [
      // {
      //   user_id: '1',
      //   id: '1',
      //   title: 'Get a haircut',
      //   priority: 1,
      //   completed: false
      // },
      // {
      //   user_id: '1',
      //   id: '2',
      //   title: 'Get a real job',
      //   priority: 1,
      //   completed: false
      // },
      // {
      //   user_id: '1',
      //   id: '3',
      //   title: 'Get retarded',
      //   priority: 0,
      //   completed: true
      // }
    ]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: todos};
    this.markComplete = this.markComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.uri = "https://jsonplaceholder.typicode.com";
  }


  componentDidMount() {
    axios.get(this.uri.concat("/todos?_limit=19")).then((res) => 
      this.setState({todos: res.data})
    );
  }

  deleteTodo(id) {
    axios.delete(`${this.uri}/todos/${id}`).then((res) => 
      this.setState({todos: [...this.state.todos.filter((todo) => todo.id !== id)]}))
  }

  markComplete(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  addTodo(title) {
    axios.post(this.uri.concat("/todos"), {
      title,
      completed: false
    }).then((res) => {
      this.setState({todos: [...this.state.todos, res.data]})
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header links={{toggleLinks: this.toggleLinks}} />
            <Route exact path="/"
          <div className="container app-container">
              render={
                (props) => (
                  <React.Fragment>
                      <AddTodo addTodo={this.addTodo}/>
                      <SearchTodos />
                    <div className="todo-list-header">
                    </div>
                    <Todos
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      deleteTodo={this.deleteTodo}
                    />
                  </React.Fragment>
                )
              }
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
