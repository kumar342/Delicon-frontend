import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default class Register extends Component {
  state = {
    isRegistered: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const name = this.refs.name.value;
    const city = this.refs.city.value;
    axios
      .post("http://18.219.11.242/register", { email, password, name, city })
      .then((res) => {
        if (res.data) {
          this.setState({
            isRegistered: true,
          });
        }
      })
      .catch((error) => {
        return error.response;
      });
  };

  render() {
    if (this.state.isRegistered) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fa fa-user-plus"></i>&nbsp; Register{" "}
            </h1>
            <form onSubmit={this.handleSubmit} style={{ fontSize: "large" }}>
              <div className="form-group row">
                <label className="col-sm-3">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    id="email"
                    ref="email"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3">Name</label>
                <div className="col-sm-9">
                  <input
                    type="name"
                    id="name"
                    ref="name"
                    className="form-control"
                    placeholder="Enter Name"
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
                    className="form-control"
                    placeholder="Create Password"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3">City</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    id="city"
                    ref="city"
                    className="form-control"
                    placeholder="Enter City"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Register
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
              Have An Account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
