import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';

import Container from '@mui/material/Container';
import 'react-pro-sidebar/dist/css/styles.css';

import CreatePost from '../components/CreatePost.jsx';
import Feed from '../components/Feed.jsx';
import FeedCodeBlock from '../components/FeedCodeBlock.jsx';

import classes from './MainContainer.module.css';
import './custom.scss';

export default function MainContainer() {
  //const [topic, setTopic] = useState('Java');

  const languages = ['Javascript', 'Python', 'C#', 'C++', 'Java', 'PHP'];

  const menuItems = languages.map((lang) => (
    <MenuItem key={lang}>
      <Link to={`/home/feed/${lang}`}>{lang}</Link>
    </MenuItem>
  ));

  return (
    <Container className={classes.mainContainer}>
      <ProSidebar className={classes.sidebar}>
        <Menu iconShape="square">{menuItems}</Menu>
      </ProSidebar>

      {/* we may need to import other components below */}
      <Switch>
        <Route path="/home" exact>
          <h1>Welcome to Rate-My-Code</h1>
        </Route>
        <Route path="/home/createpost">
          <CreatePost />
        </Route>
        <Route path="/home/feed/:lang">
          <Feed />
          {/* <FeedCodeBlock /> */}
        </Route>
      </Switch>

      {/* <main className={classes.codeBlockContainer}>
        <FeedCodeBlock />
        <FeedCodeBlock />
        <FeedCodeBlock />
        <FeedCodeBlock />
        <FeedCodeBlock />
        <FeedCodeBlock />
      </main> */}

      <div>
        <Link to="/home/createpost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Link>
      </div>
    </Container>
  );
}

//@import '~react-pro-sidebar/dist/scss/styles.scss'; for styles.scss
