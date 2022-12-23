import { gql, useMutation } from "@apollo/client";

const IMAGE_UPLOAD = gql`
  mutation Mutation($data: ImageUploadInput!) {
    uploadImage(data: $data) {
      success
      message
      data {
        key
        url
      }
    }
  }
`;

export default IMAGE_UPLOAD;
