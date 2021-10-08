import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import MainContainer from '../containers/MainContainer.jsx';
import FeedCodeBlock from './FeedCodeBlock.jsx';

import TextField from '@mui/material/TextField';
import { Button, FormControl } from '@mui/material';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function Post(props) {
  const { postID } = useParams();
  const [state, setState] = useState({
    _id: '',
    topic: '',
    date: null,
    upvotes: 0,
    downvotes: 0,
    title: '',
    issue: '',
    tried: '',
    cause: '',
    code: '',
    user_id: null,
    postComments: [],
  });

  const [comment, setComment] = useState({
    comment: '',
    code: '',
    upvotes: 0,
    downvotes: 0,
    date: 0,
    post_id: postID,
  });

  useEffect(() => getPosts(), []);

  function getPosts() {
    fetch(`/api/getPost/${postID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState(data);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  }

  function handleClick() {
    fetch('/api/createComment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
      .then((res) => {
        if (res.status === 200) {
          setComment({ ...comment, comment: '' });
          getPosts();
        }
      })
      .catch((err) => console.log(err));
  }

  const comments = state.postComments.map((obj, i) => (
    <div key={`comment${i}`} className="comment">
      <h4 style={{ textAlign: 'left' }}>{obj.username}</h4>
      <p>{obj.comment}</p>
    </div>
  ));

  return (
    <div id="postView">
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
        value={state.code}
        readOnly={true}
        height="400px"
        width="35vw"
      ></AceEditor>

      <FormControl margin="normal" id="commentForm">
        <TextField
          name="comment"
          value={comment.comment}
          label="Post a comment.."
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          width="200px"
        />

        <Button id="submit" variant="contained" onClick={handleClick}>
          Post Comment
        </Button>
      </FormControl>

      <div id="comments">{comments}</div>
    </div>
  );
}
