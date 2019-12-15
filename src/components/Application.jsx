import React, { Component } from "react";
import Posts from "./Posts";
import { firestore, auth, createUserProfileDocument } from "../firebase";
import { collectIdsAndData } from "../utils";
import CurrentUser from "./CurrentUser";
import SignInAndSignUp from "./SignInAndSignUp";

class Application extends Component {
  state = {
    posts: [],
    user: null,
    userLoaded: false
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  async componentDidMount() {
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(doc => collectIdsAndData(doc));
        this.setState({ posts });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user, userLoaded: true });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromFirestore();
    this.unsubscribeFromAuth();
  }

  render() {
    const { posts, user, userLoaded } = this.state;
    const userInformation = user ? (
      <CurrentUser {...user} />
    ) : (
      <SignInAndSignUp user={user ? true : false} />
    );

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        {userLoaded && userInformation}
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
