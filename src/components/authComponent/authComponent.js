import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import './authComponent.scss';

const authComponent = props => (
  <div>
    <p>library is not a luxury but one of the necessities of life</p>
    <div className="signin">
      <Button
        variant="outlined"
        color="primary"
        onClick={props.clicked}
      >
        <Icon className="animated infinite bounceIn">
          arrow_forward_ios
        </Icon>Sign in with Google
      </Button>
    </div>
  </div>
);

export default authComponent;
