import { gql, useMutation } from "@apollo/client";


const LOGIN_USER = gql`
  mutation Login($phone: Float!, $password: String!) {
    login(phone: $phone, password: $password) {
      success
      message
      user {
        _id
        accessToken
        fullName
        phone
      }
    }
  }
`;

export default LOGIN_USER;