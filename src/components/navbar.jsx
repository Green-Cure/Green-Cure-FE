"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen flex bg-white flex-wrap items-center justify-between mx-auto py-5 px-8 lg:px-10 relative">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse relative"
          >
            <img
              className="h-8"
              src="https://placehold.co/50x50"
              alt="GreenCure Logo"
            />
            <span className="self-center text-xl whitespace-nowrap">
              Green Cure
            </span>
          </a>
          <div className="flex md:gap-12 lg:gap-16">
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
              <button
                type="button"
                className="text-white bg-gcNeutrals-300 hover:bg-gcNeutrals-400 focus:ring-4 focus:outline-none focus:ring-gcNeutrals-100 font-medium rounded-lg text-sm px-4 py-1.5 md:px-6 md:py-2 text-center md:inline-block hidden"
              >
                <Link href={"/auth/register"}>Sign in</Link>
              </button>
              <button
                type="button"
                className="text-white bg-gcNeutrals-600 hover:bg-gcNeutrals-700 focus:ring-4 focus:outline-none focus:ring-gcNeutrals-100 font-medium rounded-lg text-sm px-4 py-1.5 md:px-6 md:py-2 text-center md:inline-block hidden"
              >
                <Link href={"/auth/login"}>Log in</Link>
              </button>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex md:gap-3 lg:gap-6 flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link
                    href={"/about"}
                    className="block py-2 px-3 text-white bg-gcPrimary-700 rounded md:bg-transparent md:text-gcPrimary-700 md:p-0"
                  >
                    Article
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gcPrimary-700 md:p-0"
                  >
                    Library
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gcPrimary-700 md:p-0"
                  >
                    More
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={
              "w-full md:hidden transition-all duration-300 relative -z-30" +
              (isNavOpen ? "mt-0" : " -mt-96")
            }
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <div className="flex justify-center items-center gap-6 mb-4">
                <button
                  type="button"
                  className="text-white bg-gcNeutrals-300 hover:bg-gcNeutrals-400 focus:ring-4 focus:outline-none focus:ring-gcNeutrals-100 font-medium rounded-lg text-sm px-4 py-1.5 md:px-6 md:py-2 text-center"
                >
                  <Link href={"/auth/register"}>Sign in</Link>
                </button>
                <button
                  type="button"
                  className="text-white bg-gcNeutrals-600 hover:bg-gcNeutrals-700 focus:ring-4 focus:outline-none focus:ring-gcNeutrals-100 font-medium rounded-lg text-sm px-4 py-1.5 md:px-6 md:py-2 text-center"
                >
                  <Link href={"/auth/login"}>Log in</Link>
                </button>
              </div>
              <li>
                <Link
                  href={"/about"}
                  className="block py-2 px-3 text-white bg-gray-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                  aria-current="page"
                >
                  Article
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="block py-2 px-3 text-gray-900 hover:text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  Library
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="block py-2 px-3 text-gray-900 hover:text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  More
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
