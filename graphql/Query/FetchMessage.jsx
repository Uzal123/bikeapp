import { gql } from "@apollo/client";

const FETCH_MESSAGE = gql`
  query FetchMessages($fetchMessageInput: FetchMessagesInput!) {
    fetchMessages(fetchMessageInput: $fetchMessageInput) {
      success
      message
      profile {
        profilePic {
          url
          imageKey
        }
      }
      data {
        _id
        receiver {
          _id
          fullName
        }
        sender {
          _id
          fullName
        }
        message
      }
    }
  }
`;

export default FETCH_MESSAGE;
