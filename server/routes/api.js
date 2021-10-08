// Require Packages
const express = require('express');
const apiController = require('../controllers/apiController');

// Initializer our router
const router = express.Router();

/* Handle routes to the /api route */


router.get('/getAll', apiController.getAll, (req, res) => {
  res.status(200).json(res.locals.allPosts);
});


// Handle POST request to /getTopic 
// Receive a topicID the req.body
// Use getTopic to retrieve the requested topicID and store in res.locals.topic
// Return the res.locals.topic as json data
router.get('/getTopic/:topic', apiController.getTopic, (req, res) => {
  if(!res.locals.topic) {
    res.status(200).json({message: 'No posts have been created'});
  }
  res.status(200).json(res.locals.topic);
});

// Handle POST request to /getPost
// Return an object: {post: {postContent: {_id, topic, date, ...}, comments: []}}
router.get('/getPost/:id', apiController.getPost, apiController.getComments, (req, res) => {
  if(!res.locals.post) {
    res.status(500).json({message: 'No post found with that information.'});
  }  
  res.status(200).json(res.locals.post);
});

// Handle POST request to /createPost  
router.post('/createPost', apiController.createPost, (req, res) => {
  if(!res.locals.createdPost) {
    res.status(500).json({message: 'Something went wrong creating your post.'});
  }
  res.status(200).json(res.locals.createdPost);
});

// Handle POST request to /editPost
router.post('/editPost', apiController.editPost, (req, res) => {
  if(!res.locals.editedPost) {
    res.status(500).json({message: 'Something went wrong editing your post.'});
  } 
  res.status(200).json(res.locals.editedPost);
});


// Handle POST request to /votes  
/* 
  Expected Format of req.body:
  {
    vote: 'upvote' or 'downvote'
    commentID: whatever the comment _id is 
    postID: whatever the post _id is 
  }
*/
// app.post('/votes', apiController.Votes, (req, res) => {
//   res.status(200).json(res.locals.votes);
// });

// Handle POST request to /createComment 
router.post('/createComment', apiController.createComment, (req, res) => {
  res.status(200).json('successfully created a comment');
});

// Handle DELETE request to /deleteComment  
// Handle PATCH request to /editComment  

// export as router
module.exports = router;