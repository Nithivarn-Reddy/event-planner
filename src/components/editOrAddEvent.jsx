import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditOrAddEvent extends Component {
  event = {
    id: "",
    title: "",
    description: "",
    date_time: new Date(),
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.event,
    };
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      let token;
      if (localStorage.getItem("jwt-token") !== null) {
        token = "Bearer " + JSON.parse(localStorage.getItem("jwt-token")).jwt;
      } else {
        token = "";
      }
      const response = await fetch(`/event/${this.props.match.params.id}`, {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        let event = await response.json();
        event[0]["date_time"] = this.props.convertUTCToLocalDate(
          event[0]["date_time"]
        );
        this.setState({ item: event[0] });
        console.log("After mount data", this.state.item);
      } else {
        this.props.history.push("/events");
      }
    } else {
      if (localStorage.getItem("jwt-token") !== null) {
        let token =
          "Bearer " + JSON.parse(localStorage.getItem("jwt-token")).jwt;
        const response = await fetch("/validate", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        });
        if (response.status !== 200) {
          this.props.history.push("/events");
        }
      } else {
        this.props.history.push("/events");
      }
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  };

  handleDateChange = (date) => {
    const item = { ...this.state.item };
    item["date_time"] = date;
    console.log("date and time value", item["date_time"]);
    this.setState({ item });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { item } = this.state;

    let token = "Bearer " + JSON.parse(localStorage.getItem("jwt-token")).jwt;

    if (this.props.match.params.id == "new") {
      const response = await fetch("/event", {
        method: "POST",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.status === 422) {
        const body = await response.json();
        document.getElementById("message").innerHTML = JSON.stringify(body);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "red";
      } else if (response.status === 401) {
        const body = await response.json();
        document.getElementById("message").innerHTML =
          JSON.stringify(body) + "\n" + "Please Login to Continue";
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "red";
      } else {
        this.props.history.push("/events");
      }
    } else {
      const response = await fetch(`/event/${this.props.match.params.id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.status === 422) {
        const body = await response.json();
        document.getElementById("message").innerHTML = JSON.stringify(body);
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "red";
      } else if (response.status === 401) {
        const body = await response.json();
        document.getElementById("message").innerHTML =
          JSON.stringify(body) + "\n" + "Please Login to Continue";
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "red";
      } else {
        this.props.history.push("/events");
      }
    }
  };

  render() {
    const { item } = this.state;
    //console.log("Event data", item);
    const title = (
      <h2 style={{ padding: 10 }}>{item.id ? "Edit Event" : "Add Event"}</h2>
    );
    return (
      <Container fluid>
        <p id="message" style={{ display: "none" }}></p>
        <div>{title}</div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={item.title || ""}
              onChange={this.handleChange}
              autoComplete="title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={item.description || ""}
              onChange={this.handleChange}
              autoComplete="description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="date_time"> Date & Time</Label>
            <div>
              <DatePicker
                name="date_time"
                selected={item.date_time || ""}
                onChange={this.handleDateChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                //minTime={setHours(setMinutes(new Date(), 0), 17)}
                minDate={new Date()}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>
            {"  "}
            <Button color="secondary" tag={Link} to="/events">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default withRouter(EditOrAddEvent);
