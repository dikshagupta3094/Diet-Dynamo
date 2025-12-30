import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

export const createCheckoutSession = createAsyncThunk(
  "/subscription/checkout-session",
  async (_, {rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("payments/createCheckoutSession");
      return res.data.url;
    } catch (error) {
      console.log(error);
      toast.error("checkout failed");
      return rejectWithValue(
        error.response?.data?.message || "checkout failed"
      );
    }
  }
);

export const verifySubscription = createAsyncThunk(
  "/subscription-success",
  async (sessionId,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.get(
        `payments/verifySession?session_id=${sessionId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "verification failed"
      );
    }
  }
);

export const fetchSubscriptionStatus = createAsyncThunk(
  "/subscription/status",
  async (_,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.get("auth/myprofile");
      return {
         isSubscribed: res.data.user.isSubscribed,
        subscriptionStatus: res.data.user.subscriptionStatus,
      };
    } catch (error) {
      console.log(error);
      toast.error("unable to fetch subscription detail");
      return rejectWithValue(error?.response.data||"unable to fetch subscription detail")
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isSubscribed: false,
    subscriptionStatus: "inactive",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCheckoutSession.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createCheckoutSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCheckoutSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(verifySubscription.fulfilled, (state, action) => {
      state.isSubscribed = action.payload.isSubscribed;
      state.subscriptionStatus = action.payload.subscriptionStatus;
    });

    builder.addCase(verifySubscription.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(fetchSubscriptionStatus.fulfilled, (state, action) => {
      console.log("REDUX UPDATED", action.payload);
      state.isSubscribed = action.payload.isSubscribed;
      state.subscriptionStatus = action.payload.subscriptionStatus;
    });
  },
});

export default paymentSlice.reducer;
