import { gql, useMutation } from "@apollo/client";


const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      user {
        _id
        accessToken
        fullName
        email
      }
    }
  }
`;

export default LOGIN_USER;