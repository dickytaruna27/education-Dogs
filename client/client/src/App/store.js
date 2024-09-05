import { configureStore } from "@reduxjs/toolkit";
import getData from "../features/getData";
export const store = configureStore({
  reducer: {
    getData,
  },
});
