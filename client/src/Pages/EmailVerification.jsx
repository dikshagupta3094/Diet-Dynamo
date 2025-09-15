import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OTP, resendOTP } from "../Redux/slice/auth.slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function EmailVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpId } = useSelector((state) => state.auth);
  const { registeredEmail } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [seconds, setSeconds] = useState(30); // cooldown for resend
  const [isResending, setIsResending] = useState(false);

  // Countdown timer for resend button
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Allow backspace/arrow navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Paste all digits at once
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    if (!paste) return;

    setOtp(paste.padEnd(6, "").split(""));
    document.getElementById("otp-5").focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);

    try {
      if (otpCode.length === 6) {
        
        const response = await dispatch(OTP({ otp: otpCode, otpId }));
        console.log("RES1",response);
        
        console.log("RES",response?.payload?.success);
        
        if (response?.payload?.success) {
          toast.success("OTP veriified successfully")
          navigate("/login");
        } else {
          toast.error("Failed to verify OTP");
        }
      }
    } catch (error) {
      toast.error("Something went wrong during OTP verification");
    }
  };

  const resendOtp = async () => {
    setIsResending(true);
    console.log("Resend OTP clicked");
    // Immediately clear the input fields when the button is clicked
    setOtp(Array(6).fill(""));
    document.getElementById("otp-0").focus();
    console.log("registeredEmail",registeredEmail)
    const response = await dispatch(resendOTP({ email: registeredEmail }));
     console.log("RES1",response);
        
        console.log("RES",response?.payload?.success);
    if (response?.payload?.success) {
      toast.success("OTP verified successfully")
      navigate("/login");
    }
    // reset timer
    setSeconds(30);
    setIsResending(false);
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mt-2">
          We’ve sent a 6-digit verification code to your email.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* OTP inputs */}
          <div className="flex justify-between" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border rounded-lg text-center text-lg font-semibold focus:ring-2 focus:ring-green-400 outline-none"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={!isComplete}
            className={`w-full py-2 rounded-lg font-semibold text-lg transition cursor-pointer ${
              isComplete
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Verify
          </button>

          {/* Resend OTP */}
          <p className="text-center text-gray-600">
            Didn’t get the code?{" "}
            <button
              type="button"
              onClick={resendOtp}
              disabled={seconds > 0 || isResending}
              className={`font-semibold ${
                seconds > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-600 hover:underline"
              }`}
            >
              {seconds > 0 ? `Resend in ${seconds}s` : "Resend OTP"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default EmailVerification;
