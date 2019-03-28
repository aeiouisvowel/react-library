import React, { Component } from "react";
import { connect } from "react-redux";

import AuthComponent from "./../../components/authComponent/authComponent";
import * as actionCreators from "../../store/actions/index";

class HomeContainer extends Component {

  render() {
    return (
      <section>
        <AuthComponent clicked={() => this.props.googleSignIn(this.props.history)} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    currUserRole: state.currUserRole
  };
};

const mapDispatchToProps = dispatch => {
  return {
    googleSignIn: (routeTo) => dispatch(actionCreators.googleSignIn(routeTo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
