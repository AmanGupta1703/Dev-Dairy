import { createSlice } from "@reduxjs/toolkit";

export type TPost = {
  $id: string;
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
  description: string;
};

type TInitialState = {
  posts: Array<TPost>;
};

const initialState: TInitialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { addPosts } = postsSlice.actions;

export default postsSlice.reducer;
