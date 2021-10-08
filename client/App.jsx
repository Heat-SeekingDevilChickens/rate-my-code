import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import './App.module.css';
import Feed from './components/Feed.jsx';
import FeedCodeBlock from './components/FeedCodeBlock.jsx'; //delete when we can fetch from database
import CreatePost from './components/CreatePost.jsx';

import LogInContainer from './containers/LogInContainer.jsx';
export default function App(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <LogInContainer />
      </Route>
      <Route path="/home">
        <MainContainer />
      </Route>
    </Switch>
  );
}
