import { gql } from "@apollo/client";

const FETCHPRODUCTS = gql`
  query FetchProduct($fetchInput: FetchProductInput!) {
    fetchProducts(fetchInput: $fetchInput) {
      success
      message
      products {
        _id
        offerType
        brand
        images {
          url
          key
        }
        createdAt
        title
        fuleType
        price
      }
    }
  }
`;

export default FETCHPRODUCTS;