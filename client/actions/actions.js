import * as types from '../constants/actionTypes';

export const loadAllCodeBlocksActionCreator = (codeBlocks) => ({
  type: types.LOAD_ALL_CODEBLOCKS,
  payload: codeBlocks,
});