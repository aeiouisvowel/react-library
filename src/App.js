import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import "./App.scss";

import * as actionCreators from './store/actions/index';

import HomeContainer from "./containers/homeContainer/homeContainer";
import UserContainer from "./containers/userContainer/user";
import AdminContainer from "./containers/adminContainer/admin";

class App extends Component {
  componentDidMount() {
    this.props.loadLibrary();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      if (this.props.currUserRole === "user") {
        routes = (
          <Switch>
            <Route path="/user" component={UserContainer} />
            <Route path="/" exact component={HomeContainer} />
            <Redirect to="/" />
          </Switch>
        );
      } else {
        routes = (
          <Switch>
            <Route path="/admin" component={AdminContainer} />
            <Route path="/" exact component={HomeContainer} />
            <Redirect to="/" />
          </Switch>
        );
      }

      routes = (
        <Switch>
          <Route path="/user" component={UserContainer} />
          <Route path="/admin" component={AdminContainer} />
          <Route path="/" exact component={HomeContainer} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar className="header-nav">Anytime Library</Toolbar>
        </AppBar>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    currUserRole: state.currUserRole
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLibrary: () => dispatch(actionCreators.loadLibrary())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
