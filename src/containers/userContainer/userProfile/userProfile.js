import React, { Component } from "react";
import { connect } from "react-redux";

import Icon from "@material-ui/core/Icon";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import "./userProfile.scss";
import * as actionCreators from "../../../store/actions/index";

class UserProfileContainer extends Component {
  state = {
    newCategory: "",
    newFriend: "",
    editCategory: false,
    editFriend: false
  };

  toggleFavCategories() {
    this.setState({
      editCategory: !this.state.editCategory
    });
  }

  toggleEditFriends() {
    this.setState({
      editFriend: !this.state.editFriend
    });
  }

  addCategoryHandler(event) {
    this.setState({
      newCategory: event.target.value
    });
  }

  addFriendHandler(event) {
    this.setState({
      newFriend: event.target.value
    });
  }

  render() {
    return (
      <div className="container userProfile">
        <div className="row">
          <img
            className="profile-pic"
            src={this.props.currUser.profilePic}
            alt="Not found"
          />
          <div className="profile-header">
            <span className="username">{this.props.currUser.name}</span>
            <br />
            <span>
              {this.props.currUser.email} ({this.props.currUser.role})
            </span>
          </div>
        </div>
        <div className="row">
          <div className="profile-category">Books In Hand</div>
          <ul>
            <li>{this.props.currUser.booksInHand.length}</li>
          </ul>
        </div>
        <div className="row">
          <div className="profile-category">Recommended Books</div>
          <ul>
            {this.props.currUser.recommends.map((recommendedBook, index) => {
              return <li key={index}>{recommendedBook}</li>;
            })}
            {this.props.currUser.recommends.length < 1 ? (
              <div>Your friends have not yet recommended any book for you.</div>
            ) : null}
          </ul>
        </div>
        <div className="row">
          <div className="profile-category">
            <div className="label">My Favourite Categories</div>
            {this.state.editCategory ? (
              <Icon className="edit" onClick={() => this.toggleFavCategories()}>
                done
              </Icon>
            ) : (
              <Icon className="edit" onClick={() => this.toggleFavCategories()}>
                edit
              </Icon>
            )}
          </div>
          {this.props.currUser.favCategories.length < 1 ? (
            <div className="emptyBox">
              You have not defined your favourite categories. Please add your
              favourite categories to help us better serve you.
            </div>
          ) : null}
          <ul>
            {this.props.currUser.favCategories.map((fav, index) => {
              return (
                <li key={index}>
                  {fav}
                  {this.state.editCategory ? (
                    <Icon
                      color="secondary"
                      className="delete"
                      onClick={() => this.props.deleteCategory(index)}
                    >
                      delete_sweep
                    </Icon>
                  ) : null}
                </li>
              );
            })}
            {this.state.editCategory ? (
              <li>
                <FormControl required>
                  <InputLabel htmlFor="component-simple">
                    Add Category
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.newCategory}
                    onChange={event => this.addCategoryHandler(event)}
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.props.addCategory(this.state.newCategory)}
                >
                  Add
                </Button>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="row">
          <div className="profile-category">
            <div className="label">My Friends</div>
            {this.state.editFriend ? (
              <Icon className="edit" onClick={() => this.toggleEditFriends()}>
                done
              </Icon>
            ) : (
              <Icon className="edit" onClick={() => this.toggleEditFriends()}>
                edit
              </Icon>
            )}
          </div>
          {this.props.currUser.friends.length < 1 ? (
            <div className="emptyBox">
              You have not added your friends. Please add friends to unleash the
              happiness of reading together :)
            </div>
          ) : null}
          <ul>
            {this.props.currUser.friends.map((friend, index) => {
              return (
                <li key={index}>
                  {friend}
                  {this.state.editFriend ? (
                    <Icon
                      color="secondary"
                      className="delete"
                      onClick={() => this.props.deleteFriend(index)}
                    >
                      delete_sweep
                    </Icon>
                  ) : null}
                </li>
              );
            })}
            {this.state.editFriend ? (
              <li>
                <FormControl required>
                  <InputLabel htmlFor="component-simple">Add Friend</InputLabel>
                  <Input
                    type="email"
                    id="component-simple"
                    value={this.state.newFriend}
                    onChange={event => this.addFriendHandler(event)}
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.props.addFriend(this.state.newFriend)}
                >
                  Add
                </Button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.currUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCategory: newCategory =>
      dispatch(actionCreators.addCategory(newCategory)),
    deleteCategory: index => dispatch(actionCreators.deleteCategory(index)),
    addFriend: newFriend => dispatch(actionCreators.addFriend(newFriend)),
    deleteFriend: index => dispatch(actionCreators.deleteFriend(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserProfileContainer
);
