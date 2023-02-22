import { gql } from "@apollo/client";

const USER_PRODUCTS = gql`
  query ($fetchInput: FetchProductInput!, $userId: String!) {
    getUserProducts(fetchInput: $fetchInput, userId: $userId) {
      message
      products {
        _id
        price
        title
        images {
          key
          url
        }
        createdAt
        createdBy {
          _id
        }
      }
    }
  }
`;

export default USER_PRODUCTS;
