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

class PopUpDelete extends React.Component {
  state = {
    open: false,
    projectname: ""
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
        finishdate: this.state.finishdate
      })
      .then(res => alert(res.data));
  };

  deleteProject = id => {
    // console.log(this.props.item._id);
    axios.delete(`/deleteProject/${id}`).then(res => {
      console.log("project deleted deleted");
    });
  };
  render() {
    return (
      <div>
        <i
          onClick={this.handleClickOpen}
          className="fa fa-fw fa-trash"
          style={{ fontSize: "1.75em" }}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">DELETE PROJECT </DialogTitle>
          <DialogContent>
            <DialogContentText>
              When you delete a project,the project and its data will be deleted
              permenantly. Are you sure you want to delete the project:
              {this.props.delete.projectname}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.deleteProject(this.props.delete._id)}
              color="primary"
            >
              Delete Project
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PopUpDelete;
