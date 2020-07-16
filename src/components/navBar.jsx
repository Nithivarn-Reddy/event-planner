import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {
    item: {
      isOpen: false,
      showLogout: false,
    },
  };
  toggle = () => {
    this.setState({ isOpen: true });
  };

  async componentDidMount() {
    if (localStorage.getItem("jwt-token") !== null) {
      let { item } = this.state;
      let token = "Bearer " + JSON.parse(localStorage.getItem("jwt-token")).jwt;
      const response = await fetch("/validate", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });
      if (response.status !== 200) {
        item["showLogout"] = false;
        this.setState({ item });
        this.showLogin();
      } else {
        item["showLogout"] = true;
        this.setState({ item });
        this.hideLogin();
      }
    }
  }

  hideLogin() {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
  }

  logout = () => {
    localStorage.removeItem("jwt-token");
    this.showLogin();
  };

  showLogin() {
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "block";
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/">
            Home
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <div id="login">
                <NavItem>
                  <NavLink tag={Link} to="/login">
                    Login
                  </NavLink>
                </NavItem>
              </div>
              <div id="logout" style={{ display: "none" }}>
                <NavItem>
                  <NavLink to="/login" onClick={this.logout}>
                    Logout
                  </NavLink>
                </NavItem>
              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
