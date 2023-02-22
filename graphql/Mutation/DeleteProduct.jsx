import { gql } from "@apollo/client";

const DELETEPRODUCT = gql`
  mutation DeleteProductById($productId: String!) {
    deleteProductById(productId: $productId) {
      message
      success
      product {
        title
      }
    }
  }
`;

export default DELETEPRODUCT;
