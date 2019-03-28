import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import ReactTable from "react-table";

import "./library.scss";
import "react-table/react-table.css";

import * as actionCreators from "../../../store/actions/index";

class libraryContainer extends Component {
  state = {
    checkedA: false,
    data: []
  };

  componentDidMount() {
    this.setState({ data: this.props.bookDetails });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    if (event.target.checked) {
      let borrowedBooks = [];
      let books = [...this.props.bookDetails];
      for (const book of books) {
        if (book.availability.issuedTo !== "") {
          borrowedBooks.push(book);
        }
      }
      this.setState({ data: borrowedBooks });
    } else {
      this.setState({ data: this.props.bookDetails });
    }
  };

  deleteBook = bookId => {
    let books = [...this.props.bookDetails];
    for (const bookIndex in books) {
      if (books[bookIndex].bookId === bookId) {
        books.splice(bookIndex, 1);
        break;
      }
    }
    this.setState({ data: books });
    this.props.updateLibraryBooks(books);
  };

  render() {
    return (
      <section>
        <div className="getUserBooks">
          <Switch
            checked={this.state.checkedA}
            onChange={this.handleChange("checkedA")}
            value="checkedA"
          />{" "}
          Only show borrowed books
        </div>

        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Action",
              Cell: props => (
                <span>
                  <Link to={"/admin/edit-book/" + props.original.bookId}>
                    <Button color="primary">
                      <Icon>border_color</Icon>
                    </Button>
                  </Link>
                  <Button
                    color="secondary"
                    onClick={() => this.deleteBook(props.original.bookId)}
                  >
                    <Icon>delete_forever</Icon>
                  </Button>
                </span>
              )
            },
            {
              Header: "ID",
              accessor: "bookId"
            },
            {
              Header: "Title",
              accessor: "title"
            },
            {
              Header: "Author",
              accessor: "author"
            },
            {
              id: "borrowedBy",
              Header: "Borrowed By",
              accessor: d => d.availability.issuedTo
            },
            {
              id: "issuedOn",
              Header: "Issued On",
              accessor: d => d.availability.issuedDate
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookDetails: state.bookLibrary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLibraryBooks: books =>
      dispatch(actionCreators.updateLibraryBooks(books))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(libraryContainer)
);
