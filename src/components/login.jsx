import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
} from "reactstrap";
import NavBar from "./navBar";
import { withRouter, Link } from "react-router-dom";

class Login extends Component {
  state = {
    credentials: {
      userName: "",
      password: "",
    },
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let credentials = { ...this.state.credentials };
    credentials[name] = value;
    this.setState({ credentials });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { credentials } = this.state;
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (response.status !== 200) {
      this.props.history.push("/login");
      document.getElementById("message").innerHTML =
        "Please enter correct credentials";
      document.getElementById("message").style.color = "red";
    } else {
      const body = await response.json();
      localStorage.setItem("jwt-token", JSON.stringify({ jwt: body.jwt }));
      this.props.history.push("/");
    }
  };

  render() {
    const { credentials } = this.state;
    return (
      <div>
        <NavBar />
        <Container className="base-container">
          <p id="message"></p>
          <h2 style={{ padding: 10 }}>Sign In</h2>
          <Form onSubmit={this.handleSubmit}>
            <Col>
              <FormGroup>
                <Label for="userName">User Name</Label>
                <Input
                  type="text"
                  name="userName"
                  id="userName"
                  value={"" || credentials.userName}
                  onChange={this.handleChange}
                  autoComplete="userName"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={"" || credentials.password}
                  onChange={this.handleChange}
                  autoComplete="password"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Button color="primary" type="submit" size="sm">
                  Submit
                </Button>
                {"    "} Need a new account?
                <Link size="sm" color="primary" tag={Link} to={"/signup"}>
                  Sign Up
                </Link>
              </FormGroup>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
