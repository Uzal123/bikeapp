import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation Mutation($user: CreateUserInput!) {
    register(user: $user) {
      message
      success
      user {
        _id
        accessToken
        createdAt
        phone
        fullName
        verifiedPhone
      }
    }
  }
`;

export default REGISTER_USER;