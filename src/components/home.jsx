import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import NavBar from "./navBar";
import "../App.css";

class Home extends Component {
  state = {
    isLoggedIn: false,
  };

  async componentDidMount() {
    console.log(
      "inside home component Did mount",
      localStorage.getItem("jwt-token")
    );
    if (localStorage.getItem("jwt-token") !== null) {
      let token = "Bearer " + JSON.parse(localStorage.getItem("jwt-token")).jwt;
      const response = await fetch("/validate", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });
      if (response.status !== 200) {
        const isLoggedIn = false;
        this.setState({ isLoggedIn });
        document.getElementById("message").style.display = "block";
      } else {
        const isLoggedIn = true;
        this.setState({ isLoggedIn });
        console.log("inside async method", this.state.isLoggedIn);
      }
    } else {
      const isLoggedIn = false;
      this.setState({ isLoggedIn });
      document.getElementById("message").style.display = "block";
    }
    //console.log("isloggedIn value in home component", this.state.isLoggedIn);
  }

  render() {
    // console.log("this is called second");
    if (!this.state.isLoggedIn) {
      //console.log("After rendering the component", this.state.isLoggedIn);
      return (
        <div>
          <NavBar />
          <p style={{ padding: 10, display: "none" }} id="message">
            Please Login to proceed
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <NavBar />
          <Container fluid>
            <Button color="link">
              <Link to="/events">Events</Link>
            </Button>
          </Container>
        </div>
      );
    }
  }
}

export default Home;
