import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Events from "./components/events";
import EditOrAddEvent from "./components/editOrAddEvent";
import Login from "./components/login";
import SignUp from "./components/signup";

class App extends Component {
  convertUTCDateToLocalDate = (utc_date) => {
    let date = new Date(utc_date);
    let newDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={() => <Home />} />
          <Route
            path="/events"
            exact={true}
            component={() => (
              <Events convertUTCToLocalDate={this.convertUTCDateToLocalDate} />
            )}
          />
          <Route
            path="/events/:id"
            exact
            component={() => (
              <EditOrAddEvent
                convertUTCToLocalDate={this.convertUTCDateToLocalDate}
              />
            )}
          />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/signup" exact component={() => <SignUp />} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    );
  }
}

export default App;
