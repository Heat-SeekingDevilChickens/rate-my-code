import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import MainContainer from '../containers/MainContainer.jsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import { Button, Select, MenuItem, InputLabel } from '@mui/material';
import AceEditor from 'react-ace';

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
    <div>
      {/* <HighlightOffIcon id="cancel-post" /> */}

      <TextField
        id="title"
        name="title"
        value={state.title}
        label="Title"
        variant="outlined"
        onChange={handleChange}
      />

      <InputLabel id="topic">Choose a Language</InputLabel>

      <Select
        id="topic"
        name="topic"
        label="Choose a language"
        value={state.topic}
        onChange={handleChange}
      >
        <MenuItem value="javascript">JavaScript</MenuItem>
        <MenuItem value="python">Python</MenuItem>
        <MenuItem value="c-sharp">C#</MenuItem>
        <MenuItem value="c-plus-plus">C++</MenuItem>
        <MenuItem value="java">Java</MenuItem>
        <MenuItem value="php">PHP</MenuItem>
      </Select>

      <TextField
        id="issue"
        name="issue"
        value={state.issue}
        label="What is the problem"
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
    </div>
  );
}
