"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      setIsLogin(!!localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-r from-gcNeutrals-baseWhite to-neutral-100 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen flex bg-gradient-to-r from-gcNeutrals-baseWhite to-neutral-100 flex-wrap items-center justify-between mx-auto md:py-1.5 px-8 lg:px-10 relative">
          <a href="/" className="flex items-center space-x-2 md:space-x-5 rtl:space-x-reverse relative">
            <svg width="60" height="60" className="md:w-10 w-6 gcDropShadow" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.447 1.72482C15.3427 2.8292 14.7222 4.32706 14.7222 5.88889V14.7222H5.88889C4.32706 14.7222 2.8292 15.3427 1.72482 16.447C0.620434 17.5514 0 19.0493 0 20.6111V32.3889C0 33.9507 0.620434 35.4486 1.72482 36.553C2.8292 37.6573 4.32706 38.2778 5.88889 38.2778H14.7222V47.1111C14.7222 48.6729 15.3427 50.1708 16.447 51.2752C17.5514 52.3796 19.0493 53 20.6111 53H32.3889C33.9507 53 35.4486 52.3796 36.553 51.2752C37.6573 50.1708 38.2778 48.6729 38.2778 47.1111V38.2778H47.1111C48.6729 38.2778 50.1708 37.6573 51.2752 36.553C52.3796 35.4486 53 33.9507 53 32.3889V20.6111C53 19.0493 52.3796 17.5514 51.2752 16.447C50.1708 15.3427 48.6729 14.7222 47.1111 14.7222H38.2778V5.88889C38.2778 4.32706 37.6573 2.8292 36.553 1.72482C35.4486 0.620434 33.9507 0 32.3889 0H20.6111C19.0493 0 17.5514 0.620434 16.447 1.72482ZM20.1175 10.0879C19.7748 9.4597 20.2424 8.72091 20.9588 8.78955C23.389 9.02216 26.0215 9.89509 28.2728 11.2279C36.0041 15.805 39.2433 24.7372 35.3856 32.4196C33.52 36.4506 29.9267 38.2336 27.0564 38.5911C27.5521 42.122 28.9989 44.21 29.1186 44.3761C29.6558 45.1258 29.4925 46.2099 28.7312 46.8002C27.9771 47.3885 26.9259 47.2613 26.3786 46.5183C24.4388 43.8718 20.4946 34.7698 27.4906 22.9528C27.7354 22.5392 27.6129 22.0096 27.2183 21.776C26.8236 21.5423 26.3004 21.6896 26.0555 22.1033C22.4212 28.2421 21.5982 33.6013 21.8722 37.8135C21.8342 37.7962 21.7962 37.779 21.7582 37.7618C21.4722 37.6324 21.1883 37.5038 20.9112 37.3398C16.1576 34.5255 14.6941 28.1999 17.6438 23.2174L19.8701 19.457C21.6344 16.4769 21.672 12.9761 20.1175 10.0879Z"
                fill="#56C596"
              />
            </svg>

            <span className="self-center gcHeading3p whitespace-nowrap text-gcPrimary-600 gcDropShadow">GreenCure</span>
          </a>
          <div className="flex md:gap-12 lg:gap-16">
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:gap-4">
              {isLogin ? (
                <Link href={"/my"} className="gcDropShadow">
                  <button
                    type="button"
                    className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-3xl md:rounded-lg text-sm px-4 py-0 md:px-6 md:py-2 text-center md:inline-block hidden"
                  >
                    Go to Home
                  </button>
                </Link>
              ) : (
                <>
                  <Link href={"/auth/register"} className="gcDropShadow">
                    <button
                      type="button"
                      className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-3xl md:rounded-lg text-sm px-4 py-0 md:px-6 md:py-2 text-center md:inline-block hidden"
                    >
                      Sign Up
                    </button>
                  </Link>
                  <Link href={"/auth/login"} className="gcDropShadow">
                    <button
                      type="button"
                      className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 font-medium rounded-3xl md:rounded-lg text-sm px-4 md:px-6 md:py-2 text-center md:inline-block hidden"
                    >
                      Log in
                    </button>
                  </Link>
                </>
              )}

              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gcPrimary-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                <svg className="w-5 h-5 gcDropShadow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="#2d947f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex md:gap-3 lg:gap-6 flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                <li>
                  <Link
                    href={"/my/article"}
                    className={`gcBody2p gcDropShadow py-2 px-3 text-gcNeutrals-600 rounded block relative md:p-0 ${
                      pathname == "/article"
                        ? "md:bg-transparent w-fit font-semibold"
                        : "md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcNeutrals-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-medium"
                    }`}
                  >
                    Article
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/my/library"}
                    className={`gcBody2p gcDropShadow py-2 px-3 text-gcNeutrals-600 rounded block relative md:p-0 ${
                      pathname == "/library"
                        ? "md:bg-transparent w-fit font-semibold"
                        : "md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcNeutrals-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-medium"
                    }`}
                  >
                    Library
                  </Link>
                </li>
                <li>
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-gray-100 md:border-0 md:p-0 md:w-auto gcBody2p gcDropShadow text-gcNeutrals-600 relative font-medium md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcNeutrals-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center after:top-full"
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                  >
                    More
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div id="dropdownNavbar" className={`-z-10 font-normal overflow-hidden bg-gcNeutrals-baseWhite divide-y divide-gray-100 rounded-lg shadow w-52 absolute transition-all ${isMoreOpen ? "top-full" : "-top-full opacity-0"}`}>
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a href="/privacy-policy" className="block px-4 py-2 hover:bg-gray-100 gcBody2p">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="/terms-conditions" className="block px-4 py-2 hover:bg-gray-100 gcBody2p">
                          Terms and Conditions
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 gcBody2p">
                          Cookie Policy
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gcBody2p">
                        API Reference
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className={"w-full md:hidden transition-all duration-300 relative -z-30" + (isNavOpen ? "mt-0" : " -mt-96")} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 border bg-gradient-to-r mb-3 from-gcNeutrals-baseWhite to-neutral-100 border-gray-200 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 gap-2">
              <div className="flex justify-center items-center gap-6 mb-4">
                {isLogin ? (
                  <Link href={"/my"}>
                    <button type="button" className="gcHeading4p text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none rounded-lg px-4 py-2 md:px-6 md:py-2 text-center">
                      Go to Home
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link href={"/auth/register"}>
                      <button type="button" className="gcHeading4p text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none rounded-lg px-4 py-2 md:px-6 md:py-2 text-center">
                        Sign Up
                      </button>
                    </Link>
                    <Link href={"/auth/login"}>
                      <button type="button" className="gcHeading4p text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center">
                        Log in
                      </button>
                    </Link>
                  </>
                )}
              </div>
              <li className="shadow-sm">
                <Link
                  href={"/my/article"}
                  className={`gcBody2p gcDropShadow block py-2 px-3 rounded border transition md:p-0 ${
                    pathname == "/article" ? "text-gcNeutrals-baseWhite bg-gcNeutrals-600 md:bg-transparent" : "text-gcNeutrals-600 hover:text-gcNeutrals-baseWhite hover:bg-gcNeutrals-600 md:border-0 md:hover:bg-transparent"
                  }`}
                  aria-current="page"
                >
                  Article
                </Link>
              </li>
              <li className="shadow-sm">
                <Link
                  href={"/my/library"}
                  className={`gcBody2p gcDropShadow block py-2 px-3 rounded border transition md:p-0 ${
                    pathname == "/library" ? "text-gcNeutrals-baseWhite bg-gcNeutrals-600 md:bg-transparent" : "text-gcNeutrals-600 hover:text-gcNeutrals-baseWhite hover:bg-gcNeutrals-600 md:border-0 md:hover:bg-transparent"
                  }`}
                >
                  Library
                </Link>
              </li>
              <li className="relative rounded border shadow-sm">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 rounded md:p-0 md:w-auto gcBody2p gcDropShadow relative font-medium text-gcNeutrals-600 hover:text-gcNeutrals-baseWhite hover:bg-gcNeutrals-600 md:border-0 transition"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                >
                  More
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`font-normal bg-gcNeutrals-baseWhite divide-y divide-gcNeutrals-600 rounded-b-lg shadow left-0 right-0 absolute transition-all duration-400 ${isMoreOpen ? "top-full z-50" : "-top-1 opacity-0 -z-10"}`}
                >
                  <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                    <li>
                      <a href="/privacy-policy" className="block px-4 py-2 hover:bg-gcNeutrals-600 hover:text-gcNeutrals-baseWhite gcBody2p">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/terms-conditions" className="block px-4 py-2 hover:bg-gcNeutrals-600 hover:text-gcNeutrals-baseWhite gcBody2p">
                        Terms and Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gcNeutrals-600 hover:text-gcNeutrals-baseWhite gcBody2p">
                        Cookie Policy
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gcNeutrals-600 hover:text-gcNeutrals-baseWhite gcBody2p">
                      API Reference
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
