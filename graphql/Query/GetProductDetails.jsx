import { gql } from "@apollo/client";

const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails(
    $productId: String!
    $fetchInput: FetchProductInput!
  ) {
    getProductDetails(productId: $productId) {
      success
      message
      product {
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
        _id
        price
        priceType
        location {
          coordinates
          location
        }
        kmRun
        lotNo
        madeYear
        milege
        transmission
        usedFor
        vehicleCondition
        engine
        createdAt
        createdBy {
          fullName
          _id
        }
        profile {
          profilePic {
            imageKey
            url
          }
        }
      }
    }
    fetchProducts(fetchInput: $fetchInput) {
      success
      message
      products {
        _id
        offerType
        price
        title
        images {
          url
          key
        }
        createdAt
        createdBy {
          _id
        }
      }
    }
  }
`;

export default GET_PRODUCT_DETAILS;
