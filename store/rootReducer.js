import { combineReducers } from "@reduxjs/toolkit";
import { reducer as termsModalReducer } from "../slices/terms-modal";

const rootReducer = combineReducers({
  termsModal: termsModalReducer,
  // Just insert more reducers/slices here
});

export default rootReducer;
// THIS IS A CENTRALIZE REDUCER FN FOR COMPACT MAINTAINANCE
