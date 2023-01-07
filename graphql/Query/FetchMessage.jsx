import { gql } from "@apollo/client";

const FETCH_MESSAGE = gql`
  query FetchMessages($fetchMessageInput: FetchMessagesInput!) {
    fetchMessages(fetchMessageInput: $fetchMessageInput) {
      success
      message
      data {
        _id
        sender {
          _id
        }
        receiver {
          _id
        }
        message
      }
    }
  }
`;

export default FETCH_MESSAGE;