import React, { Component } from "react";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

import axios from "axios";
import { Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(response => this.setState({ smurfs: response.data }));
  }

  postSmurf = smurf => {
    axios.post("http://localhost:3333/smurfs", smurf).then(response => {
      this.setState({ smurfs: response.data });
    });
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/smurf-form"
          render={props => <SmurfForm {...props} postSmurf={this.postSmurf} />}
        />
        {/* <SmurfForm postSmurf={this.postSmurf} /> */}
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
