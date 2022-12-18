import { gql, useQuery } from "@apollo/client";

const ME = gql`
  query Me {
    me {
      message
      success
      user {
        _id
        accessToken
        createdAt
        fullName
        email
        password
        updatedAt
        username
      }
    }
  }
`;

export default ME;
