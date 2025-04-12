let Subscription = {
    post: {
      subscribe: (parent, args, { db, pubsub }, info) => {
        return pubsub.subscribe("post-channel");
      },
      resolve: (payload) => payload,
    },
    comment: {
      subscribe: (parent, args, { db, pubsub }, info) => {
        return pubsub.subscribe("comment-channel");
      },
      resolve: (payload) => payload,
    },
  };
  
  export default Subscription;
  