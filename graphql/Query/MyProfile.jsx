import { gql, useQuery } from "@apollo/client";

const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      success
      message
      profile {
        profilePic {
          imageKey
          url
        }
        user {
          _id
          accessToken
          createdAt
          fullName
          email
          updatedAt
          username
        }
        _id
      }
    }
  }
`;

export default MY_PROFILE;
