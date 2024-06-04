import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullName: data.fullName,
      email: data.email,
      userName: data.userName,
      password: data.password,
    };

    // console.log(data);

    await axios
      .post("http://localhost:8000/user/register", userInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          toast.success("User Registered Successfully");
        }
        localStorage.setItem("Users", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        if (err.response) {
          // console.log(err.response);
          toast.error("Error" + err.response.data.message);
        }
      });
  };
  return (
    <>
      <div id="" className="flex h-screen items-center justify-center">
        <div className=" w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog ">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-xl text-center ">Sign Up</h3>
              <div className="mt-4 mx-4 space-y-2">
                <span>Full Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="outline-none border p-1 rounded-md w-full"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-red-600 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mt-4 mx-4 space-y-2">
                <span>Username</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="outline-none border p-1 rounded-md w-full"
                  {...register("userName", { required: true })}
                />
                {errors.userName && (
                  <span className="text-red-600 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="mt-4 mx-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter Your Email.."
                  className="outline-none border p-1 rounded-md w-full"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 mx-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder="Enter Your Password.."
                  className="outline-none border p-1 rounded-md w-full"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              {/* Button */}
              <div className="align-center flex justify-around ">
                <button className="py-1 mt-4 px-2 border bg-pink-500 text-white rounded-md hover:bg-pink-800 duration-200">
                  Sign Up
                </button>
                <p className="py-1 mt-4 px-2">
                  Have an account?
                  <button
                    className="text-sm mx-1 font-bold text-blue-800 underline "
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
