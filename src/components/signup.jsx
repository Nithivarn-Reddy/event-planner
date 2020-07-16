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

class SignUp extends Component {
  state = {
    details: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log("inside handle change");
    console.log("target value", target);
    console.log("value", value);
    console.log("name", name);

    let details = { ...this.state.details };

    console.log("details", details);
    details[name] = value;
    this.setState({ details });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let { details } = this.state;
    if (details.password !== details.confirmPassword) {
      document.getElementById("message").innerHTML = "Password don't match";
      document.getElementById("message").style.color = "red";
    } else {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(details),
      });
      console.log(response.status === 404);
      if (response.status === 404 || response.status === 422) {
        const body = await response.json();
        //console.log(body);
        document.getElementById("message").innerHTML = body;
        document.getElementById("message").style.color = "red";
      } else {
        document.getElementById("message").innerHTML =
          "User created successfully . Please login now to continue";
        document.getElementById("message").style.color = "green";
      }
    }
  };

  render() {
    const { details } = this.state;
    return (
      <div>
        <NavBar />
        <Container className="base-container">
          <p id="message"></p>
          <h2 style={{ padding: 10 }}>Sign Up</h2>
          <Form onSubmit={this.handleSubmit}>
            <Col>
              <FormGroup>
                <Label for="userName">Enter User Name</Label>
                <Input
                  type="text"
                  name="userName"
                  id="userName"
                  value={"" || details.userName}
                  onChange={this.handleChange}
                  autoComplete="userName"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password"> Enter Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={"" || details.password}
                  onChange={this.handleChange}
                  autoComplete="password"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password"> Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={"" || this.confirmPassword}
                  onChange={this.handleChange}
                  autoComplete="password"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Button color="primary" type="submit" size="sm">
                  Create
                </Button>
              </FormGroup>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(SignUp);
