import { GraphQLError } from "graphql";
import { v4 } from "uuid";

const Mutation = {
  createUser: (parent, args, { db }, info) => {
    const { name, age } = args;
    let newUser = { name, age, id: v4() };
    db.allUsers.push(newUser);
    return newUser;
  },
  deleteUser: (parent, args, { db }, info) => {
    const position = db.allUsers.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError("Unable to delete user for id - " + args.userId);
    }

    db.allPosts = db.allPosts.filter((post) => {
      const isMatch = post.creator === args.userId;
      if (isMatch) {
        db.allComments = db.allComments.filter(
          (comment) => comment.postId !== post.id
        );
      }
      return !isMatch;
    });

    db.allComments = db.allComments.filter(
      (comment) => comment.author !== args.userId
    );

    const [deletedUser] = db.allUsers.splice(position, 1);
    return deletedUser;
  },
  updateUser: (parent, args, { db }, info) => {
    const { name, age } = args.data;
    const position = db.allUsers.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError("Unable to update user for id - " + args.userId);
    }
    if (typeof name === "string") {
      db.allUsers[position].name = name;
    }

    if (typeof age === "number") {
      db.allUsers[position].age = age;
    }

    return db.allUsers[position];
  },
  createPost: (parent, args, { db, pubsub }, info) => {
    const { title, body, creatorId } = args.data;
    const position = db.allUsers.findIndex((user) => user.id === creatorId);
    if (position === -1) {
      throw new GraphQLError("Unable to find creator for id - " + creatorId);
    }
    let newPost = {
      id: v4(),
      title,
      body,
      published: false,
      creator: creatorId,
    };
    db.allPosts.push(newPost);
    pubsub.publish("post-channel", { post: newPost, mutation: "CREATED" });
    return newPost;
  },
  deletePost: (parent, args, { db, pubsub }, info) => {
    const position = db.allPosts.findIndex((post) => post.id === args.postId);
    if (position === -1) {
      throw new GraphQLError("Unable to delete post for Id - " + args.postId);
    }
    db.allComments = db.allComments.filter(
      (comment) => comment.postId !== args.postId
    );
    const [deletedPost] = db.allPosts.splice(position, 1);
    pubsub.publish("post-channel", { post: deletedPost, mutation: "DELETED" });
    return deletedPost;
  },
  updatePost: (parent, args, { db }, info) => {
    const { title, body, published } = args.data;
    const position = db.allPosts.findIndex((post) => post.id === args.postId);
    if (position === -1) {
      throw new GraphQLError(
        "Unable to update the post for id - " + args.postId
      );
    }
    if (typeof title === "string") {
      db.allPosts[position].title = title;
    }
    if (typeof body === "string") {
      db.allPosts[position].body = body;
    }
    if (typeof published === "boolean") {
      db.allPosts[position].published = published;
    }
    return db.allPosts[position];
  },
  createComment: (parent, args, { db, pubsub }, info) => {
    const { text, postId, authorId } = args.data;
    const postPosition = db.allPosts.findIndex((post) => post.id === postId);
    if (postPosition === -1) {
      throw new GraphQLError("Unable to find post for id - " + postId);
    }

    const userPosition = db.allUsers.findIndex((user) => user.id === authorId);
    if (userPosition === -1) {
      throw new GraphQLError("Unable to find author for ID - " + authorId);
    }

    let newComment = {
      id: v4(),
      text,
      postId,
      author: authorId,
    };
    db.allComments.push(newComment);
    pubsub.publish("comment-channel", {
      comment: newComment,
      mutation: "CREATED",
    });
    return newComment;
  },
  deleteComment: (parent, args, { db, pubsub }, info) => {
    const position = db.allComments.findIndex(
      (comment) => comment.id === args.commentId
    );
    if (position === -1) {
      throw new GraphQLError(
        "Unable to delete comment for Id -- " + args.commentId
      );
    }
    const [deletedComment] = db.allComments.splice(position, 1);
    pubsub.publish("comment-channel", {
      comment: deletedComment,
      mutation: "DELETED",
    });
    return deletedComment;
  },
};

export default Mutation;
