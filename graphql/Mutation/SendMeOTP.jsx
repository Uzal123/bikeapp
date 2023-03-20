import { gql, useMutation } from "@apollo/client";

const SENDOTP = gql`
  mutation SendUserVerificationOtp {
    sendUserVerificationOtp {
      message
      success
    }
  }
`;

export default SENDOTP;
