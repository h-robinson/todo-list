import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
// Custom components
import Header from './components/layouts/Header';
import AddTodo from './components/todo_components/AddTodo';
import SearchTodos from './components/todo_components/SearchTodos';
import Todos from './components/todo_components/Todos';
import SearchResults from './components/todo_components/SearchResults';
import About from './pages/About';

import './css/App.css';

// TODO:
//  Press return to submit add / search
//  Implement search results - i think just filter and display other statussed for now
//  Only show pending todos - on mark completed, show crossed out for 3 seconds then fade it
//  Add link to view completed, default order completeded date desc. should be searchable
//  Add sort by: name, priority, date added, date completed(only if showing completes), date due
//  Add date due (and do on/after)
//  Add grouping by priority and do dates

class App extends React.Component {
  constructor(props) {
    super(props);
    // state init
    this.state = {
      todos: [],
      newTodo: {
        title: '',
        priority: '',
        notes: '',
        status: '',
        completed_at: '',
        date: '',
        date_operator: ''
      },
      searchString: '',
      searchMatches: []
    };
    // event bindings
    this.markComplete = this.markComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.searchTodos = this.searchTodos.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // resource addresses
    this.uri = "https://hrob-api.herokuapp.com";
    this.filterUri = "https://hrob-api.herokuapp.com/filter_todos";
  }

  componentDidMount() {
    axios.get(this.uri.concat("/todos"))
      .then((res) => 
        this.setState({todos: res.data})
      )
      .catch(res => console.log(res));
  }

  deleteTodo(id) {
    axios.delete(`${this.uri}/todos/${id}`)
      .then((res) => 
        this.setState({todos: [...this.state.todos.filter((todo) => todo.id !== id)]}))
      .catch(res => console.log(res));
  }

  markComplete(id) {
    axios.put(`${this.uri}/todos/${id}`, { status: 'on_hold'})
      .then((res) => 
        this.setState({
          todos: this.state.todos.map((todo) => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }
            return todo;
          })
        })
      )
    .catch(res => console.log(res));
  };

  onChange(e) {
    axios.get(`${this.filterUri}?search_term=${e.target.value}`).then((res) =>
      this.setState({ searchMatches: res.data }));
    this.setState(
      (e.target.name === 'title') ?
        { newTodo: { [e.target.name]: e.target.value } } :
        { searchString: e.target.value }
      );
  }

  onSubmit(e) {
    e.preventDefault();
    if (e.target.value === '') {
      console.log('Empty input!');
      // TODO: highlight error
      return;
    }
    switch(e.target.name) {
      case 'new-todo-form':
        this.addTodo();
        this.setState({ newTodo: { title: '' } });
        break;
      case 'search-form':
        this.searchTodos();
        this.setState({ searchString: '' });
        break;
      default:
        break;
    }
  }

  addTodo() {
    const { title, priority } =  this.state.newTodo;
    axios.post(this.uri.concat("/todos"), {
      title,
      priority,
      completed: false
    }).then((res) => {
      this.setState({todos: [...this.state.todos, res.data]})
    })
  }

  searchTodos() {
    // placeholder - atm, search button not implemented
    return ([]);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header links={{toggleLinks: this.toggleLinks}} />
          <div className="container app-container">
            <Route exact path="/todo-list"
              render={
                (props) => (
                  <React.Fragment>
                    <div className="todo-list-header">
                      <AddTodo
                        newTodo={this.state.newTodo}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                      />
                      <SearchTodos
                        searchString={this.state.searchString}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                      />
                    </div>
                    <SearchResults
                      searchMatches={this.state.searchMatches}
                      listType={'search'} // search || add
                    />
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
