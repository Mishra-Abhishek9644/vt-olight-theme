import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const savedDiamond = JSON.parse(localStorage.getItem("selectedDiamond"));
const savedSetting = JSON.parse(localStorage.getItem("selectedSetting"));

const initialState = {
  selectedDiamond: savedDiamond || null,
  selectedSetting: savedSetting || null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setDiamond: (state, action) => {
      state.selectedDiamond = action.payload;

      // Save to localStorage
      localStorage.setItem("selectedDiamond", JSON.stringify(action.payload));
    },

    setSetting: (state, action) => {
      state.selectedSetting = action.payload;

      // Save to localStorage
      localStorage.setItem("selectedSetting", JSON.stringify(action.payload));
    },

    clearDiamond: (state) => {
      state.selectedDiamond = null;
      localStorage.removeItem("selectedDiamond");
    },

    clearSetting: (state) => {
      state.selectedSetting = null;
      localStorage.removeItem("selectedSetting");
    },
  },
});

export const { setDiamond, setSetting, clearDiamond, clearSetting } =
  cartSlice.actions;

export default cartSlice.reducer;
