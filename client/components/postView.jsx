// import React, { useState } from 'react';
// // import ReactDOM from 'react-dom';
// import MainContainer from '../containers/MainContainer.jsx';
// import FeedCodeBlock from './FeedCodeBlock.jsx';

// export default function Feed() {
//   // have 2 useState hooks
//   // make 2 fetch requests
//     // 1 - to get post
//     // 2 - to get all comments associated with the post
//       // use the map method to save all comments into an array
//   // return
//     // one post
//     // the array of comments

//   // React hooks for state - store the data from the database
//   const [codeBlocks, setCodeBlocks] = useState([]);

//   // update state that we fetch
//   fetch('/api/getPost')
//     .then((res) => res.json())
//     .then((data) => {
//       setCodeBlocks(data);
//     })
//     .catch((err) => console.log(err));

//   // create codeblock components and save them in an array
//   const codeBlockEl = codeBlocks.map((code, i) => {
//     return <FeedCodeBlock key={i} info={code} />;
//   });

//   // returns code block cards
//   return (
//     <div>
//       <div>{codeBlockEl}</div>
//     </div>
//   );
// }
