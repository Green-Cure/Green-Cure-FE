import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-4 sm:px-0 py-12 sm:py-16 lg:px-8 lg:py-20 md:w-2/5 md:mr-8 md:px-0 lg:mr-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md">
          <h2 className="mt-12 text-center text-base font-semibold leading-9 tracking-tight text-gray-900">Join the GreenCure</h2>
          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Create your Account</h1>
        </div>

        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="fullname"
                  placeholder="Full name"
                  required
                  className="block w-full rounded-xl border-0 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gcSecondary-100 focus:bg-white transition-all"
                />
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
                  className="block w-full rounded-xl border-0 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gcSecondary-100 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="block w-full rounded-xl border-0 py-2 px-3 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gcSecondary-100 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gcNeutrals-1000 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gcSecondary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gcNeutrals-1000 hover:text-gcNeutrals-1000 transition"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">{"Already have an account?"}</p>
          <Link
            href={"/auth/login"}
            className="flex w-full justify-center rounded-md bg-gcSecondary-100 px-3 py-1.5 text-sm font-semibold leading-6 text-gcNeutrals-1000 shadow-sm hover:bg-gcNeutrals-1000 hover:text-gcSecondary-100 trasition mt-3"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
