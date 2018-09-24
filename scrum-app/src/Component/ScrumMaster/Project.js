import React, { Component } from "react";
import "../../../src/App.css";
import UserStory from "./UserStory.js";
import "bootstrap/dist/css/bootstrap.min.css";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackLog: "none",
      showProject: "block",
      list: []
    };
  }
  showBackLog = () => {
    this.setState({ showBackLog: "block" });
    this.setState({ showProject: "none" });
    this.setState({ list: this.props.project.backloglist });
  };
  render() {
    return (
      <div className="bodybg">
        <div
          className="project-container"
          style={{ display: this.state.showProject }}
        >
          <div className="projectpropertie-container">
            <label>Project name:</label>
            <p>{this.props.project.projectname}</p>
          </div>
          <div className="projectpropertie-container">
            <label>Description:</label>
            <p>{this.props.project.description}</p>
          </div>
          <div className="projectpropertie-container">
            <label>Start date:</label>
            <p>{this.props.project.startdate}</p>
          </div>
          <div className="projectpropertie-container">
            <label>Finish date:</label>
            <p>{this.props.project.finishdate}</p>
          </div>
          <label
            className="projectpropertie-container"
            onClick={this.showBackLog}
          >
            Backlog List
          </label>
        </div>

        <div
          style={{ display: this.state.showBackLog }}
          className="backlog-container"
        >
          <UserStory tasks={this.state.list} />
        </div>
      </div>
    );
  }
}

export default Project;
