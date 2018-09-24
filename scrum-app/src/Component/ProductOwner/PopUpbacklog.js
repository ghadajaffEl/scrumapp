import React, { Component } from "react";
import Popup from "react-popup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Popupmodify from "./PopupModify";
import { Link } from "react-router-dom";
import UserStory from "./UserStory";
import "../../../src/App.css";

class PopUpbacklog extends React.Component {
  state = {
    open: false,
    backloglist: [],
    projectname: "",
    description: "",
    startdate: "",
    finishdate: "",
    userStory: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  createBackLog = () => {
    console.log(this.state.backloglist);
  };
  deleteUserStory = i => {
    let arr = this.state.backloglist;
    arr.filter(el => el.id !== i);
    console.log(i);
    this.setState({ backloglist: arr });
  };
  addUserStory = () => {
    let arr = this.state.backloglist;
    let newuser = {
      text: this.state.userStory,
      status: "todo"
    };
    arr.push(newuser);
    this.setState({ backloglist: arr });
  };
  render() {
    return (
      <div>
        <p onClick={this.handleClickOpen}>Create BackLogList</p>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New BackLogList</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a backlog list,please enter the user stories
            </DialogContentText>
            <form className="formbacklog">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="User Story"
                type="text"
                fullWidth
                onChange={e => this.setState({ userStory: e.target.value })}
              />
              <Button onClick={this.addUserStory}>ADD</Button>
            </form>
            {this.state.backloglist.map(el => (
              <div className="userStory-container">
                {" "}
                <UserStory
                  text={el.text}
                  changebacklog={text => {
                    this.setState({ userStory: text });
                  }}
                />
                <i
                  style={{ fontSize: "1.75em" }}
                  className="fa fa-fw fa-remove"
                  onClick={() => {
                    this.deleteUserStory(el.i);
                  }}
                />
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.props.list(this.state.backloglist)}
              color="primary"
            >
              Create Backlog List
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PopUpbacklog;
