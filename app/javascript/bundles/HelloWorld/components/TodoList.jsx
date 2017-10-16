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
    console.log("Мои пропсы в TodoList",this.props);
    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    // this.state = { text: "", counter: 0, allTodos: [] };
    // this.onDeleteTodo = this.onDeleteTodo.bind(this);
    // this.onChangeInput = this.onChangeInput.bind(this);
  }
  // componentDidMount() {
  //     console.log("componentDidMount : this.props -- ",this.props)
  //     this.setState({allTodos: this.props.allTodos});
  // }
  // onChangeInput = (text) => {
  //     this.setState({text: text});
  // }

  // addTodo = (e) => {
  //     e.preventDefault();
  //     // let counter;
  //     let count = this.state.counter;
  //     count++;
  //     this.setState({counter: count});
  //     let allTodos = this.state.allTodos;
  //     allTodos.push({user_id: this.state.counter, text: this.state.text, done: false});
  //     // console.log("this.state.todo",this.state.todo);
  //
  //     axios.post('/todos', {
  //         todo: {body: this.state.text, user_id: 1, done: false}
  //     })
  //         .then(function (response) {
  //             console.log(response);
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  //     this.setState({text: ""});
  // }
  //   onDeleteTodo (e) {
  //       console.log(e.target.id);
  //       let todo_id = e.target.id;
  //       let items = this.props.allTodos;
  //       items.map((item, key, items) => {
  //           if(item.id == todo_id) {
  //               items = items.splice(key,1);
  //               console.log("key---",key);
  //               this.setState({todo: items});
  //               axios.delete('/todos/' + item.id, {
  //                   todo: { id: item.id }
  //               })
  //           }
  //       })

    // }
  render() {
      // console.log("this.props.todoList",this.props.todoList);
      console.log("this.props.all_todos",this.props);
      // this.state.counter
    return (
      <div>
        <h3>
          {/*Hello, {this.state.text}!*/}
        </h3>
        <hr />
        {/*<form onSubmit={this.addTodo}>*/}
          {/*<label htmlFor="name">*/}
            {/*Say hello to:*/}
          {/*</label>*/}
          {/*<input*/}
            {/*id="name"*/}
            {/*type="text"*/}
            {/*value={this.state.text}*/}
            {/*onChange={(e) => this.onChangeInput(e.target.value)}*/}
          {/*/>*/}
            {/*<input type="submit" value="Add Todo"/>*/}
        {/*</form>*/}
          {/*{this.state.allTodos.map((item)=> {*/}
             {/*return (*/}
                 {/*<div>*/}
                     {/*<input type="checkbox" />*/}
                     {/*<span>{item.body}</span>*/}
                     {/*<button id={item.id} onClick={this.onDeleteTodo}>X</button>*/}
                 {/*</div>*/}
             {/*)*/}
          {/*})*/}
          {/*}*/}

          <Item data={this.props} />
      </div>
    );
  }
}
