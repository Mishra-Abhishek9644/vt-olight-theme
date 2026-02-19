import { createSlice } from "@reduxjs/toolkit";

const tooltipSlice = createSlice({
  name: "tooltip",
  initialState: {
    key: null,           // unique identifier where tooltip is used
    content: "",         // message/text/html
    isOpen: false,       // tooltip visibility
    position: "top"      // optional: placement
  },

  reducers: {
    openTooltip: (state, action) => {
      state.key = action.payload.key;
      state.content = action.payload.content;
      state.position = action.payload.position || "top";
      state.isOpen = true;
    },

    closeTooltip: (state) => {
      state.isOpen = false;
      state.key = null;
      state.content = "";
    }
  }
});

export const { openTooltip, closeTooltip } = tooltipSlice.actions;
export default tooltipSlice.reducer;
