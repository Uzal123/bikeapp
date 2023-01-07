import { gql } from "@apollo/client";


const CREATING_SELL = gql`
  mutation CreatingSell($sellProductInput: CreateSellProductInput!) {
    sellProduct(sellProductInput: $sellProductInput) {
      success
      message
      product {
        _id
        createdBy {
          fullName
          _id
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
        kmRun
        madeYear
        lotNo
        transmission
        milege
        usedFor
        vehicleCondition
        engine
        createdAt
        updatedAt
      }
    }
  }
`;

export default CREATING_SELL;