import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import LocationManager from "./components/LocationManager";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Container>
              <LocationManager />
            </Container>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
