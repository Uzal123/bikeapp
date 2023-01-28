import { gql } from "@apollo/client"

const MY_PRODUCTS = gql`
  query MyProducts($fetchInput: FetchProductInput!) {
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
  }
`;

export default MY_PRODUCTS;