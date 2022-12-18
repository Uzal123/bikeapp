import { gql } from "@apollo/client";

const CREATING_RENT = gql`mutation CreatingRent($rentProductInput: CreateRentProductInput!) {
  rentProduct(rentProductInput: $rentProductInput) {
    success
    message
    rentProduct {
      title
      description
      price
      createdAt
      vehicleType
      _id
    }
  }
}`;

export default CREATING_RENT;
