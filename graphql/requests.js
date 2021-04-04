import { request } from "graphql-request";
import * as queries from "./queries";
import { client } from "./graphqlConfig";
import _ from "lodash";

export const createRecords = async (rawRecords) => {
  const records = [];
  for (const category of rawRecords) {
    if (!category.options) continue; //skip final screen place holder
    const categoryId = category._id;
    for (const option of category.options) {
      records.push(option);
    }
  }
  const variables = {
    records,
    geoCoordinates: {
      lon: -121.9808,
      lat: 37.5502,
    },
  };
  const data = await client.request(queries.createRecords, variables);
};

export const searchOption = async (text, categoryId) => {
  if (!text) return [];
  const variables = {
    text,
    categoryId,
  };
  const data = await client.request(queries.searchOption, variables);
  return data.searchOption;
};
