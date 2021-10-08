import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';
import MainContainer from '../containers/MainContainer.jsx';
import FeedCodeBlock from './FeedCodeBlock.jsx';
import * as actions from '../actions/actions';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';

const mapDispatchToProps = (dispatch) => ({
  loadAllCodeBlocks: (codeBlocks) =>
    dispatch(actions.loadAllCodeBlocksActionCreator(codeBlocks)),
});

const mapStateToProps = (state) => ({
  codeBlocks: state.codeBlocks.codeBlocks,
});

function Feed(props) {
  // React hooks for state - store the data from the database
  // const [codeBlocks, setCodeBlocks] = useState([]);

  // update state that we fetch
  useEffect(() => {
    fetch(`/api/getAll`)
      .then((res) => res.json())
      .then((data) => {
        props.loadAllCodeBlocks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // create codeblock components and save them in an array
  const codeBlocks = props.codeBlocks.map((post, index) => {
    return <AceEditor key={index}
    mode="javascript"
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    }}
    theme="monokai"
    name="code"
    defaultValue={post.code}
    readOnly={true}
  ></AceEditor>
  });

  // console.log(props.match.params.params1);
  return <div>{codeBlocks}</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
