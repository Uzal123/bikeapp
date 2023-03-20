import { gql } from "@apollo/client";

const FORGETPASSWORD = gql`mutation Mutation($phone: Float!) {
  sendForgotPasswordOtp(phone: $phone) {
    message
    success
    user {
      _id
    }
  }
}`

export default FORGETPASSWORD;