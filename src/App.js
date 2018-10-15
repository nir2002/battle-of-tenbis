import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Restaurants from "./screens/Restaurants";
import MyVotes from "./screens/MyVotes";
import AppBar from "./components/AppBar";
import { initalizeFirebase } from "./api";
import firebase from "firebase/app";
import "./App.css";

class App extends Component {
  state = {
    user: null
  };

  constructor(props) {
    super(props);
    initalizeFirebase();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({
          user: {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
            uid: user.uid,
            providerData: user.providerData
          }
        });
      } else {
        this.setState({
          user: null
        });
      }
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <AppBar user={user} />
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
