import { gql } from "@apollo/client";

const FETCH_CHAT = gql`
  query FetchChat {
    fetchChat {
      _id
      user1 {
        _id
        fullName
      }
      user2 {
        _id
        fullName
      }
      product {
        _id
        images {
          key
          url
        }
        title
      }
    }
  }
`; 

export default FETCH_CHAT;