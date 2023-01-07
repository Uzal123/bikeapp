import { gql } from "@apollo/client";

const CREATING_RENT = gql`
  mutation CreatingRent($rentProductInput: CreateRentProductInput!) {
    rentProduct(rentProductInput: $rentProductInput) {
      success
      message
      product {
        _id
        createdBy {
          _id
          fullName
        }
        offerType
        vehicleType
        brand
        images {
          url
          key
        }
        title
        fuleType
        color
        description
        price
        priceType
        location {
          coordinates
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export default CREATING_RENT;
