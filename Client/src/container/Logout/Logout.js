import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookie from "../../util/cookie";

class Logout extends Component {
  componentDidMount() {
    Cookie.deleteCookie("token");
    Cookie.deleteCookie("username");
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
