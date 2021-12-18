// import { createStore } from "redux";
// import rootReducer from './rootReducer';
// const store = createStore(rootReducer);


import { configureStore } from '@reduxjs/toolkit';

import columns from "./reducer/columns";
import rows from "./reducer/rows";
import filters from "./reducer/filters";
import measures from "./reducer/measures";
const store = configureStore({
    reducer: {
        columns,
        rows,
        filters,
        measures
    },
});


export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;