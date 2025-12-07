// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState={
//     isLoading: false,
//     dietExpert:[],
//     error: null
// }

// export const getAllDietExpert = createAsyncThunk("/expert",async()=>{
//   try {
//     const res = await axiosInstance.get("auth/ourexpert");
//     console.log("Final URL:", res.config.baseURL + res.config.url);
//     toast.success(res?.data?.message||"Expert fetched successfully")
//     return res.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// })

// const expertSlice = createSlice({
//     name:'expert',
//     initialState,
//     reducers:{},
//     extraReducers :(builder)=>{
//        builder.addCase(getAllDietExpert.fulfilled, (state,action)=>{
//         state.isLoading = false
//          state.dietExpert = action.payload?.data
//        })
//        builder.addCase(getAllDietExpert.rejected,(state,action)=>{
//           state.isLoading = false
//           state.error = action.payload ||"Failed to fetch diet expert"
//        })
//        builder.addCase(getAllDietExpert.pending,(state,action)=>{
//         state.isLoading = true,
//         state.error = null
//        })
//     }

// })

// const {} = expertSlice.actions
// export default expertSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
