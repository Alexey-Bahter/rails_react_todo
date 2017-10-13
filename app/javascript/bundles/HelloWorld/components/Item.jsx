import PropTypes from 'prop-types';
import React from 'react';


export default class Item extends React.Component {
    static propTypes = {
        // name: PropTypes.string.isRequired, // this is passed from the Rails view
    };

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        // this.state = { name: this.props.name };
        this.onDeleteTodo = this.onDeleteTodo.bind(this);
    }
    onDeleteTodo (e) {
        console.log(e.target.id);
        let id_item = e.target.id;
        let items = this.props.data.todoList;
        items.map((item, key, items) => {
            if(item.user_id == id_item) {
                items = items.splice(key,1);
                console.log("ysvdhasbdjasbd");
                this.setState({todo: items});
            }
        })
    }
    render() {
        console.log("this.props.data.todoList -- ",this.props.data.todoList);
        let items = this.props.data.todoList;
         items = items.map((item,key) => {
           return (<div>
                    <input type="checkbox" />
                    <span>{item.text}</span>
                    <button id={item.user_id} onClick={this.onDeleteTodo}>X</button>
           </div>)
        });
        return (
            <div>
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
