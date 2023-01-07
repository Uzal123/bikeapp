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
        title
        fuleType
      }
    }
  }
`;

export default FETCHPRODUCTS;