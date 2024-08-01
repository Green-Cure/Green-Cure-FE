"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import request from "@/app/utils/request";
import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [typeInput, setTypeInput] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleClickType = () => {
    setTypeInput(!typeInput);
  };
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting form with data:", {
      email: email,
      password: password,
      username: username,
      phone: phone,
      name: name,
    });

    request
      .post("auth/register", {
        email: email,
        password: password,
        username: username,
        phone: phone,
        name: name,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          router.push("/auth/login");
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            email: "",
            password: "",
            username: "",
            phone: "",
            name: "",
          };

          res.response.data.messages.forEach((message) => {
            newErrors[message.field] = message.message;
          });

          setErrors(newErrors);
          toast.error("Something Went Wrong");
        } else if (res.response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .finally(() => {
        setIsLoading(false);
        console.log("Form submission complete");
      });
  };

  return (
    <>
      <div className="rounded-br-[70px] md:w-3/5 mt-16 lg:max-w-screen-lg md:inline-block hidden relative h-max">
        <img
          className="w-full rounded-br-[70px]"
          src="/images/woman-growing-plants-close-up.jpg"
          alt="Hero Image"
        />
        <div className="w-full absolute top-0 bottom-0 left-0 right-0 rounded-br-[70px] bg-gradient-to-br from-transparent to-gcPrimary-900 inset-0 opacity-100"></div>
      </div>
      <div className="flex min-h-full flex-col justify-center px-7 sm:px-0 py-12 sm:py-16 md:px-8 md:py-20 md:w-2/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md md:inline-block flex flex-col justify-center items-center">
          <h2 className="mt-6 text-center text-sm md:text-base font-semibold leading-9 tracking-tight md:text-gcPrimary-1000 text-gcNeutrals-baseWhite gcDropShadow">
            Join the GreenCure
          </h2>
          <h1 className="text-center text-3xl md:text-2xl lg:text-3xl font-bold leading-9 tracking-tight md:text-gcPrimary-1000 text-gcNeutrals-baseWhite gcDropShadow">
            Create your Account
          </h1>
          <svg
            width="80"
            height="80"
            className="md:hidden w-20 gcDropShadow mt-8 mb-2"
            viewBox="0 0 53 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.447 1.72482C15.3427 2.8292 14.7222 4.32706 14.7222 5.88889V14.7222H5.88889C4.32706 14.7222 2.8292 15.3427 1.72482 16.447C0.620434 17.5514 0 19.0493 0 20.6111V32.3889C0 33.9507 0.620434 35.4486 1.72482 36.553C2.8292 37.6573 4.32706 38.2778 5.88889 38.2778H14.7222V47.1111C14.7222 48.6729 15.3427 50.1708 16.447 51.2752C17.5514 52.3796 19.0493 53 20.6111 53H32.3889C33.9507 53 35.4486 52.3796 36.553 51.2752C37.6573 50.1708 38.2778 48.6729 38.2778 47.1111V38.2778H47.1111C48.6729 38.2778 50.1708 37.6573 51.2752 36.553C52.3796 35.4486 53 33.9507 53 32.3889V20.6111C53 19.0493 52.3796 17.5514 51.2752 16.447C50.1708 15.3427 48.6729 14.7222 47.1111 14.7222H38.2778V5.88889C38.2778 4.32706 37.6573 2.8292 36.553 1.72482C35.4486 0.620434 33.9507 0 32.3889 0H20.6111C19.0493 0 17.5514 0.620434 16.447 1.72482ZM20.1175 10.0879C19.7748 9.4597 20.2424 8.72091 20.9588 8.78955C23.389 9.02216 26.0215 9.89509 28.2728 11.2279C36.0041 15.805 39.2433 24.7372 35.3856 32.4196C33.52 36.4506 29.9267 38.2336 27.0564 38.5911C27.5521 42.122 28.9989 44.21 29.1186 44.3761C29.6558 45.1258 29.4925 46.2099 28.7312 46.8002C27.9771 47.3885 26.9259 47.2613 26.3786 46.5183C24.4388 43.8718 20.4946 34.7698 27.4906 22.9528C27.7354 22.5392 27.6129 22.0096 27.2183 21.776C26.8236 21.5423 26.3004 21.6896 26.0555 22.1033C22.4212 28.2421 21.5982 33.6013 21.8722 37.8135C21.8342 37.7962 21.7962 37.779 21.7582 37.7618C21.4722 37.6324 21.1883 37.5038 20.9112 37.3398C16.1576 34.5255 14.6941 28.1999 17.6438 23.2174L19.8701 19.457C21.6344 16.4769 21.672 12.9761 20.1175 10.0879Z"
              fill="#fafafa"
            />
          </svg>
        </div>

        <div className="md:mt-10 mt-8 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="fullname"
                  placeholder="Full name"
                  required
                  value={name}
                  onChange={handleChangeName}
                  className="block w-full rounded-xl border-0 py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
                {errors.name && (
                  <small className="text-red-600">{errors.name}</small>
                )}
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={handleChangeUsername}
                  className="block w-full rounded-xl border-0 py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
                {errors.username && (
                  <small className="text-red-600">{errors.username}</small>
                )}
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                  className="block w-full rounded-xl border-0 py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
                {errors.email && (
                  <small className="text-red-600">{errors.email}</small>
                )}
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  placeholder="No Handphone"
                  required
                  value={phone}
                  onChange={handleChangePhone}
                  className="block w-full rounded-xl border-0 py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
                {errors.phone && (
                  <small className="text-red-600">{errors.phone}</small>
                )}
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
                  value={password}
                  onChange={handleChangePassword}
                  className="block w-full rounded-xl border-0 py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
                {typeInput ? (
                  <FiEye
                    className="text-xl absolute top-1/2 -translate-y-1/2 right-3"
                    onClick={handleClickType}
                  />
                ) : (
                  <FiEyeOff
                    className="text-xl absolute top-1/2 -translate-y-1/2 right-3"
                    onClick={handleClickType}
                  />
                )}
                {errors.password && (
                  <small className="text-red-600">{errors.password}</small>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-[10px] bg-gcPrimary-1000 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gcPrimary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gcPrimary-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gcPrimary-1000 gcDropShadow">
            {"Already have an account?"}
          </p>
          <Link
            href={"/auth/login"}
            className="flex w-full justify-center rounded-md bg-gcNeutrals-baseWhite px-3 py-3 md:py-3 text-base font-bold leading-6 text-gcPrimary-1000 shadow-sm hover:bg-gcPrimary-1000 hover:text-gcNeutrals-baseWhite transition mt-3"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
