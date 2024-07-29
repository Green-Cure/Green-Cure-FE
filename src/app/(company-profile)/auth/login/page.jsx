"use client";

import request from "@/app/utils/request";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

export default function Login() {
  const router = useRouter();

  const [typeInput, setTypeInput] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickType = () => {
    setTypeInput(!typeInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    request
      .post("/auth/authenticated", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data) {
          if (response.data.statusCode === 200 || response.data.statusCode === 201) {
            localStorage.setItem("token", response.data.data[0].token);
            router.push("/my");
          } else {
            window.alert("Login gagal");
          }
        } else {
          window.alert("Login gagal");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <div className="rounded-br-[70px] md:w-3/5 mt-16 lg:max-w-screen-lg md:inline-block hidden relative h-max">
        <img className="w-full rounded-br-[70px]" src="/images/close-up-woman-s-hand-holding-smartphone-near-plants.jpg" alt="Hero Image" />
        <div className="w-full absolute top-0 bottom-0 left-0 right-0 rounded-br-[70px] bg-gradient-to-br from-transparent to-gcPrimary-900 inset-0 opacity-100"></div>
      </div>
      <div className="flex min-h-full flex-col justify-center px-7 sm:px-0 py-12 sm:py-16 md:px-8 md:py-20 md:w-2/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md md:inline-block flex flex-col justify-center items-center">
          <h2 className="mt-6 text-center text-base font-semibold leading-9 tracking-tight md:text-gcPrimary-1000 text-gcNeutrals-baseWhite gcDropShadow">Welcome to</h2>
          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-gcPrimary-1000 text-gcNeutrals-baseWhite gcDropShadow">GreenCure</h1>
          <svg width="80" height="80" className="md:hidden w-20 gcDropShadow mt-8 mb-2" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.447 1.72482C15.3427 2.8292 14.7222 4.32706 14.7222 5.88889V14.7222H5.88889C4.32706 14.7222 2.8292 15.3427 1.72482 16.447C0.620434 17.5514 0 19.0493 0 20.6111V32.3889C0 33.9507 0.620434 35.4486 1.72482 36.553C2.8292 37.6573 4.32706 38.2778 5.88889 38.2778H14.7222V47.1111C14.7222 48.6729 15.3427 50.1708 16.447 51.2752C17.5514 52.3796 19.0493 53 20.6111 53H32.3889C33.9507 53 35.4486 52.3796 36.553 51.2752C37.6573 50.1708 38.2778 48.6729 38.2778 47.1111V38.2778H47.1111C48.6729 38.2778 50.1708 37.6573 51.2752 36.553C52.3796 35.4486 53 33.9507 53 32.3889V20.6111C53 19.0493 52.3796 17.5514 51.2752 16.447C50.1708 15.3427 48.6729 14.7222 47.1111 14.7222H38.2778V5.88889C38.2778 4.32706 37.6573 2.8292 36.553 1.72482C35.4486 0.620434 33.9507 0 32.3889 0H20.6111C19.0493 0 17.5514 0.620434 16.447 1.72482ZM20.1175 10.0879C19.7748 9.4597 20.2424 8.72091 20.9588 8.78955C23.389 9.02216 26.0215 9.89509 28.2728 11.2279C36.0041 15.805 39.2433 24.7372 35.3856 32.4196C33.52 36.4506 29.9267 38.2336 27.0564 38.5911C27.5521 42.122 28.9989 44.21 29.1186 44.3761C29.6558 45.1258 29.4925 46.2099 28.7312 46.8002C27.9771 47.3885 26.9259 47.2613 26.3786 46.5183C24.4388 43.8718 20.4946 34.7698 27.4906 22.9528C27.7354 22.5392 27.6129 22.0096 27.2183 21.776C26.8236 21.5423 26.3004 21.6896 26.0555 22.1033C22.4212 28.2421 21.5982 33.6013 21.8722 37.8135C21.8342 37.7962 21.7962 37.779 21.7582 37.7618C21.4722 37.6324 21.1883 37.5038 20.9112 37.3398C16.1576 34.5255 14.6941 28.1999 17.6438 23.2174L19.8701 19.457C21.6344 16.4769 21.672 12.9761 20.1175 10.0879Z"
              fill="#fafafa"
            />
          </svg>
          <h2 className="mt-6 md:mt-10 text-center text-base font-semibold leading-9 tracking-tight md:text-gcPrimary-1000 text-gcNeutrals-baseWhite gcDropShadow">Please log in to continue</h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  onChange={handleChangeEmail}
                  value={email}
                  className="block w-full rounded-xl border-0 py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={typeInput ? "password" : "text"}
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  onChange={handleChangePassword}
                  value={password}
                  className="block w-full rounded-xl border-0 py-3 px-3 text-gcPrimary-1000 shadow-sm  placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
                {typeInput ? <FiEye className="text-xl absolute top-1/2 -translate-y-1/2 right-3" onClick={handleClickType} /> : <FiEyeOff className="text-xl absolute top-1/2 -translate-y-1/2 right-3" onClick={handleClickType} />}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gcPrimary-1000 px-3 py-3 text-base font-bold leading-6 text-gcNeutrals-baseWhite shadow-sm hover:bg-gcNeutrals-baseWhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gcPrimary-1000 hover:text-gcPrimary-1000 transition"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gcPrimary-1000 gcDropShadow">{"Don't have an account?"}</p>
          <Link
            href={"/auth/register"}
            className="flex w-full justify-center rounded-md bg-gcNeutrals-baseWhite px-3 py-3 md:py-3 text-base font-bold leading-6 text-gcPrimary-1000 shadow-sm hover:bg-gcPrimary-1000 hover:text-gcNeutrals-baseWhite transition mt-3"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
