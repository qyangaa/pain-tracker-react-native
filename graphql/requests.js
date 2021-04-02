import { request } from "graphql-request";
import * as queries from "./queries";
import { client } from "./graphqlConfig";

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
