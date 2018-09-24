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
import UserStory from "./UserStory";
import ModifyBacklog from "./ModifyBacklogList";
class PopUpModify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      projectname: "",
      description: "",
      startdate: "",
      finishdate: "",
      backloglist: []
    };
  }
  componentDidMount() {
    axios
      .get(`/projects/${this.props.modify._id}`)
      .then(res => this.setState({ ...res.data }));
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  editProject = () => {
    axios.put(`/updateproject/${this.props.modify._id}`, {
      projectname: this.state.projectname,
      description: this.state.description,
      startdate: this.state.startdate,
      finishdate: this.state.finishdate,
      backloglist: this.state.backloglist
    });
  };
  getList = l => {
    this.setState({ backloglist: l });
    console.log(this.state.backloglist);
  };
  render() {
    return (
      <div>
        <i
          onClick={this.handleClickOpen}
          className="fa fa-fw fa-edit"
          style={{ fontSize: "1.75em" }}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can modify your project properties.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Project Name"
              type="text"
              fullWidth
              value={this.state.projectname}
              onChange={e => this.setState({ projectname: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="textarea"
              fullWidth
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Start date"
              type="date"
              fullWidth
              value={this.state.startdate}
              onChange={e => this.setState({ startdate: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Finish date"
              type="date"
              fullWidth
              value={this.state.finishdate}
              onChange={e => this.setState({ finishdate: e.target.value })}
            />
            <ModifyBacklog
              backlog={this.state.backloglist}
              list={l => this.getList(l)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.editProject} color="primary">
              Edit Project
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PopUpModify;
