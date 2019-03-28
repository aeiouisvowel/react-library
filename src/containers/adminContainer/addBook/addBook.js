import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import axios from "axios";

import "./addBook.scss";

import Book from "../../../model/book.model";

import * as actionCreators from "../../../store/actions/index";

class AddBookContainer extends Component {
  state = {
    book: {},
    isbnToSearch: "",
    notValidForm: true,
    disableIsbn10: false,
    disableIsbn13: false,
    disableIfIsbnFound: false
  };

  spanStyle = {
    color: "red"
  };

  componentDidMount() {
    document.getElementById("errorId").style.display = "none";
    let newbook = new Book();
    newbook.bookId = this.props.lastUsedBookId;
    this.setState({ book: newbook });
  }

  isbnToSearchChangeHandler = event => {
    this.setState({ isbnToSearch: event.target.value });
  };

  searchByIsbn = () => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
          this.state.isbnToSearch
      )
      .then(res => {
        if (res.data.totalItems > 0) {
          let tempBook = { ...this.state.book };
          tempBook.title = res.data.items[0].volumeInfo.title;
          tempBook.author = res.data.items[0].volumeInfo.authors[0];
          this.setState({ disableIfIsbnFound: true });
          for (const isbnType of res.data.items[0].volumeInfo
            .industryIdentifiers) {
            if (isbnType.type === "ISBN_10") {
              tempBook.isbn10 = isbnType.identifier;
              this.setState({ disableIsbn10: true });
              this.setState({ disableIsbn13: false });
            } else {
              tempBook.isbn13 = isbnType.identifier;
              this.setState({ disableIsbn13: true });
              this.setState({ disableIsbn10: false });
            }
          }
          if (res.data.items[0].volumeInfo.imageLinks) {
            tempBook.thumbnail =
              res.data.items[0].volumeInfo.imageLinks.thumbnail;
          }
          tempBook.description = res.data.items[0].volumeInfo.description;
          this.setState({ book: tempBook });
          document.getElementById("errorId").style.display = "none";
        } else {
          this.setState({
            disableIsbn10: false,
            disableIsbn13: false,
            disableIfIsbnFound: false
          });
          document.getElementById("errorId").style.display = "block";
        }
      })
      .catch(err => {
        document.getElementById("errorId").style.display = "block";
      });
  };

  inputChangeHandler = (field, event) => {
    let tempBook = { ...this.state.book };
    tempBook[field] = event.target.value;
    this.setState({ book: tempBook });
    if (event.target.value !== "") {
      this.checkFormValidation(field);
    } else {
      this.setState({ notValidForm: true });
    }
  };

  checkFormValidation = fieldToIgnore => {
    let fieldsToValidate = [
      "title",
      "author",
      "genre",
      "location",
      "description"
    ];
    for (const field of fieldsToValidate) {
      if (field !== fieldToIgnore) {
        if (this.state.book[field] === "") {
          this.setState({ notValidForm: true });
          return;
        }
      }
    }
    this.setState({ notValidForm: false });
  };

  editBookHandler = event => {
    event.preventDefault();
    let books = [...this.props.bookDetails];
    books.push(this.state.book);
    this.props.updateLibraryBooks(books);
    this.props.history.push("/admin/library");
  };

  render() {
    return (
      <section>
        <div className="container">
          <div className="row isbnSearch">
            <input
              type="text"
              name="ISBN"
              id="ISBN"
              value={this.state.isbnToSearch}
              onChange={event => this.isbnToSearchChangeHandler(event)}
              placeholder="Search By Isbn"
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={this.searchByIsbn}
            >
              <Icon>search</Icon>
            </Button>
          </div>
          <div className="row error-Id" id="errorId">
            <label className="error-msg">Not found</label>
          </div>
        </div>

        <form onSubmit={this.editBookHandler}>
          <div className="container">
            <div className="row">
              <label htmlFor="title">
                Title<span style={this.spanStyle}>*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.book.title}
                disabled={this.state.disableIfIsbnFound}
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
                disabled={this.state.disableIfIsbnFound}
                onChange={event => this.inputChangeHandler("author", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="isbn10">ISBN 10</label>
              <input
                name="isbn10"
                id="isbn10"
                value={this.state.book.isbn10}
                disabled={this.state.disableIsbn10}
                onChange={event => this.inputChangeHandler("isbn10", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="isbn13">ISBN 13</label>
              <input
                name="isbn13"
                id="isbn13"
                value={this.state.book.isbn13}
                disabled={this.state.disableIsbn10}
                onChange={event => this.inputChangeHandler("isbn13", event)}
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
                onChange={event => this.inputChangeHandler("genre", event)}
              />
            </div>
            <div className="row">
              <label htmlFor="thumbnail">Thumbnail</label>
              <input
                name="thumbnail"
                id="thumbnail"
                value={this.state.book.thumbnail}
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
                onChange={event =>
                  this.inputChangeHandler("description", event)}
              />
            </div>
          </div>

          <Button
            variant="outlined"
            color="primary"
            onClick={this.editBookHandler}
            disabled={this.state.notValidForm}
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
    bookDetails: state.bookLibrary,
    lastUsedBookId: state.lastUsedBookId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLibraryBooks: books =>
      dispatch(actionCreators.updateLibraryBooks(books))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookContainer);
