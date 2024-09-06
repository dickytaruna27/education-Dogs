import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = { userName, email, password };
      const { data } = await axios.post(
        "https://doggieverse.dickytaruna.online/login",
        body
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(
        "https://doggieverse.dickytaruna.online/google-login",
        null,
        {
          headers: {
            token: codeResponse.credential,
          },
        }
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {}
  }

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-blue-400">
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        <div className="relative w-full max-w-md bg-white rounded-lg p-8 shadow-md z-10">
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-bold text-center text-dark-grey-900 mb-6">
              Sign In
            </h3>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm text-grey-900 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 text-sm bg-grey-200 text-dark-grey-900 placeholder:text-grey-700 rounded-lg focus:bg-grey-400 focus:outline-none"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-grey-900 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your @email"
                className="w-full px-4 py-3 text-sm bg-grey-200 text-dark-grey-900 placeholder:text-grey-700 rounded-lg focus:bg-grey-400 focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm text-grey-900 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 text-sm bg-grey-200 text-dark-grey-900 placeholder:text-grey-700 rounded-lg focus:bg-grey-400 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mb-4 text-sm font-bold text-white bg-purple-blue-500 rounded-lg hover:bg-purple-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-blue-100"
            >
              Sign In
            </button>

            <div className="relative text-center my-4">
              <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 bg-white px-2 text-sm text-grey-600">
                OR
              </span>
              <hr className="border-grey-300" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin onSuccess={googleLogin} />
            </div>

            <p className="text-sm text-center text-grey-900 mt-6">
              Not registered yet?{" "}
              <Link to={"/register"} className="font-bold text-purple-blue-500">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
