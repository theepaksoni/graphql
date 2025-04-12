let allUsers = [
  { id: "u001", name: "monica", age: 23 },
  { id: "u002", name: "ross", age: 24 },
  { id: "u003", name: "rachel", age: 22 },
];

let allPosts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "Awesome content",
    published: true,
    creator: "u003",
  },
  {
    id: "p002",
    title: "Refresh React",
    body: "React bootcamp",
    published: false,
    creator: "u003",
  },
  {
    id: "p003",
    title: "NodeJS for Naive",
    body: "For beginners",
    published: true,
    creator: "u001",
  },
  {
    id: "p004",
    title: "Spring in Java",
    body: "Framework of Frameworks",
    published: false,
    creator: "u002",
  },
];

let allComments = [
  { id: "c001", text: "I like it", postId: "p003", author: "u002" },
  { id: "c002", text: "Luv it", postId: "p001", author: "u001" },
  { id: "c003", text: "Not bad", postId: "p001", author: "u002" },
  { id: "c004", text: "just like that", postId: "p002", author: "u001" },
];

const db = { allUsers, allPosts, allComments };

export default db;
