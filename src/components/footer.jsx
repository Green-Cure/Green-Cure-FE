"use client";

export default function Footer() {
  return (
    <>
      <footer className="bg-gcPrimary-1000 text-gcNeutrals-baseWhite w-full mt-12">
        <div className="flex flex-wrap flex-col w-full py-6 px-8 lg:px-10 md:py-6 md:gap-3">
          <div className="sm:flex lg:flex-row sm:flex-col sm:gap-4 items-start lg:items-center sm:justify-between lg:border-none border-b pb-4 lg:pb-0">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg width="60" height="60" className="md:w-10 w-6 gcDropShadow" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.447 1.72482C15.3427 2.8292 14.7222 4.32706 14.7222 5.88889V14.7222H5.88889C4.32706 14.7222 2.8292 15.3427 1.72482 16.447C0.620434 17.5514 0 19.0493 0 20.6111V32.3889C0 33.9507 0.620434 35.4486 1.72482 36.553C2.8292 37.6573 4.32706 38.2778 5.88889 38.2778H14.7222V47.1111C14.7222 48.6729 15.3427 50.1708 16.447 51.2752C17.5514 52.3796 19.0493 53 20.6111 53H32.3889C33.9507 53 35.4486 52.3796 36.553 51.2752C37.6573 50.1708 38.2778 48.6729 38.2778 47.1111V38.2778H47.1111C48.6729 38.2778 50.1708 37.6573 51.2752 36.553C52.3796 35.4486 53 33.9507 53 32.3889V20.6111C53 19.0493 52.3796 17.5514 51.2752 16.447C50.1708 15.3427 48.6729 14.7222 47.1111 14.7222H38.2778V5.88889C38.2778 4.32706 37.6573 2.8292 36.553 1.72482C35.4486 0.620434 33.9507 0 32.3889 0H20.6111C19.0493 0 17.5514 0.620434 16.447 1.72482ZM20.1175 10.0879C19.7748 9.4597 20.2424 8.72091 20.9588 8.78955C23.389 9.02216 26.0215 9.89509 28.2728 11.2279C36.0041 15.805 39.2433 24.7372 35.3856 32.4196C33.52 36.4506 29.9267 38.2336 27.0564 38.5911C27.5521 42.122 28.9989 44.21 29.1186 44.3761C29.6558 45.1258 29.4925 46.2099 28.7312 46.8002C27.9771 47.3885 26.9259 47.2613 26.3786 46.5183C24.4388 43.8718 20.4946 34.7698 27.4906 22.9528C27.7354 22.5392 27.6129 22.0096 27.2183 21.776C26.8236 21.5423 26.3004 21.6896 26.0555 22.1033C22.4212 28.2421 21.5982 33.6013 21.8722 37.8135C21.8342 37.7962 21.7962 37.779 21.7582 37.7618C21.4722 37.6324 21.1883 37.5038 20.9112 37.3398C16.1576 34.5255 14.6941 28.1999 17.6438 23.2174L19.8701 19.457C21.6344 16.4769 21.672 12.9761 20.1175 10.0879Z"
                  fill="#fafafa"
                />
              </svg>
              <span className="self-center gcHeading3p whitespace-nowrap text-gcNeutrals-baseWhite gcDropShadow">GreenCure</span>
            </a>
            <ul className="flex flex-wrap sm:mt-0 items-center mb-6 gcBody2p sm:mb-0">
              <li>
                <a href="/privacy-policy" className="hover:underline me-2 sm:me-4 md:me-6 leading-5">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 sm:me-4 md:me-6 leading-5">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 sm:me-4 md:me-6 leading-5">
                  Cookie Policy
                </a>
              </li>
            </ul>
            <div className="flex gap-5">
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fafafa" className="bi bi-linkedin" viewBox="0 0 16 16" id="Linkedin--Streamline-Bootstrap" height="25" width="25">
                  <desc>Linkedin Streamline Icon: https://streamlinehq.com</desc>
                  <path
                    d="M0 1.146C0 0.513 0.526 0 1.175 0h13.65C15.474 0 16 0.513 16 1.146v13.708c0 0.633 -0.526 1.146 -1.175 1.146H1.175C0.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2 -8.212c0.837 0 1.358 -0.554 1.358 -1.248 -0.015 -0.709 -0.52 -1.248 -1.342 -1.248S2.4 3.226 2.4 3.934c0 0.694 0.521 1.248 1.327 1.248zm4.908 8.212V9.359c0 -0.216 0.016 -0.432 0.08 -0.586 0.173 -0.431 0.568 -0.878 1.232 -0.878 0.869 0 1.216 0.662 1.216 1.634v3.865h2.401V9.25c0 -2.22 -1.184 -3.252 -2.764 -3.252 -1.274 0 -1.845 0.7 -2.165 1.193v0.025h-0.016l0.016 -0.025V6.169h-2.4c0.03 0.678 0 7.225 0 7.225z"
                    strokeWidth="1"
                  ></path>
                </svg>
              </a>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fafafa" className="bi bi-instagram" viewBox="0 0 16 16" id="Instagram--Streamline-Bootstrap" height="25" width="25">
                  <desc>Instagram Streamline Icon: https://streamlinehq.com</desc>
                  <path
                    d="M8 0C5.829 0 5.556 0.01 4.703 0.048 3.85 0.088 3.269 0.222 2.76 0.42a3.9 3.9 0 0 0 -1.417 0.923A3.9 3.9 0 0 0 0.42 2.76C0.222 3.268 0.087 3.85 0.048 4.7 0.01 5.555 0 5.827 0 8.001c0 2.172 0.01 2.444 0.048 3.297 0.04 0.852 0.174 1.433 0.372 1.942 0.205 0.526 0.478 0.972 0.923 1.417 0.444 0.445 0.89 0.719 1.416 0.923 0.51 0.198 1.09 0.333 1.942 0.372C5.555 15.99 5.827 16 8 16s2.444 -0.01 3.298 -0.048c0.851 -0.04 1.434 -0.174 1.943 -0.372a3.9 3.9 0 0 0 1.416 -0.923c0.445 -0.445 0.718 -0.891 0.923 -1.417 0.197 -0.509 0.332 -1.09 0.372 -1.942C15.99 10.445 16 10.173 16 8s-0.01 -2.445 -0.048 -3.299c-0.04 -0.851 -0.175 -1.433 -0.372 -1.941a3.9 3.9 0 0 0 -0.923 -1.417A3.9 3.9 0 0 0 13.24 0.42c-0.51 -0.198 -1.092 -0.333 -1.943 -0.372C10.443 0.01 10.172 0 7.998 0zm-0.717 1.442h0.718c2.136 0 2.389 0.007 3.232 0.046 0.78 0.035 1.204 0.166 1.486 0.275 0.373 0.145 0.64 0.319 0.92 0.599s0.453 0.546 0.598 0.92c0.11 0.281 0.24 0.705 0.275 1.485 0.039 0.843 0.047 1.096 0.047 3.231s-0.008 2.389 -0.047 3.232c-0.035 0.78 -0.166 1.203 -0.275 1.485a2.5 2.5 0 0 1 -0.599 0.919c-0.28 0.28 -0.546 0.453 -0.92 0.598 -0.28 0.11 -0.704 0.24 -1.485 0.276 -0.843 0.038 -1.096 0.047 -3.232 0.047s-2.39 -0.009 -3.233 -0.047c-0.78 -0.036 -1.203 -0.166 -1.485 -0.276a2.5 2.5 0 0 1 -0.92 -0.598 2.5 2.5 0 0 1 -0.6 -0.92c-0.109 -0.281 -0.24 -0.705 -0.275 -1.485 -0.038 -0.843 -0.046 -1.096 -0.046 -3.233s0.008 -2.388 0.046 -3.231c0.036 -0.78 0.166 -1.204 0.276 -1.486 0.145 -0.373 0.319 -0.64 0.599 -0.92s0.546 -0.453 0.92 -0.598c0.282 -0.11 0.705 -0.24 1.485 -0.276 0.738 -0.034 1.024 -0.044 2.515 -0.045zm4.988 1.328a0.96 0.96 0 1 0 0 1.92 0.96 0.96 0 0 0 0 -1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0 -8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0 -5.334"
                    strokeWidth="1"
                  ></path>
                </svg>
              </a>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="X-Twitter-Logo--Streamline-Logos" height="25" width="25">
                  <desc>X Logo Twitter Streamline Icon: https://streamlinehq.com</desc>
                  <path stroke="#fafafa" strokeLinecap="round" strokeLinejoin="round" d="M17.2705 22.464 1.5 1.53589h5.22951L22.5 22.464h-5.2295Z" strokeWidth="1"></path>
                  <path stroke="#fafafa" strokeLinecap="round" strokeLinejoin="round" d="m21.7578 1.53589 -8.313 8.91461" strokeWidth="1"></path>
                  <path stroke="#fafafa" strokeLinecap="round" strokeLinejoin="round" d="m2.24207 22.464 8.30673 -8.9078" strokeWidth="1"></path>
                </svg>
              </a>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" id="Youtube--Streamline-Font-Awesome" height="25" width="25" fill="#fafafa">
                  <desc>Youtube Streamline Icon: https://streamlinehq.com</desc>
                  <path
                    d="M14.542828125 3.9492604166666663c-0.16905989583333333 -0.6365755208333334 -0.6671770833333333 -1.1379218749999997 -1.2996328124999998 -1.3080598958333332C12.096822916666666 2.332036458333333 7.499999999999999 2.332036458333333 7.499999999999999 2.332036458333333s-4.596794270833333 0 -5.743195312499999 0.3091640625c-0.6324557291666666 0.17016666666666663 -1.1305729166666667 0.6714843749999999 -1.2996328124999998 1.3080598958333332C0.15 5.103088541666666 0.15 7.510442708333333 0.15 7.510442708333333s0 2.407356770833333 0.307171875 3.561184895833333c0.16905989583333333 0.6365729166666666 0.6671770833333333 1.1170338541666667 1.2996328124999998 1.2871718749999999C2.9032057291666664 12.667963541666666 7.499999999999999 12.667963541666666 7.499999999999999 12.667963541666666s4.596794270833333 0 5.743195312499999 -0.3091640625c0.6324557291666666 -0.17013802083333332 1.1305729166666667 -0.6505963541666666 1.2996328124999998 -1.2871718749999999C14.85 9.917799479166666 14.85 7.510442708333333 14.85 7.510442708333333s0 -2.4073541666666665 -0.307171875 -3.5611822916666664ZM5.996580729166666 9.696140624999998V5.324744791666666l3.8420312499999993 2.1857526041666664 -3.8420312499999993 2.1856432291666668Z"
                    strokeWidth="1"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <span className="block gcBody2p lg:text-center mt-3 md:mt-0">
            © 2024{" "}
            <a href="/" className="hover:underline">
              GreenCure
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
