import React, { createContext, useReducer } from "react";

const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const PostListProvider = ({ children }) => {
  const [postList, dispathPostList] = useReducer();

  return <PostListProvider value={[]}>{children}</PostListProvider>;
};

export default PostListProvider;
