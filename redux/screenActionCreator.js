import * as queries from "../graphql/queries";
import * as ActionTypes from "./ActionTypes";
import { client } from "../graphql/graphqlConfig";

export const getLastUsed = (token) => {
  return async (dispatch) => {
    try {
      const data = await client.request(queries.getLastUsed);
      data.lastUsed.forEach((item) => (item.image_url = item.backgroundImage));
      console.log("fetching last used");
      dispatch({ type: ActionTypes.ADD_ALL_SCREENS, payload: data.lastUsed });
    } catch (error) {
      throw error;
    }
  };
};

export const addScreen = (screen) => ({
  type: ActionTypes.ADD_SCREEN,
  payload: screen,
});

export const addAllScreens = (screen) => ({
  type: ActionTypes.ADD_ALL_SCREENS,
  payload: screen,
});

export const deleteScreen = (screen) => ({
  type: ActionTypes.DELETE_SCREEN,
  payload: screen,
});

export const toggleOption = (optionId, categoryId, duration, setTime) => ({
  type: ActionTypes.TOGGLE_OPTION,
  payload: { optionId, categoryId, duration, setTime },
});

export const addOption = (option) => ({
  type: ActionTypes.ADD_OPTION,
  payload: { option },
});
