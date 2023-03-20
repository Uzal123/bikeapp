import { gql } from "@apollo/client";

const RESET_PASSWORD = gql`mutation ResetPassword($phone: Float!, $newPassword: String!, $otp: String!) {
  resetPassword(phone: $phone, newPassword: $newPassword, otp: $otp) {
    message
    success
    user {
      accessToken
      _id
      fullName
      phone
      verifiedPhone
    }
  }
}`;

export default RESET_PASSWORD;