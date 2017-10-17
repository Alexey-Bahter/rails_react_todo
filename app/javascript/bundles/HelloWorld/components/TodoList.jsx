import axios from 'axios'
import React from 'react';
import Item from './Item'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    console.log("Мои пропсы в TodoList",this.props);
      this.state = {pager: {}, pageOfItems: [],}

      this.onChangePage = this.onChangePage.bind(this);
  }
    componentWillMount() {
        if (this.props.allTodos && this.props.allTodos.length) {
            this.setPage(this.props.initialPage);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.allneallTodosws !== prevProps.allTodos) {
            this.setPage(this.props.initialPage);
        }
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    setPage(page) {
        let items = this.props.allTodos;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }
        // get new pager object for specified page
        pager = this.getPager(items.length, page);
        // get new page of items from items array

        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        // update state
        this.setState({ pager: pager });
        // call change page function in parent component
        this.onChangePage(pageOfItems);
    }
    rangeArr (startPage, endPage) {
      return [startPage, endPage];
    }
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        pageSize = pageSize || 5;
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;
        if (totalPages <= 5) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        let pages = this.rangeArr(startPage, endPage + 1);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
  render() {
      let pager = this.state.pager;
      if (!pager.pages || pager.pages.length <= 1) {
          // don't display pager if there is only 1 page
          return null;
      }
    return (
      <div>
        <hr />
          <Item data={this.props} />
          <div className="pagination-block">
              <ul className="pagination">
                  <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                      <a onClick={() => this.setPage(1)}>First</a>
                  </li>
                  <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                      <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                  </li>
                  {pager.pages.map((page, index) =>
                      <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                          <a onClick={() => this.setPage(page)}>{page}</a>
                      </li>
                  )}
                  <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                      <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                  </li>
                  <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                      <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                  </li>
              </ul>
          </div>
      </div>
    );
  }
}
