import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: "", password: "" };
  }
  authentication = () => {
    axios
      .post("/authentify", {
        fullname: this.state.fullname,
        password: this.state.password
      })
      .then(res => alert(res.data))
      .catch(err => alert(err));
  };
  /*        <form action="/authentify" method="post">
*/
  render() {
    return (
      <div>
        <h2>Login</h2>

        <form>
          <label>Fullname</label>
          <input
            type="text"
            name="fullname"
            onChange={e => this.setState({ fullname: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Link to="/authentify">
            <input className="btn btn-primary" type="submit" value="Login" />
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
