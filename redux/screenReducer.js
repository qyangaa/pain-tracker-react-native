import * as ActionTypes from "./ActionTypes";

const screenState = {
  screens: [],
};

export default function screenReducer(state = screenState, action) {
  switch (action.type) {
    case ActionTypes.ADD_ALL_SCREENS:
      action.payload.push({ final: true, _id: "-1" });
      return { screens: action.payload };
    case ActionTypes.TOGGLE_OPTION:
      const { optionId, categoryId } = action.payload;
      const newScreens = [...state.screens];
      const categoryIdx = newScreens.findIndex(
        (screen) => screen._id === categoryId
      );
      const optionIdx = newScreens[categoryIdx].options.findIndex(
        (option) => option._id === optionId
      );

      newScreens[categoryIdx].options[optionIdx].selected = !newScreens[
        categoryIdx
      ].options[optionIdx].selected;
      return { screens: newScreens };
    case ActionTypes.DELETE_SCREEN:
      return {
        screens: state.screens.filter((screens) => screens !== action.payload),
      };
    default:
      return state;
  }
}
