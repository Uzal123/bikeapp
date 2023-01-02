import { gql } from "@apollo/client";

const UPLOAD_PROFILE_PIC = gql`
  mutation UploadProfilePic($image: Upload!) {
    uploadProfilePic(imageUploadInput: { image: $image }) {
      success
      message
      profile {
        user {
          fullName
          username
        }
        profilePic {
          imageKey
          url
        }
      }
    }
  }
`;

export default UPLOAD_PROFILE_PIC