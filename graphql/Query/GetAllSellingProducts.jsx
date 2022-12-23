import { gql, useQuery } from "@apollo/client";

const GET_SELLING = gql`
  query getAllSellingProducts {
    getAllSellingProducts {
      title
      price
      _id
      vehicleType
      images {
        key
        url
      }
      createdAt
    }
  }
`;

export default GET_SELLING;
