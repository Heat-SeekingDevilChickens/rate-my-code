/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';
import postsReducer from './postsReducer';

// import all reducers here
 
 
// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  codeBlocks: postsReducer,
});
 
// make the combined reducers available for import
export default reducers;