import React, { Component } from "react";
import { connect } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

import "./searchBooks.scss";

import BookContainer from "../../bookContainer/bookContainer";

class SearchBooksContainer extends Component {
  state = {
    filterBy: "",
    filterValue: "",
    bookDetails: []
  };

  componentDidMount() {
    this.setState({ bookDetails: this.props.bookDetails });
  }

  filterChangeHandler = name => event => {
    this.setState({
      [name]: event.target.value,
      filterValue: ""
    });
  };

  InputfilterValueChangeHandler = event => {
    let filterBooks = [];
    let re = new RegExp(event.target.value, "gi");
    for (const book of this.props.bookDetails) {
      if (book[this.state.filterBy].match(re) !== null) {
        filterBooks.push(book);
      }
    }
    this.setState({
      filterValue: event.target.value,
      bookDetails: filterBooks
    });
  };

  filterItemChangeHandler = name => event => {
    let filterBooks = [];
    let re = new RegExp(event.target.value, "gi");
    for (const book of this.props.bookDetails) {
      if (book[this.state.filterBy].match(re) !== null) {
        filterBooks.push(book);
      }
    }
    this.setState({
      [name]: event.target.value,
      bookDetails: filterBooks
    });
  };

  render() {
    let filterByItem = null;

    if (this.state.filterBy === "title") {
      filterByItem = (
        <FormControl className="filterBySelect">
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title-id"
            value={this.state.filterValue}
            onChange={this.InputfilterValueChangeHandler}
          />
        </FormControl>
      );
    } else if (this.state.filterBy === "author") {
      filterByItem = (
        <FormControl className="filterBySelect">
          <InputLabel htmlFor="author">Author</InputLabel>
          <Input
            id="auther-id"
            value={this.state.filterValue}
            onChange={this.InputfilterValueChangeHandler}
          />
        </FormControl>
      );
    } else if (this.state.filterBy === "genre") {
      filterByItem = (
        <FormControl className="filterBySelect">
          <InputLabel htmlFor="rate-simple">Filter</InputLabel>
          <Select
            value={this.state.filterValue}
            onChange={this.filterItemChangeHandler("filterValue")}
            inputProps={{
              name: "filterValue",
              id: "filterValue-simple"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Fiction"}>Fiction</MenuItem>
            <MenuItem value={"Non Fiction"}>Non Fiction</MenuItem>
            <MenuItem value={"Adventure"}>Adventure</MenuItem>
            <MenuItem value={"Horror"}>Horror</MenuItem>
            <MenuItem value={"Mystery"}>Mystery</MenuItem>
            <MenuItem value={"Action"}>Action</MenuItem>
            <MenuItem value={"Motivational"}>Motivational</MenuItem>
          </Select>
        </FormControl>
      );
    } else {
      filterByItem = null;
    }

    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <FormControl className="filterBySelect">
                <InputLabel htmlFor="rate-simple">Filter</InputLabel>
                <Select
                  value={this.state.filterBy}
                  onChange={this.filterChangeHandler("filterBy")}
                  inputProps={{
                    name: "filterBy",
                    id: "filter-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"title"}>Book Title</MenuItem>
                  <MenuItem value={"author"}>Author</MenuItem>
                  <MenuItem value={"genre"}>Category</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-sm-6">{filterByItem}</div>
          </div>
        </div>
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
    bookDetails: state.bookLibrary
  };
};

export default connect(mapStateToProps, null)(SearchBooksContainer);
