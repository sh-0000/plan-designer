const library_reducer = (state, action) => {
  if (action.type === "GET_ICONS_REQUEST_START") {
    return { ...state, icons_loading: true };
  }
  if (action.type === "GET_ICONS_REQUEST_SUCCESS") {
    return { ...state, icons: action.payload, icons_loading: false };
  }
  if (action.type === "GET_ICONS_REQUEST_ERROR") {
    return { ...state, icons_loading: false, icons_error: true };
  }
};
export default library_reducer;
