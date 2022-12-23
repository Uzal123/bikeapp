import { gql } from "@apollo/client";

const CREATING_RENT = gql`
  mutation CreatingRent($rentProductInput: CreateRentProductInput!) {
    rentProduct(rentProductInput: $rentProductInput) {
      success
      message
      rentProduct {
        brand
        images {
          url
          key
        }
        title
        description
        price
      }
    }
  }
`;

export default CREATING_RENT;
