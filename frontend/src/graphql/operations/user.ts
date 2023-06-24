import { gql } from "@apollo/client";

export default {
  Queries: {
    searchUsers: gql`
      query Query($username: String!) {
        searchUsers(username: $username) {
          id
          username
          image
        }
      }
    `,
  },
  Mutation: {
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptons: {},
};
