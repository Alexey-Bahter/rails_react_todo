import axios from 'axios'
import React from 'react';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        console.log("My props in Item Component", this.props)
        this.state = { text: "", counter: 0, allTodos: [] };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onDeleteTodo = this.onDeleteTodo.bind(this);
        this.onCheckboxTodo = this.onCheckboxTodo.bind(this);
    }
    componentDidMount() {
        console.log("componentDidMount : this.props -- ",this.props)
        this.setState({allTodos: this.props.data.allTodos});
        console.log("--1--this.props.data.allTodos",this.props.data.allTodos)
    }
    componentWillMount() {
        console.log("componentDidMount : this.props -- ",this.props)
        this.setState({allTodos: this.props.data.allTodos});
        console.log("--1--this.props.data.allTodos",this.props.data.allTodos)
    }
    onChangeInput = (text) => {
        this.setState({text: text});
    }
    addTodo = (e) => {
        // e.preventDefault();
        // let counter;
        // let count = this.state.counter;
        // count++;
        // this.setState({counter: count});
        // this.setState((prevState, props) => ({
        //     counter: prevState.counter + lastId + 1
        // }));
        let allTodos = this.state.allTodos;
        allTodos.push({user_id: this.state.counter, body: this.state.text, done: false});
        // console.log("this.state.todo",this.state.todo);

        axios.post('/todos', {
            todo: {body: this.state.text, user_id: 1, done: false}
        })
            .then(function (response) {
                console.log("response : Item",response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({text: ""});
        console.log("--2--this.state.allTodos",this.state.allTodos)
    }

    onDeleteTodo (e) {
        console.log(e.target.id);
        let todo_id = e.target.id;
        let items = this.state.allTodos;
        items.map((item, key, items) => {
            if(item.id == todo_id) {
                items = items.splice(key,1);
                console.log("ysvdhasbdjasbd");
                this.setState({todo: items});
                axios.delete('/todos/' + item.id, {
                    todo: {body: this.state.text, user_id: 1, done: false}
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })
    }
    onCheckboxTodo(e){
        console.log(e.target.id);
        let id = e.target.id;
        let newTodos = this.state.allTodos.map((item) => {
            if (item.id == id) {
                item.done = !item.done;
            }
            return item
        });
        this.setState({ allTodos: newTodos });
        console.log("  onCheckboxTodo  :  this.state.allTodos", this.state.allTodos);

        axios.put('/todos/' + id, {
            todo: {done: true}
            }).then(function (response) {
                console.log("response : Item",response);
            }).catch(function (error) {
                console.log(error);
        });
    };
    render() {
        // console.log("this.props", this.props);
        let items = this.state.allTodos;
         items = items.map((item,key) => {
           return (<div key={key}>
                    <input id={item.id} onChange={this.onCheckboxTodo} type="checkbox" defaultChecked={item.done === true ? "checked" : ""}/>
                    <span>{item.body}</span>
                    <button id={item.id} onClick={this.onDeleteTodo}>X</button>
           </div>)
        });
        return (
            <div>
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
                {items}
            </div>
        );
    }
}

// import React from 'react'
//
// export const Item = ({ news }) => (
//     <div className='post'>
//        I'm stupid component :(
//     </div>
//
// )
//
// export default Item
