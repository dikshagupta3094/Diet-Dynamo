import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const safeJSONParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
};

const initialState = {
  otpId: safeJSONParse(localStorage.getItem("otpId"), null),
  registeredEmail: safeJSONParse(localStorage.getItem("registeredEmail"), null),
  isLoggedIn: safeJSONParse(localStorage.getItem("isLoggedIn"), false),
  data: safeJSONParse(localStorage.getItem("data"), {}),
  role: safeJSONParse(localStorage.getItem("role"), ""),
};

export const createAccount = createAsyncThunk("/signUp", async (data) => {
  try {
    const res = axiosInstance.post("auth/register", data);
    toast.promise(res, {
      loading: "Wait, creating you account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res)?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const LoginUser = createAsyncThunk("/login", async (data,{rejectWithValue}) => {
  try {
    const res = axiosInstance.post("auth/login", data);
    toast.promise(res, {
      loading: "Login in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login,Please try again",
    });
    return (await res)?.data;
  } catch (error) {
    toast.error(error?.res?.data?.message);
    return rejectWithValue(error?.response?.data)
  }
});

export const OTP = createAsyncThunk(
  "/emailverify",
  async ({ otp, otpId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("auth/verifyEmail", { otp, otpId });
      // toast.promise(res, {
      //   loading: "Please wait",
      //   success: (data) => {
      //     return data?.data?.message;
      //   },
      //   error: "Invalid otp, Please try again",
      // });
      toast.success(res?.data?.message)
      return res.data;
    } catch (error) {
      toast.error(error?.res?.data?.message || "Error occurred try again");
      return rejectWithValue({ success: false, message });
    }
  }
);

export const resendOTP = createAsyncThunk("/resendOTP", async ({ email }) => {
  try {
    const res = await axiosInstance.post("otp/resend-otp", {
      email,
      resend: true,
    });
    // toast.promise(res, {
    //   loading: "Please wait",
    //   success: (data) => {
    //     return data?.data?.message;
    //   },
    //   error: "Invalid otp, Please try again",
    // });
    toast.success(res?.data?.message)
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.res?.data?.message || "Error occurred try again");
  }
});

export const logout = createAsyncThunk("/logout", async () => {
  try {
    const res = axiosInstance.get("auth/logout");
    console.log(res);

    toast.promise(res, {
      loading: "Wait, Logout in Progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Logout",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.otpId = null;
      state.registeredEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAccount.fulfilled, (state, action) => {
      const email = action?.payload?.user?.email;
      state.registeredEmail = email;
      state.otpId = action?.payload?.otpId;

      localStorage.setItem("registeredEmail", JSON.stringify(email));
      localStorage.setItem("otpId", JSON.stringify(action?.payload?.otpId));
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("role", JSON.stringify(action?.payload?.user?.role));
      localStorage.setItem("isLoggedIn", "true");
      (state.isLoggedIn = true),
        (state.data = action?.payload?.user),
        (state.role = action?.payload?.user?.role);
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.data = {};
      state.role = "";
    });
    builder.addCase(resendOTP.fulfilled, (state, action) => {
      state.otpId = action.payload.otpId;
    });

    builder.addCase(logout.fulfilled, (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.data = {};
      state.role = "";
    });
    // builder.addCase(resendOTP.rejected,(state,action)=>{
    //   state.otpId = null;
    // })
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
