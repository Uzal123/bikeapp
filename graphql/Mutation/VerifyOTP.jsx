import { gql, useMutation } from "@apollo/client";

const VERIFYOTP = gql`
  mutation Mutation($otp: String!, $phone: Float!) {
    verifyOtp(otp: $otp, phone: $phone) {
      message
      success
      user {
        phone
        verifiedPhone
        fullName
        _id
        accessToken
      }
    }
  }
`;

export default VERIFYOTP;
