import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import { Redirect } from "react-router";
import "./Navbar.css";

class navbar extends Component {
  state = {
    filter: null,
    redirect: false,
  };

  keyPressHandler = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      this.setState({ redirect: true });
    } else {
      this.setState({ filter: event.target.value });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/search/" + this.state.filter} />;
    }
    return (
      <>
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
          <Navbar.Brand href="/">OpenReddit</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onKeyPress={(e) => this.keyPressHandler(e)}
              />
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default navbar;
