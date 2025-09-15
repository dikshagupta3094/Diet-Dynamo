
import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { createAccount } from "../Redux/slice/auth.slice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    avatar: "",
    password: "",
    role: "",
    qualification: "",
    description: ""
  });

  const handleuserData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function getImage(e) {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setFormData({ ...formData, avatar: uploadImage });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onload = () => setPreviewImage(fileReader.result);
    }
  }

  async function createUserAccount(e) {
    e.preventDefault();

    if (formData.username.length < 5) {
      toast.error("Username length should be more than 5");
      return;
    }
    if (
      !formData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid Email");
      return;
    }
    if (
      !formData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Password should be 8+ characters with at least one special character"
      );
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    const response = await dispatch(createAccount(formDataToSend));
    if (response?.payload?.success) {
      navigate("/emailverify");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      username: "",
      role: "",
      avatar: "",
      qualification: "",
      description: ""
    });
    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <form
          noValidate
          onSubmit={createUserAccount}
          className="w-full max-w-lg bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-4"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Create Your Account
          </h1>

          {/* Avatar Upload */}
          <div className="flex justify-center">
            <label htmlFor="image_uploads" className="cursor-pointer group">
              {previewImage ? (
                <img
                  className="h-24 w-24 rounded-full border-4 border-green-400 object-cover shadow-md group-hover:opacity-80 transition"
                  src={previewImage}
                  alt="Preview"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 text-gray-400 group-hover:text-green-500 transition" />
              )}
            </label>
            <input
              onChange={getImage}
              type="file"
              id="image_uploads"
              accept=".jpg,.jpeg,.png"
              className="hidden"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleuserData}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleuserData}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleuserData}
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
              value={formData.password}
              onChange={handleuserData}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <div className="flex gap-6">
              {["DIET EXPERT", "USER"].map((role) => (
                <label key={role} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="accent-green-500"
                  />
                  {role === "DIET EXPERT" ? "Expert" : "User"}
                </label>
              ))}
            </div>
          </div>

          {/* Extra fields for Experts */}
          {formData.role === "DIET EXPERT" && (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="Enter your qualification"
                  value={formData.qualification}
                  onChange={handleuserData}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Write about your experience"
                  value={formData.description}
                  onChange={handleuserData}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none resize-none"
                ></textarea>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg transition cursor-pointer"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
