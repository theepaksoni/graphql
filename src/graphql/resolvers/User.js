const User = {
  posts: (parent, args, { db }, info) => {
    return db.allPosts.filter((post) => post.creator === parent.id);
  },
  comments: (parent, args, { db }, info) => {
    return db.allComments.filter((comment) => comment.author === parent.id);
  },
};

export default User;
