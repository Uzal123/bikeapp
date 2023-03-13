import { gql } from "@apollo/client";

const UPDATEBIO = gql`mutation UpdateBio($bio: String!) {
  updateBio(bio: $bio) {
    message
    profile {
      bio
    }
  }
}`;
export default UPDATEBIO;
