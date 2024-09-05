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
      const { data } = await axios.post("http://localhost:3000/login", body);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/google-login",
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
      <>
        <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
          <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
            <div className="flex items-center justify-center w-full lg:p-12">
              <div className="flex items-center xl:p-10">
                <form
                  className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                  onSubmit={handleSubmit}
                >
                  <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                    Sign In
                  </h3>

                  <label
                    htmlFor="username"
                    className="mb-2 text-sm text-start text-grey-900"
                  >
                    Username
                  </label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="flex items-center w-full px-5 py-4 mb-7 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  />
                  <label
                    htmlFor="email"
                    className="mb-2 text-sm text-start text-grey-900"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="Enter your @email"
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  />
                  <label
                    htmlFor="password"
                    className="mb-2 text-sm text-start text-grey-900"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    placeholder="Enter a password"
                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-blue-800 transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                  >
                    Sign In
                  </button>
                  <div className="divider px-10 mt-10">OR</div>
                  <div className="mt-6 flex justify-center items-center">
                    <GoogleLogin onSuccess={googleLogin} />
                  </div>
                  <p className="text-sm leading-relaxed text-grey-900 mt-10">
                    Not registered yet
                    <Link to={"/register"} className="font-bold text-grey-700">
                      Create an Account
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
