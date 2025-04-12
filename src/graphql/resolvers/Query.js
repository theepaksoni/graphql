const Query = {
    users: (parent, args, { db }, info) => {
      if (args.name) {
        return db.allUsers.filter((user) => user.name.includes(args.name));
      }
      return db.allUsers;
    },
    posts: (parent, args, { db }, info) => {
      if (args.search) {
        return db.allPosts.filter((post) => {
          return (
            post.title.toLowerCase().includes(args.search.toLowerCase()) ||
            post.body.toLowerCase().includes(args.search.toLowerCase())
          );
        });
      }
      return db.allPosts;
    },
    comments: (parent, args, { db }, info) => db.allComments,
  };
  
  export default Query;
  