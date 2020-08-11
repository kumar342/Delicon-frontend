import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    isLoggedin: false,
    user: "",
    email: "",
    name: "",
  };

  onSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    axios
      .post("http://18.219.11.242/login", { email, password })
      .then((res) => {
        console.log(res, "login response");
        if (res.data.user) {
          this.setState({
            isLoggedin: true,
            user: res.data.user,
          });
        }
        if (res.data.error || res.error) {
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    if (this.state.isLoggedin) {
      console.log(this.state.user);
      alert("logged in");
      localStorage.setItem("userName", this.state.user.name);
      localStorage.setItem("userCity", this.state.user.city);
      return <Redirect to={"/dashboard"} />;
    }

    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fa fa-sign-in"></i>&nbsp;Login
            </h1>
            <form
              onSubmit={this.onSubmit}
              style={{ fontSize: "large", fontStyle: "inherit" }}
            >
              <div className="form-group row">
                <label className="col-sm-3">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    id="email"
                    ref="email"
                    required
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3">Password</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    id="password"
                    ref="password"
                    required
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <button typeof="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
            <p
              className="lead mt-4"
              style={{
                fontSize: "large",
                fontStyle: "oblique",
                fontWeight: "bold",
              }}
            >
              No Account? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
