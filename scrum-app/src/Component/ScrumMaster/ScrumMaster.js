import React, { Component } from "react";
import "../../../src/App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../scrum-app/node_modules/font-awesome/css/font-awesome.min.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Project from "./Project";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

class ScrumMaster extends Component {
  constructor(props) {
    super(props);
    this.state = { listProject: [], showProject: "none", project: {} };
  }
  listProject = () => {
    axios.get("/listProject").then(res => {
      const listProject = res.data;
      this.setState({ listProject });
      console.log(res.data);
    });
  };
  showProject = el => {
    this.setState({ showProject: "block" });
    this.setState({ project: el });
  };
  render() {
    return (
      <div className="bodybg">
        <h1> Scrum Master Dashbord</h1>
        <SideNav
          onSelect={selected => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="projects">
            <NavItem eventKey="projects">
              <NavIcon>
                <i
                  style={{ fontSize: "1.75em" }}
                  className="fa fa-fw fa-list-alt"
                />
              </NavIcon>

              <NavText onClick={this.listProject}>Projects</NavText>

              {this.state.listProject.map(el => (
                <NavItem eventKey={el.projectname}>
                  <NavText onClick={() => this.showProject(el)}>
                    {el.projectname}
                  </NavText>
                </NavItem>
              ))}
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <div style={{ display: this.state.showProject }}>
          <Project project={this.state.project} />
        </div>
      </div>
    );
  }
}

export default ScrumMaster;
