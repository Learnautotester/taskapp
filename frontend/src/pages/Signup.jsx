import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import {
  toast
} from "react-toastify";
const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  //Calling API to create a new User (signup)
  const handleSubmit = async (e) => {

  e.preventDefault();

  if (
  !formData.name.trim() ||
  !formData.email.trim() ||
  !formData.password.trim()
) {

  toast.error(
    "All fields are required"
  );

  return;

}

  try {

    const response =
      await axiosInstance.post(
        "/auth/signup",
        formData
      );

      toast.success(
        response.data.message
      );

     
    //console.log(response.data);

  } catch (error) {

     toast.error(
      error.response?.data?.message
      || "Something went wrong"
   );

  }

   // Clear form
      setFormData({
         name: "",
         email: "",
         password: "",
      });


};


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Signup
        </h2>


        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

          </div>


          <div className="mb-4">

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

          </div>


          <div className="mb-4">

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

          </div>


          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            Signup
          </button>

          <p className="mt-4 text-center">

  Already have an account?

  <Link
    to="/login"
    className="text-blue-500 ml-1"
  >
    Login
  </Link>

</p>

        </form>

      </div>

    </div>

  );
};

export default Signup;