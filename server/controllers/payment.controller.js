import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

const stripe = new Stripe(process.env.STRIPE_SECERT_KEY);
const createCheckoutSession = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return next(new AppError("unauthorized", 401));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("user not found", 401));
    }

    if (user.role != "USER") {
      return next(new AppError("only normal user can subscribe", 403));
    }

    if (user.isSubscribed) {
      return next(new AppError("you are already susbcribed", 400));
    }

    const priceId = process.env.SUBSCRIPTION_PRICE_ID;
    if (!priceId) {
      return next(
        new AppError(
          "Subscription price ID is not configured on the server",500));
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription-cancelled`,
    });

    // Send the Checkout URL to frontend
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res
      .status(500)
      .json({ message: "Unable to create checkout session" });
  }
};

const verifyCheckoutSession = async (req, res,next) => {
  try {
    const userId = req.user?.id;
    const { session_id } = req.query;

    if (!userId) {
      return next(new AppError("Unathuorized",401));
    }

    if (!session_id) {
      return next(new AppError("Session ID is required",400))
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["subscription"],
    });

    
    if (session.payment_status !== "paid") {
      return next(new AppError("Payment not completed",400))
    }

    
    const user = await User.findById(userId);
    if (!user) return next (new AppError("User not found",404));

    user.isSubscribed = true;
    user.subscriptionStatus = session.subscription?.status || "active";
    user.stripeCustomerId = session.customer;
    user.stripeSubscriptionId = session.subscription?.id;

    await user.save();

    return res.status(200).json({
      message: "Subscription activated successfully",
      subscriptionStatus: user.subscriptionStatus,
      isSubscribed: true,
    });

  } catch (error) {
    console.error("Verify session error:", error);
    res.status(500).json({ message: "Failed to verify checkout session" });
  }
};

export { createCheckoutSession,verifyCheckoutSession };
