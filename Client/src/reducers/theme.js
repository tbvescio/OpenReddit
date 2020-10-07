const themeReducer = (state = "light", action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      let result = state === "light" ? "dark" : "light";
      return result;
    default:
      return state;
  }
};

export default themeReducer;
