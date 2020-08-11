import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./components/dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Welcome from "./components/welcome";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter basename={"/"}>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            exact
            component={Welcome}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/login`}
            component={Login}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/register`}
            component={Register}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/dashboard`}
            component={Dashboard}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
