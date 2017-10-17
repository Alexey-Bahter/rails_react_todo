import axios from 'axios'
import React from 'react';
import Item from './Item'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    console.log("Мои пропсы в TodoList",this.props);
  }
  render() {
    return (
      <div>
        <hr />
          <Item data={this.props} />
      </div>
    );
  }
}
