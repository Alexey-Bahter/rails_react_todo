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
    }

    render() {
        console.log("this.props.data.todoList -- ",this.props.data.todoList);
        let item = this.props.data.todoList;
         item = item.map((item) => {
           return (<div>
                    <input type="checkbox" />
                    <span>{item.text}</span>
                    <button>X</button>
           </div>)
        });
        return (
            <div>
                {item}
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
