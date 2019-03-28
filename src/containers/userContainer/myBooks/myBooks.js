import React, { Component } from "react";
import { connect } from "react-redux";

import BookContainer from "../../bookContainer/bookContainer";

class MyBooksContainer extends Component {
  state = {
    filter: "title",
    bookDetails: []
  };

  componentDidMount() {
    let userBookDetails = [];
    for (const book of this.props.currUser.booksInHand){
      for (const libBook of this.props.bookDetails){
        if (book.bookId === libBook.bookId){
          userBookDetails.push(libBook);
          break;
        }
      }
    }
    this.setState({ bookDetails: userBookDetails });
  }

  render() {
    return (
      <section>
        <div className="container">
          {this.state.bookDetails.map((book, index) => {
            return <BookContainer bookInfo={book} key={index} />;
          })}
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

export default connect(mapStateToProps, null)(MyBooksContainer);
