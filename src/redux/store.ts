import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import columns from "./reducer/columns";
import rows from "./reducer/rows";
import filters from "./reducer/filters";
import measures from "./reducer/measures";
import visualizationType from "./reducer/visualizationType";

const store = configureStore({
    reducer: {
        columns,
        rows,
        filters,
        measures,
        visualizationType
    },
});


export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
