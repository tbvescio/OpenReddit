import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Cookie from "../../util/cookie";
import "./Login.css";

class Login extends Component {
  state = {
    username: null,
    password: null,
    error: null,
    redirect: null,
  };

  componentDidMount() {
    if (Cookie.getCookie("token")){
      this.setState({redirect: true});
    }
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginHandler = (event) => {
    event.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("/auth/login", data)
      .then((response) => {
        Cookie.setCookie("token", response.data.token);
        Cookie.setCookie("username", this.state.username);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return this.setState({ error: "Data not valid!" });
        }
        console.log(error, "ERROR");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}

        <Form className="form" onSubmit={this.loginHandler}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter email"
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
