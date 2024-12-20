// import { createStore, combineReducers } from "redux";
// import noteSlice from "./reducer/notereducers";

// const rootReducer = combineReducers({
//   home: noteSlice.reducer,
// });

// const store = createStore(rootReducer);

// export default store;
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import notereducers from "./reducer/notereducers";

export const store = configureStore({
  reducer: { home: notereducers },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
