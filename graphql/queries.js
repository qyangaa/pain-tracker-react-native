import { gql } from "graphql-request";

export const getLastUsed = gql`
  {
    lastUsed {
      _id
      screenType
      hasDuration
      title
      backgroundImage
      options {
        _id
        categoryId
        src
        srcActive
        title
        selected
        duration
        amount
      }
    }
  }
`;
