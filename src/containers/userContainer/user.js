import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link, Switch, withRouter, Redirect } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

import "./user.scss";
import * as actionCreators from "../../store/actions/index";
import UserProfileContainer from "./userProfile/userProfile";
import MyBooksContainer from "./myBooks/myBooks";
import SearchBooksContainer from "./searchBooks/searchBooks";

class UserContainer extends Component {
  render() {
    return (
      <section>
        <nav>
          <div className="navItems">
            <ul>
              <li>
                <Link to="/user">Home</Link>
              </li>
              <li>
                <Link to="/user/my-book">My Books</Link>
              </li>
              <li>
                <Link to="/user/search-book">Search Books</Link>
              </li>
            </ul>
          </div>
          <div className="logout">
            {this.props.currUser.name}
            <Icon color="secondary" onClick={() => this.props.logout(this.props.history)}>exit_to_app</Icon>
          </div>
        </nav>
        <Switch>
          <Route path="/user/my-book" component={MyBooksContainer} />
          <Route path="/user/search-book" component={SearchBooksContainer} />
          <Route path="/user" exact component={UserProfileContainer} />
          <Redirect to="/user" />
        </Switch>
      </section>
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
    logout: (routeTo) => dispatch(actionCreators.signOut(routeTo))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserContainer)
);
