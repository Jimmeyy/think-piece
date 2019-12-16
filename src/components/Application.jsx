import React, { Component } from "react";
import Posts from "./Posts";
import UserDashboard from './UserDashboard';
import { Switch, Route, Link } from 'react-router-dom';
import UserProfilePage from './UserProfilePage';

class Application extends Component {

  render() {

    return (
      <main className="Application">
        <Link to="/"><h1>Think Piece</h1></Link>
        <UserDashboard />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/profile" component={UserProfilePage} />
        </Switch>
      </main>
    );
  }
}

export default Application;
