import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  loading: false,
  error: "",
};

export const getData = createSlice({
  name: "getData",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.reviews = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload;
      state.error = "";
    },
    fetchError(state, action) {
      state.loading = false;
      state.reviews = [];
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchError } = getData.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const { data } = await axios.get(
      "https://doggieverse.dickytaruna.online/dogs",
      {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      }
    );
    dispatch(fetchSuccess(data.dataDogs));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export default getData.reducer;
