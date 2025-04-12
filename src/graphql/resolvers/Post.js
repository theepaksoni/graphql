const Post = {
    creator: (parent, args, { db }, info) => {
      return db.allUsers.find((user) => user.id === parent.creator);
    },
    comments: (parent, args, { db }, info) => {
      return db.allComments.filter((comment) => comment.postId === parent.id);
    },
  };
  
  export default Post;
  