
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";

// Async thunk to fetch diet experts
export const getAllDietExpert = createAsyncThunk(
  "expert/getAllDietExpert",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("auth/ourexpert"); // <-- change to your real API
      return response.data.data; // Make sure API returns array of experts
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const expertSlice = createSlice({
  name: "expert",
  initialState: {
    dietExpert: [], 
    isLoading: false, 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDietExpert.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllDietExpert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dietExpert = action.payload; // store API response here
      })
      .addCase(getAllDietExpert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default expertSlice.reducer;
