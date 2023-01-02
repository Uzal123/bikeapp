import { gql } from "@apollo/client";

const GET_RENT_DETAILS = gql`
  query GetRentProductDetails($productId: String!) {
    getRentProductDetails(productId: $productId) {
      success
      message
      rentProduct {
        _id
        createdBy {
          fullName
          _id
        }
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
        createdAt
        updatedAt
      }
    }
    getAllRentedProducts {
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
`;

export default GET_RENT_DETAILS;
