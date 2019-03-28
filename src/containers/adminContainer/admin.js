import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link, Switch, withRouter, Redirect } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

import './admin.scss';

import * as actionCreators from "../../store/actions/index";

import AdminProfleContainer from "./adminProfile/adminProfile";
import AddBookContainer from "./addBook/addBook";
import EditBookContainer from "./editBook/editBook";
import libraryContainer from "./library/library";

class AdminContainer extends Component {
  render() {
    return (
      <section>
        <nav>
          <div className="navItems">
            <ul>
              <li>
                <Link to="/admin">Home</Link>
              </li>
              <li>
                <Link to="/admin/library">Library</Link>
              </li>
              <li>
                <Link to="/admin/add-book">Add Book</Link>
              </li>
            </ul>
          </div>
          <div className="logout">
            {this.props.currUser.name}
            <Icon
              color="secondary"
              onClick={() => this.props.logout(this.props.history)}
            >
              exit_to_app
            </Icon>
          </div>
        </nav>
        <Switch>
          <Route path="/admin/add-book" component={AddBookContainer} />
          <Route path="/admin/edit-book/:id" component={EditBookContainer} />
          <Route path="/admin/library" component={libraryContainer} />
          <Route path="/admin" exact component={AdminProfleContainer} />
          <Redirect to="/admin" />
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
    logout: routeTo => dispatch(actionCreators.signOut(routeTo))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
);
