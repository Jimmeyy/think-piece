import React, { Component } from 'react';
import Posts from './Posts';
import { firestore } from '../firebase';
import { collectIdsAndData } from '../utils';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  async componentDidMount() {
    // const snapshot = await firestore.collection('posts').get();
    // const posts = snapshot.docs.map(doc => collectIdsAndData(doc));
    // this.setState({ posts });

    this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(doc => collectIdsAndData(doc));
      this.setState({ posts });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCreate = async post => {
    await firestore.collection('posts').add(post);
    // const docRef = await firestore.collection('posts').add(post);
    // const doc = await docRef.get();
    // const newPost = {
    //   id: doc.id,
    //   ...doc.data()
    // };

    // const { posts } = this.state;
    // this.setState({
    //   posts: [newPost, ...posts]
    // })
  };

  handleRemove = async id => {
    const { posts } = this.state;
    await firestore.doc(`posts/${id}`).delete();
    const newPosts = posts.filter(post => post.id !== id);
    this.setState({ posts: newPosts });
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} onDelete={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
