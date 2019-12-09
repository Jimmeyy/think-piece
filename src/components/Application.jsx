import React, { Component } from 'react';
import Posts from './Posts';
import { firestore } from '../firebase';
import { collectIdsAndData } from '../utils';

class Application extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const snapshot = await firestore.collection('posts').get();
    const posts = snapshot.docs.map(doc => collectIdsAndData(doc));
    this.setState({ posts });
  }

  handleCreate = post => {
    const { posts } = this.state;
    this.setState({ posts: [post, ...posts] });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
