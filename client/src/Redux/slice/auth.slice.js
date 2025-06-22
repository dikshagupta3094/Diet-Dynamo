import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) == true||false,
  data: JSON.parse(localStorage.getItem("data"))|| {},
  role :JSON.parse(localStorage.getItem("role"))||"",
};

export const createAccount =
  createAsyncThunk('/signUp',
  async (data) => {
    try {
      const res = axiosInstance.post(
        "auth/register",
        data
      );
      console.log("Data Inside redux slice",res);
     
      toast.promise(res, {
        loading: "Wait, creating you account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to create account",
      });
      console.log("RES Inside redux slice",res);
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

  export const Login = createAsyncThunk("auth/login",async(data)=>{
    try {
      const res = axiosInstance.post("auth/login",data)

      toast.promise(res,{
       loading:'Login in progress',
       success:(data)=>{
         return data?.data?.message
       },
       error:"Failed to login,Please try again"
      })
      return (await res)?.data
    } catch (error) {
      toast.error(error?.res?.data?.message)
    }
  })
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled,(state, action)=>{
      localStorage.setItem("data",JSON.stringify(action?.payload?.user))
      localStorage.setItem("role",JSON.stringify(action?.payload?.user?.role))
      localStorage.setItem("isLoggedIn","true")
      state.isLoggedIn= true,
      state.data = action?.payload?.user,
      state.role = action?.payload?.user?.role
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
