import React, { Component } from "react";

import { Table, ButtonGroup, Button, Container } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import NavBar from "./navBar";

class Events extends Component {
  state = {
    events: [],
    isLoggedIn: false,
  };

  async componentDidMount() {
    if (localStorage.getItem("jwt-token") !== null) {
      let token = "Bearer " + JSON.parse(localStorage.getItem("jwt-token")).jwt;
      const response = await fetch("/event", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });
      if (response.status === 200) {
        const body = await response.json();
        this.setState({ events: body });
        this.setState({ isLoggedIn: true });
      } else {
        const isLoggedIn = false;
        this.setState({ isLoggedIn: isLoggedIn });
        document.getElementById("message").style.display = "block";
      }
    } else {
      const isLoggedIn = false;
      this.setState({ isLoggedIn: isLoggedIn });
      this.props.history.push("/login");
    }
  }

  handleDelete = async (id) => {
    let token = "Bearer " + JSON.parse(localStorage.getItem("jwt-token")).jwt;
    await fetch(`/event/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(() => {
      const events = this.state.events.filter((event) => {
        return event.id !== id;
      });
      console.log("events", events);
      this.setState({ events });
    });
  };

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div>
          <NavBar />
          <p style={{ padding: 10, display: "none" }} id="message">
            Please Login to proceed
          </p>
        </div>
      );
    }

    const eventList = this.state.events.map((event) => {
      event.date_time = this.props
        .convertUTCToLocalDate(event.date_time)
        .toString();
      return (
        <tr key={event.id}>
          <td>{event.title}</td>
          <td>{event.description}</td>
          <td>{event.date_time}</td>
          <td>{Math.round(Math.random() * 10)}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/events/" + event.id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.handleDelete(event.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <NavBar />
        <Container fluid>
          <div className="float-right" style={{ padding: 10 }}>
            <Button
              style={{ padding: 10 }}
              size="md"
              color="success"
              tag={Link}
              to="/events/new"
            >
              Add Event
            </Button>
          </div>
          <h3 style={{ padding: 10 }}>Events</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Title</th>
                <th width="30%">Description</th>
                <th>Date&Time</th>
                <th>No.of attendees</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{eventList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(Events);
