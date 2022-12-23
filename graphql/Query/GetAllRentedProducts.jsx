import { gql, useQuery } from "@apollo/client";

const GET_RENTED = gql`
  query GetAllRentedProducts {
    getAllRentedProducts {
      title
      createdAt
      price
      images {
        key
        url
      }
      _id
      vehicleType
    }
  }
`;

export default GET_RENTED;
