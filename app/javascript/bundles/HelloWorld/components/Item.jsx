import axios from 'axios'
import React from 'react';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        console.log("My props in Item Component", this.props)
        this.state = { text: "", changeText: "", counter: 0, allTodos: [], editing: false };

        this.focusTextInput = this.focusTextInput.bind(this);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeInputTodo = this.onChangeInputTodo.bind(this);
        this.onDeleteTodo = this.onDeleteTodo.bind(this);
        this.onCheckboxTodo = this.onCheckboxTodo.bind(this);
        this.editTextTodo = this.editTextTodo.bind(this);
        this.saveEditTextTodo = this.saveEditTextTodo.bind(this);
    }
    focusTextInput() {
        // Explicitly focus the text input using the raw DOM API
        this.textInput.focus();
    }
    componentDidMount() {
        this.setState({allTodos: this.props.data.allTodos});
    }
    componentWillMount() {
        this.setState({allTodos: this.props.data.allTodos});
    }
    onChangeInput = (text) => {
        this.setState({text: text});
    };
    onChangeInputTodo = (text) => {
        this.setState({changeText: text});
    };
    addTodo = () => {
        if (this.state.text) {
            let allTodos = this.state.allTodos;
            allTodos.push({user_id: this.state.counter, body: this.state.text, done: false});

            axios.post('/todos', {
                todo: {body: this.state.text, user_id: 1, done: false}
            }).then(function (response) {
                console.log("response : Item",response);
            }).catch(function (error) {
                console.log(error);
            });

            this.setState({text: ""});
        }
    };
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
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
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

                axios.put('/todos/' + id, {
                    todo: {done: item.done}
                }).then(function (response) {
                    console.log("response : Item",response);
                }).catch(function (error) {
                    console.log(error);
                });
            }
            return item
        });
        this.setState({ allTodos: newTodos });
    };
    editTextTodo (e) {
        let idInputTodo = e.target.id;
        let items = this.state.allTodos;

        items.forEach((item, key, items) => {
            if (idInputTodo == item.id) {
                e.target.removeAttribute("readonly");
                e.target.setAttribute("value", this.state.changeText);
                // e.target.setAttribute("onblur", this.saveEditTextTodo);
            }
        });
        this.setState({editing: true});
    }
    saveEditTextTodo(e) {
        let idInputTodo =  e.target.id;
        let items = this.state.allTodos;

        if(this.state.editing) {
            this.setState({allTodos: this.props.data.allTodos});
            e.target.value = this.state.changeText;
            items.forEach((item, key, items) => {
                if (idInputTodo == item.id) {
                    item.body = this.state.changeText;
                    e.target.setAttribute("readonly", "");
                    e.target.setAttribute("defaultvalue", this.state.changeText);
                    e.target.removeAttribute("value");

                    axios.put('/todos/' + idInputTodo, {
                        todo: {body: item.body}
                    }).then(function (response) {
                        console.log("response : Item",response);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            });
            console.log("this.state.allTodos", this.state.allTodos);
        }
        this.setState({editing: false});
    }
    render() {
        // console.log("this.props", this.props);
        let items = this.state.allTodos;
         items = items.map((item,key) => {
           return (<div key={key}>
                    <input id={item.id} onChange={this.onCheckboxTodo} type="checkbox" defaultChecked={item.done === true ? "checked" : ""}/>
                    <input
                        id={item.id}
                        type="text"
                        defaultValue={item.body}
                        ref={(input) => { this.editInput = input; }}
                        onDoubleClick={this.editTextTodo}
                        onChange={(e) => this.onChangeInputTodo(e.target.value)}
                        placeholder={item.body}
                        // onFocus={}
                        onBlur={this.saveEditTextTodo}
                        readOnly/>
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
