import { gql } from "@apollo/client";


const CREATING_SELL = gql`
  mutation Mutation($sellProductInput: CreateSellProductInput!) {
    sellProduct(sellProductInput: $sellProductInput) {
      success
      message
      sellProduct {
        title
        brand
        description
        price
        images {
          url
          key
        }
      }
    }
  }
`;

export default CREATING_SELL;