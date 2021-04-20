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

export const getDailyTotal = gql`
  query getDailyTotal(
    $categoryId: String!
    $categoryName: String!
    $numMonths: String!
    $type: String!
  ) {
    getDailyTotal(
      categoryId: $categoryId
      categoryName: $categoryName
      numMonths: $numMonths
      type: $type
    ) {
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

export const getContribution = gql`
  query getContribution(
    $categoryId: String!
    $categoryName: String!
    $optionId: String!
    $optionName: String!
    $numMonths: String!
    $extension: String!
  ) {
    getContribution(
      categoryId: $categoryId
      categoryName: $categoryName
      optionId: $optionId
      optionName: $optionName
      numMonths: $numMonths
      extension: $extension
    ) {
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
