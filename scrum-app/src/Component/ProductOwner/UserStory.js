import React, { Component } from "react";
import "../../../../scrum-app/node_modules/font-awesome/css/font-awesome.min.css";

class UserStory extends Component {
  constructor(props) {
    super(props);
    this.state = { list: props.list, text: this.props.text };
  }
  deleteUserStory = i => {
    const index = this.state.list.findIndex(el => el.id == i);

    this.setState({ list: this.state.list.splice(index, 1) });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      this.setState({ list: nextProps.list });
    }
  }
  render() {
    return (
      <div className="userstory">
        <input
          type="text"
          value={this.state.text}
          onChange={e => {
            this.setState({ text: e.target.value });
            this.props.changebacklog(this.state.text);
          }}
        />
      </div>
    );
  }
}

export default UserStory;
