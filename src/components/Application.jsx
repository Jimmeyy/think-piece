import React, { Component } from "react";
import Posts from "./Posts";
import { firestore, auth, createUserProfileDocument } from "../firebase";
import { collectIdsAndData } from "../utils";
import CurrentUser from "./CurrentUser";
import SignInAndSignUp from "./SignInAndSignUp";

class Application extends Component {
  state = {
    user: null,
    userLoaded: false
  };

  unsubscribeFromAuth = null;

  async componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user, userLoaded: true });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { user, userLoaded } = this.state;
    const userInformation = user ? (
      <CurrentUser {...user} />
    ) : (
        <SignInAndSignUp user={user ? true : false} />
      );

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        {userLoaded && userInformation}
        <Posts />
      </main>
    );
  }
}

export default Application;
