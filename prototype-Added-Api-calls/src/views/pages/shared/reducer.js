export const initialState = {
  user: null,
};

export const allActionTypes = {
  SETUSER: "SETUSER",
  GETUSER: "GETUSER",
  LOGOUT_USER: "LOGOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case allActionTypes.SETUSER: {
      return { ...state, user: action.action };
    }

    case allActionTypes.GETUSER: {
      return { ...state };
    }
    case allActionTypes.LOGOUT_USER: {
      localStorage.removeItem("user");
      return { ...state, user: null };
    }

    default:
      return state;
  }
};

export default reducer;
