import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation SendMessage($messageInput: CreateMessageInput!) {
    sendMessage(messageInput: $messageInput) {
      success
      message
      data {
        _id
        message
        receiver {
          _id
          fullName
        }
        sender {
          _id
          fullName
        }
        status
      }
    }
  }
`;

export default SEND_MESSAGE;