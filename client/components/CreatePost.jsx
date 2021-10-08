import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import MainContainer from '../containers/MainContainer.jsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import AceEditor from 'react-ace';
import classes from './CreatePost.module.css';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function CreatePost() {
  const [state, setState] = useState({
    title: '',
    topic: '',
    issue: '',
    tried: '',
    cause: '',
    code: '',
  });

  function handleChange(event) {
    console.log('change: ', event);

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  function handleCodeChange(newCode) {
    console.log('handing code change: ', newCode);
    setState({
      ...state,
      code: newCode,
    });
  }

  function submitCode() {
    const createdPost = {
      ...state,
      date: Date.now(),
      upvotes: 0,
      downvotes: 0,
    };

    console.log('state: ', createdPost);

    // create fetch request to POST the new post
    fetch('/api/createPost', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', //not sure about what needs to go here
      },
      body: JSON.stringify(createdPost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          return (
            <Redirect
              to={{
                pathname: '/home',
              }}
            />
          );
        }
      })
      .catch((err) => console.log('POST REQUEST ERROR: ', err));
  }
  // redirect if login is verified or successfully signedup

  // remove MainContainer when we implement React Router
  return (
    <FormControl className={classes.postForm} margin="normal" fullwidth>
      <InputLabel id="demo-simple-select-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="topic"
        name="topic"
        label="language"
        value={state.topic}
        margin="normal"
        onChange={handleChange}
      >
        <MenuItem value="Javascript">JavaScript</MenuItem>
        <MenuItem value="Python">Python</MenuItem>
        <MenuItem value="C-sharp">C#</MenuItem>
        <MenuItem value="C-plus-plus">C++</MenuItem>
        <MenuItem value="Java">Java</MenuItem>
        <MenuItem value="PHP">PHP</MenuItem>
      </Select>

      <TextField
        id="title"
        name="title"
        value={state.title}
        label="Title"
        variant="outlined"
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        id="issue"
        name="issue"
        value={state.issue}
        label="What is the problem"
        margin="normal"
        variant="outlined"
        size="small"
        fullWidth
        onChange={handleChange}
      />

      <TextField
        id="tried"
        name="tried"
        value={state.tried}
        label="What I've Tried"
        margin="normal"
        variant="outlined"
        size="medium"
        fullWidth
        onChange={handleChange}
      />

      <TextField
        id="cause"
        name="cause"
        value={state.cause}
        label="Why I think it's not working"
        variant="outlined"
        margin="normal"
        size="large"
        fullWidth
        onChange={handleChange}
      />

      {/* <TextField
        id="code"
        name="code"
        value={state.code}
        label="< Paste Your Code Here />"
        placeholder="Hello World!"
        multiline
        variant="filled"
        onChange={handleChange}
      /> */}

      <AceEditor
        className={classes.aceEditor}
        mode="javascript"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        theme="monokai"
        name="code"
        defaultValue="console.log('hello everyone')"
        value={state.code}
        onChange={handleCodeChange}
      ></AceEditor>

      <Button id="submit" variant="contained" onClick={submitCode}>
        Submit
      </Button>
    </FormControl>
  );
}
