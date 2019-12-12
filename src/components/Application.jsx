import React, { Component } from 'react';
import Posts from './Posts';
import { firestore, auth } from '../firebase';
import { collectIdsAndData } from '../utils';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';

class Application extends Component {
  state = {
    posts: [],
    user: null,
    userLoaded: false
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  async componentDidMount() {
    // const snapshot = await firestore.collection('posts').get();
    // const posts = snapshot.docs.map(doc => collectIdsAndData(doc));
    // this.setState({ posts });

    this.unsubscribeFromFirestore = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(doc => collectIdsAndData(doc));
      this.setState({ posts });
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ user, userLoaded: true });
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromFirestore();
    this.unsubscribeFromAuth();
  }

  // handleCreate = async post => {
  //   await firestore.collection('posts').add(post);
  //   // const docRef = await firestore.collection('posts').add(post);
  //   // const doc = await docRef.get();
  //   // const newPost = {
  //   //   id: doc.id,
  //   //   ...doc.data()
  //   // };

  //   // const { posts } = this.state;
  //   // this.setState({
  //   //   posts: [newPost, ...posts]
  //   // })
  // };

  // handleRemove = async id => {
  //   const { posts } = this.state;
  //   await firestore.doc(`posts/${id}`).delete();
  //   const newPosts = posts.filter(post => post.id !== id);
  //   this.setState({ posts: newPosts });
  // }

  render() {
    const { posts, user, userLoaded } = this.state;
    const userInformation = user ? <CurrentUser {...user} /> : <SignIn />

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        {userLoaded && userInformation}
        <Posts posts={posts} onCreate={this.handleCreate} onDelete={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
