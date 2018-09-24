import React, { Component } from "react";
import { Link } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    );
  }
}

export default Home;
