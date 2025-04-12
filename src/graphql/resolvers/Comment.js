const Comment = {
  post: (parent, args, { db }, info) => {
    return db.allPosts.find((post) => post.id === parent.postId);
  },
  author: (parent, args, { db }, info) => {
    return db.allUsers.find((user) => user.id === parent.author);
  },
};

export default Comment;
