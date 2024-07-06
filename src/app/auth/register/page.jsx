import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <>
      <div class="flex min-h-full flex-col justify-center px-4 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-12 text-center text-base font-semibold leading-9 tracking-tight text-gray-900">Join the GreenCure</h2>
          <h1 class="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Create your Account</h1>
        </div>

        <div class="mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <div class="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autocomplete="fullname"
                  placeholder="Full name"
                  required
                  class="block w-full rounded-xl border-0 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gcSecondary-100 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  placeholder="Email"
                  required
                  class="block w-full rounded-xl border-0 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gcSecondary-100 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                  required
                  class="block w-full rounded-xl border-0 py-2 px-3 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gcSecondary-100 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-gcNeutrals-1000 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gcSecondary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gcNeutrals-1000 hover:text-gcNeutrals-1000 transition"
              >
                Register
              </button>
            </div>
          </form>

          <p class="mt-8 text-center text-sm text-gray-500">{"Already have an account?"}</p>
          <Link
            href={"/auth/login"}
            class="flex w-full justify-center rounded-md bg-gcSecondary-100 px-3 py-1.5 text-sm font-semibold leading-6 text-gcNeutrals-1000 shadow-sm hover:bg-gcNeutrals-1000 hover:text-gcSecondary-100 trasition mt-3"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
