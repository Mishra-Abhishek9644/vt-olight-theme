import { configureStore } from "@reduxjs/toolkit";
import diamondFiltersReducer from "./slices/diamondFiltersSlices.js";
import cartReducer from "./slices/cartSlice.js"


export const store = configureStore({
  reducer: {
    diamondFilters: diamondFiltersReducer,
    cart: cartReducer
  },
});

store.subscribe( () => {
  const state = store.getState().diamondFilters.filters;
  localStorage.setItem("diamondFilters", JSON.stringify(state))
})