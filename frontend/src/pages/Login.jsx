import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import {
    useNavigate
} from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import {
    toast
} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    //Login Handling calling the API and checking whether user exists or not
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.email.trim() ||
            !formData.password.trim()
        ) {

            toast.error(
                "Please enter email and password"
            );

            return;

        }

        try {

            const response =
                await axiosInstance.post(
                    "/auth/login",
                    formData
                );


            login(response.data.token, response.data.user);
            toast.success(
                "Login successful"
            );
            navigate('/')

            //console.log(response.data);

        } catch (error) {

            //console.log(error.response.data);
            toast.error(
                error.response?.data?.message
                || "Login failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>


                <form onSubmit={handleSubmit}>

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
                        Login
                    </button>

                    <p className="mt-4 text-center">

                        Don't have an account?

                        <Link
                            to="/signup"
                            className="text-blue-500 ml-1"
                        >
                            Signup
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );
};

export default Login;