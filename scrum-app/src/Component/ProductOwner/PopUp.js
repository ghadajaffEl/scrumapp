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
import PopUpbacklog from "./PopUpbacklog";
import { Link } from "react-router-dom";
class PopUp extends React.Component {
  state = {
    open: false,
    projectname: "",
    description: "",
    startdate: "",
    finishdate: "",
    backloglist: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  createProject = () => {
    axios
      .post("/new_project", {
        projectname: this.state.projectname,
        description: this.state.description,
        startdate: this.state.startdate,
        finishdate: this.state.finishdate,
        backloglist: this.state.backloglist
      })
      .then(res => alert(res.data));
  };
  getList = l => {
    this.setState({ backloglist: l });
  };

  render() {
    return (
      <div>
        <p onClick={this.handleClickOpen}>CREATE PROJECT</p>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new project, please fill out these fields .
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Project Name"
              type="text"
              fullWidth
              onChange={e => this.setState({ projectname: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="textarea"
              fullWidth
              onChange={e => this.setState({ description: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Start date"
              type="date"
              fullWidth
              onChange={e => this.setState({ startdate: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Finish date"
              type="date"
              fullWidth
              onChange={e => this.setState({ finishdate: e.target.value })}
            />

            <PopUpbacklog list={l => this.getList(l)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createProject} color="primary">
              Create Project
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PopUp;
