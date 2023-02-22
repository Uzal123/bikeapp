import { gql } from "@apollo/client";

const FETCHPRODUCTS = gql`
  query FetchProduct($fetchInput: FetchProductInput!) {
    fetchProducts(fetchInput: $fetchInput) {
      success
      message
      hasNextPage
      products {
        _id
        offerType
        brand
        images {
          url
          key
        }
        createdAt
        createdBy {
          _id
        }
        title
        fuleType
        price
      }
    }
  }
`;

export default FETCHPRODUCTS;
