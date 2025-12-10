import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


export const createCheckoutSession = createAsyncThunk("/subscription/checkout-session",async()=>{
    try {
        const res = await axiosInstance.post("payments/create-checkout-session");
        return res.data.url;
    } catch (error) {
        console.log(error);
        return toast.error("checkout failed");
    }
})

export const verifySubscription = createAsyncThunk("/subscription-success",async(sessionId)=>{
   try {
    const res = await axiosInstance.get(`payments/verify-session?session_id=${sessionId}`)
    return res.data;
   } catch (error) {
    console.log(error);
    return toast.error("verification failed")
   }
})

export const fetchSubscriptionStatus = createAsyncThunk("/subscription/status",async()=>{
    try {
        const res = await axiosInstance.get("auth/me")
        return {
        isSubscribed: res.data.isSubscribed,
        subscriptionStatus: res.data.subscriptionStatus,
      };
    } catch (error) {
        console.log(error);
        return toast.error("unable to fetch subscription detail");  
    }
})

const paymentSlice = createSlice({
    name:"payment",
    initialState:{
         isSubscribed:false,
         subscriptionStatus:"inactive",
         loading:false,
         error:null
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(createCheckoutSession.fulfilled,(state)=>{
            state.loading = false;
        })
        builder.addCase(createCheckoutSession.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(createCheckoutSession.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(verifySubscription.fulfilled,(state,action)=>{
             state.isSubscribed = true;
             state.subscriptionStatus = action.payload.subscriptionStatus;
        })

        builder.addCase(verifySubscription.rejected,(state,action)=>{
             state.error = action.payload;
        })

        builder.addCase(fetchSubscriptionStatus.fulfilled,(state,action)=>{
            state.isSubscribed = action.payload.isSubscribed;
            state.subscriptionStatus = action.payload.subscriptionStatus
        })
    }
})




export default paymentSlice.reducer;