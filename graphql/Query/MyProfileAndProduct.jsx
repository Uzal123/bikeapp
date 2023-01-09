import { gql, useQuery } from "@apollo/client";

const MY_PROFILE_AND_PRODUCT = gql`
  query MyProductsandMyProfile($fetchInput: FetchProductInput!) {
    myProducts(fetchInput: $fetchInput) {
      success
      message
      products {
        _id
        images {
          url
          key
        }
        title
        price
        createdAt
      }
    }
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

export default MY_PROFILE_AND_PRODUCT;
