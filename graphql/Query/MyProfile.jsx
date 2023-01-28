import { gql, useQuery } from "@apollo/client";

const MY_PROFILE = gql`
  query MyProductsandMyProfile {
    myProfile {
      success
      message
      profile {
        profilePic {
          url
          imageKey
        }
        user {
          fullName
          _id
          accessToken
        }
      }
    }
  }
`;

export default MY_PROFILE;
