import React, { Component } from "react";
import { connect } from "react-redux";

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import BookComponent from "../../components/bookComponent/bookComponent";
import * as actionCreators from "../../store/actions/index";

class BookContainer extends Component {
  state = {
    data: {
      textareaValue: "",
      value: 1,
      rate: 1,
      disableBookRenew: false
    },
    maxBook: 5,
    open: false,
    bookDetails: []
  };

  componentDidMount() {
    this.setState({ bookDetails: this.props.bookDetails });
    let userBooks = [...this.props.currUser.booksInHand];
    for (const book of userBooks) {
      if (book.bookId === this.props.bookInfo.bookId) {
        let data = { ...this.state.data };
        if (book.renewed === 0) {
          data.disableBookRenew = false;
          this.setState({ data: data });
        } else {
          data.disableBookRenew = true;
          this.setState({ data: data });
        }
      }
    }
  }

  handleChange = (event, value) => {
    let data = { ...this.state.data };
    data.value = value;
    this.setState({ data: data });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  textAreaHandler = event => {
    let data = { ...this.state.data };
    data.textareaValue = event.target.value;
    this.setState({ data: data });
  };

  rateChangeHandler = event => {
    let data = { ...this.state.data };
    data.rate = event.target.value;
    this.setState({ data: data });
  };

  addReview = () => {
    let books = [...this.state.bookDetails];
    for (const book of books) {
      if (book.bookId === this.props.bookInfo.bookId) {
        book.reviews.push({
          reviewBy: this.props.currUser.name,
          rating: this.state.data.rate,
          comment: this.state.data.textareaValue
        });
        book.avgRating.rating =
          (book.avgRating.rating * book.avgRating.givenBy +
            this.state.data.rate) /
          (book.avgRating.givenBy + 1);
        book.avgRating.givenBy += 1;
      }
    }
    this.props.updateLibraryBooks(books);
  };

  issueBook = () => {
    if (this.props.currUser.booksInHand.length < this.state.maxBook) {
      let books = [...this.state.bookDetails];
      for (const book of books) {
        if (book.bookId === this.props.bookInfo.bookId) {
          book.availability.issuedTo = this.props.currUser.email;
          const date = new Date();
          book.availability.issuedDate =
            date.getMonth() +
            1 +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear();
          date.setDate(date.getDate() + 14);
          book.availability.availableBy =
            date.getMonth() +
            1 +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear();
          this.props.currUser.booksInHand.push({
            bookId: book.bookId,
            renewed: 0
          });
        }
      }
      this.props.updateLibraryBooks(books);
      this.props.updateUserData(this.props.currUser);
    } else {
      this.openSnackbarHandler();
    }
  };

  renewBook = () => {
    let books = [...this.state.bookDetails];
    for (const book of books) {
      if (book.bookId === this.props.bookInfo.bookId) {
        const availableByDateArray = book.availability.availableBy.split("/");
        const currAvailableMonth = parseInt(availableByDateArray[0], 10);
        const currAvailableDate = parseInt(availableByDateArray[1], 10);
        const currAvailableYear = parseInt(availableByDateArray[2], 10);
        const currEndDate = new Date(
          currAvailableYear,
          currAvailableMonth - 1,
          currAvailableDate
        );
        currEndDate.setDate(currEndDate.getDate() + 14);
        book.availability.availableBy =
          currEndDate.getMonth() +
          1 +
          "/" +
          currEndDate.getDate() +
          "/" +
          currEndDate.getFullYear();
        for (const userBook of this.props.currUser.booksInHand) {
          if (userBook.bookId === this.props.bookInfo.bookId) {
            userBook.renewed = 1;
          }
        }
        this.props.updateUserData(this.props.currUser);
        let data = { ...this.state.data };
        data.disableBookRenew = true;
        this.setState({ data: data });
      }
    }
  };

  returnBook = () => {
    let books = [...this.state.bookDetails];
    for (const book of books) {
      if (book.bookId === this.props.bookInfo.bookId) {
        book.availability.issuedTo = "";
        book.availability.availableBy = "Available";
        book.availability.issuedDate = "";
      }
    }
    for (let i = 0; i <= this.props.currUser.booksInHand.length - 1; i++) {
      if (
        this.props.currUser.booksInHand[i].bookId === this.props.bookInfo.bookId
      ) {
        this.props.currUser.booksInHand.splice(i, 1);
      }
    }
    this.props.updateLibraryBooks(books);
    this.props.updateUserData(this.props.currUser);
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  openSnackbarHandler = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <section>
        <div className="container">
          <BookComponent
            state={this.state.data}
            hc={this.handleChange}
            hci={this.handleChangeIndex}
            hcTextfield={this.textAreaHandler}
            hcrate={this.rateChangeHandler}
            hcSubmitReview={this.addReview}
            hcSubmitIssue={this.issueBook}
            hcSubmitRenew={this.renewBook}
            hcSubmitReturn={this.returnBook}
            bookDetails={this.props.bookInfo}
            disableBookIssue={
              this.props.bookInfo.availability.issuedTo ? true : false
            }
            disableRenewReturn={
              this.props.bookInfo.availability.issuedTo ===
              this.props.currUser.email
                ? true
                : false
            }
            disableBookRenew={this.state.data.disableBookRenew}
          />
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">You have exceeded the maximum number of book to be borrowed by a single user</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookDetails: state.bookLibrary,
    currUser: state.currUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: user => dispatch(actionCreators.updateUser(user)),
    updateLibraryBooks: books =>
      dispatch(actionCreators.updateLibraryBooks(books))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookContainer);
