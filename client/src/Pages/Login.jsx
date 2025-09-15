import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { LoginUser } from "../Redux/slice/auth.slice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleLoginData(e) {
    const { name, value } = e.target;
    setLoginData({
      ...LoginData,
      [name]: value,
    });
  }

  async function onLogin(e) {
    e.preventDefault();

    if (!LoginData.email || !LoginData.password) {
      toast.error("Please fill all the details");
    }

    const response = await dispatch(LoginUser(LoginData))
    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <form
          noValidate
          onSubmit={onLogin}
          className="w-full max-w-lg bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-4"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Login
          </h1>
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={LoginData.email}
              onChange={handleLoginData}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={LoginData.password}
              onChange={handleLoginData}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg transition cursor-pointer"
          >
            Login
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
