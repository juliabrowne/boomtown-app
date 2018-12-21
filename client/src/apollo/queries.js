import gql from 'graphql-tag';

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    description
   
    tags {
      id
      title
    }
    ownerid {
      fullname
      email
    }
  }
`;

export const ITEM_QUERY = gql`
  query item($id: ID!) {
    item(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(item: $item) {
      title
      description
      tags {
        id
        title
      }
    }
  }
`;

export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($input: NewUserInsert!) {
    signup(input: $input) {
      id
      email
      fullname
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($input: Login!) {
    login(input: $input) {
      id
    }
  }
`;
