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
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../scrum-app/node_modules/font-awesome/css/font-awesome.min.css";
class ModifyBacklog extends React.Component {
  state = {
    open: false,
    backloglist: this.props.backlog,
    projectname: "",
    description: "",
    startdate: "",
    finishdate: "",
    userStory: "",
    arr: []
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  deleteUserStory = i => {
    const index = this.state.backloglist.findIndex(el => el.id == i);
    let arr = this.state.backloglist;

    this.setState({ backloglist: this.state.backloglist.splice(index, 1) });
  };

  addUserStory = (i, text) => {
    let arr = this.state.arr;
    arr.push({ text }, { status: "todo" });
    this.setState({ arr: arr });
  };
  render() {
    return (
      <div>
        <p onClick={this.handleClickOpen}>Modify BackLogList</p>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modify BackLogList</DialogTitle>
          <DialogContent>
            <DialogContentText />
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
                  className="fa fa-fw fa-check"
                  onClick={() => {
                    this.addUserStory(el.i, this.state.userStory);
                    console.log(this.state.userStory);
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
              onClick={() => {
                this.setState({ backloglist: this.state.arr });
                this.props.list(this.state.backloglist);
              }}
              color="primary"
            >
              Modify Backlog List
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default ModifyBacklog;
