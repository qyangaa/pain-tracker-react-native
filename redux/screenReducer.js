const screenState = {
  screens: [],
};

export default function screenReducer(state = screenState, action) {
  switch (action.type) {
    case "TOGGLE_OPTION":
      const type = action.payload.type;
      const optionId = action.payload.optionId;
      const newScreens = [...screenState.screens];
      const typeIdx = newScreens.findIndex((screen) => screen.type === type);
      const optionIdx = newScreens[typeIdx].options.findIndex(
        (option) => option.id === optionId
      );
      newScreens[typeIdx].options[optionIdx].selected = !newScreens[typeIdx]
        .options[optionIdx].selected;
      return { screens: newScreens };
    case "DELETE_SCREEN":
      return {
        screens: state.screens.filter((screens) => screens !== action.payload),
      };
    default:
      return state;
  }
}