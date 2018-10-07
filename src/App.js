import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Restaurants from "./screens/Restaurants";
import MyVotes from "./screens/MyVotes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>The battle of TenBis</h1>
        <Switch>
          <Route exact path="/restaurants" component={Restaurants} />
          <Route exact path="/my-votes" component={MyVotes} />
          <Redirect from="/" to="/restaurants" />
        </Switch>
      </div>
    );
  }
}

export default App;
