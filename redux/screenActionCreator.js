export const getLastUsed = (token) => {
  console.log("In getLastUsed", token);
  return async (dispatch) => {
    console.log("In getLastUsed dispatch");
    return;
  };
};

export const addScreen = (screen) => ({
  type: "ADD_SCREEN",
  payload: screen,
});

export const deleteScreen = (screen) => ({
  type: "DELETE_SCREEN",
  payload: screen,
});

export const toggleOption = (option) => ({
  type: "TOGGLE_OPTION",
  payload: option,
});
