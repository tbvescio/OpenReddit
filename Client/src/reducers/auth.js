const initialState = { isLogged: false, token: "" };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isLogged: true,
        token: action.payload,
      };
    case "SIGN_OUT":
      return initialState
    default:
      return state;
  }
};

export default authReducer;
