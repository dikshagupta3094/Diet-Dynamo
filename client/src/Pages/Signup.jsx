import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";


function Signup() {
  const [previewImage,setPreviewImage] = useState("")
  const [role,setrole] = useState()
  const [formdata,setFormData] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
    role:"",
    qualification:"",
    description:"",
  })
  const [degree,setDegree] = useState("")
  
  const handleuserData = ()=>{
    const {name,value} = e.target
    setFormData({
      ...formdata,
      [name]:value
    })
  }
  function createUserAccount(){
  
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form noValidate onSubmit={createUserAccount} className="flex flex-col justify-center gap-3" >
          <h1 class="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-5xl font-semibold">
            REGISTRATION PAGE
          </h1>
          <label htmlFor="image_uploads" className="cursor-pointer"></label>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
