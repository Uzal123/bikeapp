import { gql, useMutation } from "@apollo/client";

const SENDOTP = gql`
  mutation SendMeOtp {
    sendMeOtp {
      message
      success
      user {
        verifiedPhone
        phone
        fullName
        accessToken
        _id
      }
    }
  }
`;

export default SENDOTP;
