import { gql, useQuery } from "@apollo/client";

const GET_RENTED = gql`
  query GetAllRentedProducts {
    getAllRentedProducts {
      brand
      title
      description
      createdAt
      price
    }
  }
`;

export default GET_RENTED;
