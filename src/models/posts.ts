import { createModel } from '@rematch/core';
import Posts from '.././out/PostList.json';

Posts.sort((a, b) => {
  if (a.date > b.date) {
    return -1;
  } else {
    return 0;
  }
});

const posts = createModel({
  state: Posts,
});

export default posts;