import { gql } from "@apollo/client";

const GET_SELL_DETAILS = gql`
  query Query($productId: String!) {
    getSellProductDetails(productId: $productId) {
      success
      message
      sellProduct {
        _id
        createdBy {
          fullName
          _id
        }
        vehicleType
        title
        brand
        fuleType
        kmRun
        madeYear
        color
        lotNo
        usedFor
        transmission
        milege
        vehicleCondition
        engine
        description
        price
        images {
          url
          key
        }
        updatedAt
        createdAt
        priceType
      }
    }
  }
`;

export default GET_SELL_DETAILS;