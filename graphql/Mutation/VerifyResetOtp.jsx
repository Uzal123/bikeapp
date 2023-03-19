import { gql } from "@apollo/client";

const VERFYRESETOTP = gql`
mutation VerifyResetOTP($otp: String!, $phone: Float!) {
  verifyResetOTP(otp: $otp, phone: $phone) {
    message
    success
    user {
      _id
    }
  }
}`;

export default VERFYRESETOTP;