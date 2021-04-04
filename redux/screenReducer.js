import * as ActionTypes from "./ActionTypes";

const screenState = {
  screens: [],
};

export default function screenReducer(state = screenState, action) {
  let newScreens;
  let categoryIdx;
  let optionIdx;
  let categoryId;
  let optionId;
  switch (action.type) {
    case ActionTypes.ADD_ALL_SCREENS:
      action.payload.push({ final: true, _id: "-1" });
      return { screens: action.payload };
    case ActionTypes.TOGGLE_OPTION:
      optionId = action.payload.optionId;
      categoryId = action.payload.categoryId;
      duration = action.payload.duration;
      newScreens = [...state.screens];
      categoryIdx = newScreens.findIndex((screen) => screen._id === categoryId);
      optionIdx = newScreens[categoryIdx].options.findIndex(
        (option) => option._id === optionId
      );

      const selectedOption = newScreens[categoryIdx].options[optionIdx];
      console.log({ duration });
      if (
        newScreens[categoryIdx].hasDuration &&
        duration &&
        duration != selectedOption.duration
      )
        selectedOption.duration = duration;
      else
        selectedOption.selected = !newScreens[categoryIdx].options[optionIdx]
          .selected;
      return { screens: newScreens };
    case ActionTypes.ADD_OPTION:
      newScreens = [...state.screens];
      const newOption = action.payload.option;
      categoryId = newOption.categoryId;

      categoryIdx = newScreens.findIndex(
        (screen) => screen._id === newOption.categoryId
      );
      optionIdx = newScreens[categoryIdx].options.findIndex(
        (option) => option._id === newOption._id
      );
      if (optionIdx == -1) newScreens[categoryIdx].options.push(newOption);
      return { screens: newScreens };

    case ActionTypes.DELETE_SCREEN:
      return {
        screens: state.screens.filter((screens) => screens !== action.payload),
      };
    default:
      return state;
  }
}
