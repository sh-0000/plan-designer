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

  if (action.type === "OPEN_MODAL") {
    return { ...state, isModalOpen: true };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }

  if (action.type === "ADD_ICON_SUCCESS") {
    const icon = action.payload;
    const { icons } = state;
    return {
      ...state,
      isModalOpen: false, //close the modal
      icons: [...icons, { ...icon }], //push the new data to the state
    };
  }

  if (action.type === "ADD_ICON_FAIL") {
    console.log("FAILED TO ADD ICON");
    return { ...state };
  }

  if (action.type === "DELETE_ICON_SUCCESS") {
    const id = action.payload;
    let { icons } = state;
    icons = icons.filter((icon) => icon.id !== id);
    return { ...state, icons: icons };
  }
  if (action.type === "DELETE_ICON_ERROR") {
    console.log("Failed to delete Icon");
    return { ...state };
  }
};
export default library_reducer;
