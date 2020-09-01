import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {Form, Button,Alert} from "react-bootstrap";

class Login extends Component {
  state = {
    username: null,
    password: null,
    confirmPassword: null,
    error: null
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  registerHandler = (event) => {
    event.preventDefault();
    if(this.state.password !== this.state.confirmPassword){
      return this.setState({error: "Passwords don't match!"});
    }

    let data = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post("/auth/signup", data)
      .then((response) => {
        if(response.status === 201){
          return this.setState({redirect: "/login"});
        }
        return this.setState({error: "an error ocurred!"});
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        <Form className="form" onSubmit={this.registerHandler}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              className="col-10 col-sm-3 form-input"
              onChange={(e) => this.onChangeHandler(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              className="col-10 col-sm-3 form-input"
              onChange={(e) => this.onChangeHandler(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="col-10 col-sm-3 form-input"
              onChange={(e) => this.onChangeHandler(e)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      
      
    );
  }
}

export default Login;
