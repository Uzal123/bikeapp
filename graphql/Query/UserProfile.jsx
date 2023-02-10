import { gql } from "@apollo/client";

const USER_PROFILE = gql`
  query GetUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      message
      profile {
        profilePic {
          imageKey
          url
        }
        user {
          fullName
          _id
        }
        _id
      }
      success
    }
  }
`;

export default USER_PROFILE;