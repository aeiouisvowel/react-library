import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./bookComponent.scss";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const textFieldValueChange = textFieldValueChangeHandler => event => {
  event.persist();
  x.textAreaEventHandler(event);
};

const x = {};

const bookComponent = props => {
  x.textAreaEventHandler = props.hcTextfield;
  return (
    <div className="bookComponent">
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className="book">
            <div className="row">
              <img
                className="thumbnail"
                src={props.bookDetails.thumbnail}
                alt="Not Found"
              />
              <div className="book-header">
                <span className="book-title">{props.bookDetails.title}</span>
                <br />
                <span>{props.bookDetails.author}</span>
              </div>
            </div>
            <div className="row">
              <div className="label">Book ID : </div>
              <div className="value">{props.bookDetails.bookId}</div>
            </div>
            <div className="row">
              <div className="label">ISBN : </div>
              <div className="value">{props.bookDetails.isbn10}</div>
            </div>
            <div className="row">
              <div className="label">Avg Rating : </div>
              <div className="value">
                {props.bookDetails.avgRating.rating} ({props.bookDetails.avgRating.givenBy})
              </div>
            </div>
            <div className="row">
              <div className="label">Genre : </div>
              <div className="value">{props.bookDetails.genre}</div>
            </div>
            <div className="row">
              <div className="label">Description : </div>
              <div className="value">{props.bookDetails.description}</div>
            </div>
            <div className="row">
              <div className="label">Availability : </div>
              <div className="value">
                {props.bookDetails.availability.availableBy}
              </div>
            </div>
            <div className="row">
              <div className="label">Current Owner : </div>
              <div className="value">
                {props.bookDetails.availability.issuedTo}
              </div>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <AppBar position="static" color="default">
              <Tabs
                value={props.state.value}
                onChange={props.hc}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Like and Review" />
                <Tab label="Issue Book" />
                <Tab label="Renew / Return" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={"x-reverse"}
              index={props.state.value}
              onChangeIndex={props.hci}
            >
              <TabContainer dir={"ltr"}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-7">
                      <TextField
                        id="outlined-full-width"
                        label="Comment"
                        style={{ margin: 8 }}
                        placeholder="Your Review"
                        value={props.state.textareaValue}
                        onChange={textFieldValueChange(
                          "textFieldValueChangeHandler"
                        )}
                        multiline
                        rows="2"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <FormControl className="selectRate">
                        <Select
                          value={props.state.rate}
                          onChange={(event) => props.hcrate(event)}
                          inputProps={{
                            name: "rate",
                            id: "rate-simple"
                          }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => props.hcSubmitReview()}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </TabContainer>
              <TabContainer dir={"ltr"}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-7">
                      Do you wish to issue this book ?
                    </div>
                    <div className="col-md-4 submitBtn">
                      <Button
                      variant="outlined"
                      color="primary"
                      disabled={props.disableBookIssue}
                      onClick={() => props.hcSubmitIssue()}>
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </TabContainer>
              <TabContainer dir={"ltr"}>
                <div className="container">
                  <div className="row expansionPanel">
                    <div className="col-lg-5 submitBtn">
                      Do you wish to renew this book ?
                      <Button
                      variant="outlined"
                      color="primary"
                      disabled={!props.disableRenewReturn || props.disableBookRenew}
                      onClick={() => props.hcSubmitRenew()}>
                        Accept
                      </Button>
                    </div>
                    <div className="col-lg-5 submitBtn">
                      Do you wish to return this book ?
                      <Button
                      variant="outlined"
                      color="primary"
                      disabled={!props.disableRenewReturn}
                      onClick={() => props.hcSubmitReturn()}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </TabContainer>
            </SwipeableViews>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default bookComponent;
