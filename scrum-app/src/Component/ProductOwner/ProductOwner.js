import React, { Component } from "react";
import "../../../src/App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../scrum-app/node_modules/font-awesome/css/font-awesome.min.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

import Popup from "./PopUp.js";
import PopUpModify from "./PopupModify.js";
import PopUpDelete from "./PopupDelete.js";
class ProductOwner extends Component {
  constructor(props) {
    super(props);
    this.state = { listProject: [] };
  }
  listProject = () => {
    axios.get("/listProject").then(res => {
      const listProject = res.data;
      this.setState({ listProject });
      console.log(res.data);
    });
  };
  editProject = id => {
    return <Popup />;
  };

  render() {
    return (
      <div>
        <h1> Product Owner Dashbord</h1>
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
                  <NavText>
                    {el.projectname}{" "}
                    <div className="modify-project">
                      <PopUpModify modify={el} />
                      <PopUpDelete delete={el} />
                    </div>
                  </NavText>
                </NavItem>
              ))}
            </NavItem>
            <NavItem eventKey="create-project">
              <NavIcon>
                <i
                  style={{ fontSize: "1.75em" }}
                  className="fa fa-fw fa-plus"
                />
              </NavIcon>
              <NavText>
                <Popup />
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
    );
  }
}

export default ProductOwner;
