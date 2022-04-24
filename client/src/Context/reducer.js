export const actionType = {
  SET_USER: "SET_USER",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_ARTISTS: "SET_ARTISTS",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
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

    case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };

    case actionType.SET_ARTISTS:
      return {
        ...state,
        artists: action.artists,
      };

    case actionType.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };

    case actionType.SET_LANGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter,
      };

    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };

    default:
      return state;
  }
};

export default reducer;
