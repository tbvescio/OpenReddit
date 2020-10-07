const initialState = { isLogged: false, token: null, username: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isLogged: true,
        token: action.payload.token,
        username: action.payload.username,
      };
    case "SIGN_OUT":
      return initialState
    default:
      return state;
  }
};

export default authReducer;
