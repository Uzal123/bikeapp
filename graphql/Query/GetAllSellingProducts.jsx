import { gql, useQuery } from "@apollo/client";

const GET_SELLING = gql`
  query getAllSellingProducts {
    getAllSellingProducts {
      title
      price
      description
    }
  }
`;

export default GET_SELLING;
