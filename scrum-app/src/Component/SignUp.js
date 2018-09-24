import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      photo: null,
      email: "",
      status: "",
      password: "",
      confirmpassword: ""
    };
  }

  addUser = () => {
    /*const fd = new FormData();
    fd.append("image", this.state.photo, this.state.photo.name); */
    axios
      .post("/addUser", {
        fullname: this.state.fullname,
        photo: this.state.photo,
        email: this.state.email,
        status: this.state.status,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword
      })
      .then(res => alert(res.data))
      .catch(err => alert(err));
  };
  handleChangeImage = event => {
    this.setState({
      photo: URL.createObjectURL(event.target.files[0])
    });
  };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>

        <form>
          <img
            for="file"
            src="http://www.clker.com/cliparts/b/1/f/a/1195445301811339265dagobert83_female_user_icon.svg.med.png"
            className="input-label"
            width="70px"
            height="70px"
          />
          <br />
          <label for="file" className="input-label">
            {" "}
            Select your photo
          </label>
          <input type="file" onChange={e => this.handleChangeImage(e)} />
          <img src={this.state.photo} />
          <label>Fullname</label>
          <input
            type="text"
            onChange={e => {
              this.setState({ fullname: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type="email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <label>Status</label>
          <input
            type="text"
            onChange={e => {
              this.setState({ status: e.target.value });
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={e => {
              this.setState({ confirmpassword: e.target.value });
            }}
          />
          <Link to="/addUser">
            <input
              className="btn btn-primary"
              type="submit"
              value="Sign Up"
              onClick={this.addUser}
            />
          </Link>
        </form>
      </div>
    );
  }
}

export default SignUp;
