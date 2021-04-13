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

export const createRecords = gql`
  mutation createRecords(
    $records: [recordInput!]!
    $geoCoordinates: geoCoordinates
  ) {
    createRecords(records: $records, geoCoordinates: $geoCoordinates)
  }
`;

export const searchOption = gql`
  query searchOption($text: String!, $categoryId: String!) {
    searchOption(text: $text, categoryId: $categoryId) {
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
`;

export const getPainDayData = gql`
  query getPainDayData($numMonths: String!) {
    getPainDayData(numMonths: $numMonths) {
      title
      seriesData {
        xlabel
        ylabel
        data {
          x
          y
        }
      }
    }
  }
`;
