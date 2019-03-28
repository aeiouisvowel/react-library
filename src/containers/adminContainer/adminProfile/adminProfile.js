import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import "./adminProfile.scss";

class AdminProfleContainer extends Component {
  render() {
    return (
      <section className="admin-profile">
        <div className="container">
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

          <div className="row actions">
            <div className="action">
              <Link to="/admin/add-book">
                <Button variant="outlined" color="primary">
                  <Icon className="animated infinite bounceIn">
                    arrow_forward_ios
                  </Icon>Add Book
                </Button>
              </Link>
            </div>
            <div className="action">
              <Link to="/admin/library">
                <Button variant="outlined" color="primary">
                  <Icon className="animated infinite bounceIn">
                    arrow_forward_ios
                  </Icon>Check Library
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.currUser
  };
};

export default withRouter(connect(mapStateToProps, null)(AdminProfleContainer));
