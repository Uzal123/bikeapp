import { gql, useMutation } from "@apollo/client";

const VERIFYOTP = gql`
  mutation VerifyUserPhone($phone: Float!, $otp: String!) {
    verifyUserPhone(phone: $phone, otp: $otp) {
      message
      success
      user {
        _id
        accessToken
        fullName
        phone
        verifiedPhone
      }
    }
  }
`;

export default VERIFYOTP;
