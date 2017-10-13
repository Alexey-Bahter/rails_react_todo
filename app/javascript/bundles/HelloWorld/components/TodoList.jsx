import PropTypes from 'prop-types';
import axios from 'axios'
import React from 'react';
import Item from './Item'

export default class TodoList extends React.Component {
  static propTypes = {
    // name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
    console.log(this.props);
    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { text: "", counter: 0 };

    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput = (text) => {
      this.setState({text: text});
  }

  addTodo = (e) => {
      e.preventDefault();
      // let counter;
      let count = this.state.counter;
      count++;
      this.setState({counter: count});
      let todoList = this.props.todoList;
      todoList.push({user_id: this.state.counter, text: this.state.text, done: false});
      // console.log("this.state.todo",this.state.todo);

      axios.post('/todos', {
          todo: {body: this.state.text, user_id: 1, done: false}
      })
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
  }

  render() {
      // console.log("this.props.todoList",this.props.todoList);
      console.log("this.props.todoList",this.props);
      // this.state.counter
    return (
      <div>
        <h3>
          {/*Hello, {this.state.text}!*/}
        </h3>
        <hr />
        <form onSubmit={this.addTodo}>
          <label htmlFor="name">
            Say hello to:
          </label>
          <input
            id="name"
            type="text"
            value={this.state.text}
            onChange={(e) => this.onChangeInput(e.target.value)}
          />
            <input type="submit" value="Add Todo"/>
        </form>
          <Item state={this.state} data={this.props} />
      </div>
    );
  }
}
