import React, { Component } from "react";

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body text-center">
              <p>Create an account or login</p>
              <a href="/register" className="btn btn-primary btn-block mb-2">
                Register{" "}
              </a>
              <a href="/login" className="btn btn-secondary btn-block">
                Login
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="welcome-header">
            {" "}
            An Application is developed by &nbsp;
            <span style={{ fontStyle: "normal", fontWeight: "bold" }}>
              Hemanth Kumar
            </span>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
