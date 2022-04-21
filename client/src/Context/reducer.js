export const actionType = {
  SET_USER: "SET_USER",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    default:
      return state;
  }
};

export default reducer;
