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
    //degree:null
  });

  //TODO::
  // const [degree, setDegree] = useState("");

  const handleuserData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function getImage(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      setFormData({
        ...formData,
        avatar: uploadImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        // console.log(this.result);
        setPreviewImage(this.result);
      });
    }
  }

  async function createUserAccount(e) {
    e.preventDefault();

    //Checking username length

    if (formData.username.length<5) {
      toast.error("Username length should be more than 5");
      return;
    }

    //Email Validation
    if (
      !formData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid Error");
      return;
    }
    //Password validagtion
    if (
      (!formData.password.
      match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))
    ) {
      toast.error(
        "Password should be 8 character long and hava a alteast one special character"
      );
      return;
    }

    //Handle formData
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    
    if (formData.role == "DIET EXPERT") {
      formDataToSend.append("qualification", formData.qualification);
      formDataToSend.append("description", formData.description);
      //DEGREE PART IS REMAINING
    }

    formDataToSend.append("avatar",formData.avatar)

    //Dispatch createAccount action
    const response = dispatch(createAccount(formDataToSend));
    console.log('Frontend res', response)
    if (response?.payload?.success) {
      navigate("/");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      username: "",
      role: "",
      avatar: "",
      qualification: "",
      description: "",
    });
    setPreviewImage("");
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={createUserAccount}
          className="flex flex-col justify-center gap-3 rounded-lg items-center bg-gray-50  shadow-sm m-2 p-2"
        >
          <h1 className="text-3xl font-semibold m-3">REGISTRATION PAGE</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <>
                <img
                  className="h-24 w-24 rounded-full m-auto"
                  src={previewImage}
                  alt=""
                />
              </>
            ) : (
              <BsPersonCircle className="w-24 h-24" />
            )}
          </label>
          <input
            onChange={getImage}
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg,.jpeg,.svg,.png"
            className="hidden"
          />

          <div className="flex flex-col w-80">
            <label htmlFor="name" className="font-semibold p-1 m-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="border-black h-7"
              value={formData.name}
              onChange={handleuserData}
            />

            <label htmlFor="username" className="font-semibold p-1 m-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className="border-black h-7"
              value={formData.username}
              onChange={handleuserData}
            />

            <label htmlFor="username" className="font-semibold p-1 m-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border-black h-7"
              value={formData.email}
              onChange={handleuserData}
            />
            <label htmlFor="password" className="font-semibold p-1 m-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border-black h-7"
              value={formData.password}
              onChange={handleuserData}
            />

            <div className="mb-4">
              <label htmlFor="role" className="block font-semibold mb-2">
                Select Role:
              </label>

              <div className="flex gap-6 items-center p-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    id="DIET EXPERT"
                    value="DIET EXPERT"
                    checked={formData.role === "DIET EXPERT"}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="accent-blue-600 w-4 h-4"
                  />
                  <label
                    htmlFor="DIET EXPERT"
                    className="text-lg font-medium text-gray-700"
                  >
                    Expert
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    id="USER"
                    value="USER"
                    checked={formData.role === "USER"}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="accent-blue-600 w-4 h-4"
                  />
                  <label
                    htmlFor="USER"
                    className="text-lg font-medium text-gray-700"
                  >
                    User
                  </label>
                </div>
              </div>
            </div>

            {formData.role == "DIET EXPERT" && (
              <>
                <label
                  htmlFor="qualification"
                  className="font-semibold p-1 m-1"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  id="qualification"
                  placeholder="Enter your qualification"
                  value={formData.qualification}
                  onChange={handleuserData}
                ></input>
                <label htmlFor="Description" className="font-semibold p-1 m-1">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  cols={5}
                  placeholder="Enter about yourself ex- you can write about your experience"
                  value={formData.description}
                  onChange={handleuserData}
                ></textarea>

                {/* DEGREE:TODO */}
                {/* <label
                  htmlFor="qualification"
                  className="font-semibold p-1 m-1"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  id="qualification"
                  placeholder="Enter your qualification"
                ></input> */}
              </>
            )}
          </div>
          <button className="bg-green-500 text-white  text-xl m-2 p-2 rounded-xl w-full cursor-pointer">
            Create Account
          </button>

          <p className="text-center">
             Already have account?  
             <Link to={"/login"} className="text-blue-600"> Login</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
