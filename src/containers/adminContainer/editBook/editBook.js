import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import "./editBook.scss";

import * as actionCreators from "../../../store/actions/index";

class EditBookContainer extends Component {
  state = {
    book: {},
    isValidForm: true
  };

  componentDidMount() {
    let books = [...this.props.bookDetails];
    for (const book of books) {
      if (book.bookId.toString() === this.props.match.params.id) {
        this.setState({ book: book });
        break;
      }
    }
  }

  spanStyle = {
    color: "red"
  };

  inputChangeHandler = (field, event) => {
    let tempBook = { ...this.state.book };
    tempBook[field] = event.target.value;
    this.setState({ book: tempBook });
    if (event.target.value === "") {
      this.setState({ isValidForm: false });
    } else {
      this.setState({ isValidForm: true });
    }
  };

  editBookHandler = event => {
    event.preventDefault();
    let books = [...this.props.bookDetails];
    for (let bookIndex in books) {
      if (books[bookIndex].bookId === this.state.book.bookId) {
        books[bookIndex] = this.state.book;
      }
    }
    this.props.updateLibraryBooks(books);
    this.props.history.push("/admin/library");
  };

  render() {
    return (
      <section>
        <form onSubmit={this.editBookHandler}>
          <div className="container">
            <div className="row">
              <label htmlFor="id">ID</label>
              <span>{this.state.book.bookId}</span>
            </div>
            <div className="row">
              <label htmlFor="title">
                Title<span style={this.spanStyle}>*</span>
              </label>
              <input
                name="title"
                id="title"
                value={this.state.book.title}
                required
                onChange={event => this.inputChangeHandler("title", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="author">
                Author<span style={this.spanStyle}>*</span>
              </label>
              <input
                name="author"
                id="author"
                value={this.state.book.author}
                required
                onChange={event => this.inputChangeHandler("author", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="isbn">
                ISBN<span style={this.spanStyle}>*</span>
              </label>
              <input
                name="isbn"
                id="isbn"
                value={this.state.book.isbn10}
                required
                onChange={event => this.inputChangeHandler("isbn10", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="genre">
                Genre<span style={this.spanStyle}>*</span>
              </label>
              <input
                name="genre"
                id="genre"
                value={this.state.book.genre}
                required
                onChange={event => this.inputChangeHandler("genre", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="thumbnail">
                Thumbnail<span style={this.spanStyle}>*</span>
              </label>
              <input
                name="thumbnail"
                id="thumbnail"
                value={this.state.book.thumbnail}
                required
                onChange={event => this.inputChangeHandler("thumbnail", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="location">
                Location<span style={this.spanStyle}>*</span>
              </label>
              <input
                name="location"
                id="location"
                value={this.state.book.location}
                required
                onChange={event => this.inputChangeHandler("location", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="description">
                Description<span style={this.spanStyle}>*</span>
              </label>
              <textarea
                rows={2}
                name="description"
                id="description"
                value={this.state.book.description}
                required
                onChange={event =>
                  this.inputChangeHandler("description", event)}
              />
            </div>
          </div>

          <Button
            variant="outlined"
            color="primary"
            onClick={this.editBookHandler}
            disabled={!this.state.isValidForm}
          >
            Submit
          </Button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBookContainer);
