import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation SendMessage($messageInput: CreateMessageInput!) {
    sendMessage(messageInput: $messageInput) {
      success
      message
      data {
        message
      }
    }
  }
`;

export default SEND_MESSAGE;