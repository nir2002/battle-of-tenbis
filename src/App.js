import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Restaurants from "./screens/Restaurants";
import MyVotes from "./screens/MyVotes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/my-votes" component={MyVotes} />
        <Redirect from="/" to="/restaurants" />
      </div>
    );
  }
}

export default App;
