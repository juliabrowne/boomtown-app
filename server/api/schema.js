const { gql } = require('apollo-server-express');
module.exports = gql`
  scalar Upload
  scalar Date
  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    ownerid: User!
    tags: [Tag]
    
    borrower: User
  }
  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }
  type Tag {
    id: ID!
    title: String!
  }
  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }
  input AssignedTag {
    id: ID!
    title: String!
  }
  input AssignedBorrower {
    id: ID!
  }
  input NewItemInput {
    title: String!
    description: String
    tags: [String]!
  }
  input NewUserInsert {
    email: String!
    fullname: String!
    password: String!
  }
  input Login {
    email: String!
    password: String!
  }
  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    item(id: ID): Item
    tags: [Tag]
  }
  type Mutation {
    addItem(item: NewItemInput!): Item
    signup(input: NewUserInsert!): User
    login(input: Login): User
    logout: Boolean
  }
`;
