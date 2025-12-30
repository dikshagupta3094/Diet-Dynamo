import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifySubscription,fetchSubscriptionStatus } from "../Redux/slice/payment.slice.js";
import { useSearchParams,useNavigate } from "react-router-dom";

const SubscriptionSuccess = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    (async () => {
      const action = await dispatch(verifySubscription(sessionId));

      if (action.meta.requestStatus === "fulfilled") {
       await dispatch(fetchSubscriptionStatus());
        navigate("/expert");
      }
    })();
  }, [dispatch,navigate,params]);
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>We are activating your subscription</p>
    </div>
  );
};

export default SubscriptionSuccess;
