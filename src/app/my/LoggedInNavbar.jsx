"use client";

import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { host } from "../utils/urlApi";
import toast from "react-hot-toast";

export default function LoggedInNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const classDesktopHover =
    "before:block before:absolute relative before:bg-gcNeutrals-baseWhite before:w-2 md:before:h-7 sm:before:h-6 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 before:-left-full transition-all md:hover:before:left-3 lg:hover:before:left-1 sm:hover:before:left-4 before:transition-all";

  const classDesktopActive =
    "before:block before:absolute relative before:bg-gcNeutrals-baseWhite before:w-2 md:before:h-7 sm:before:h-6 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 before:-left-full transition-all md:before:left-3 lg:before:left-1 sm:before:left-4 before:transition-all";

  const classMobileHover =
    "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcNeutrals-baseWhite after:w-4 after:left-1/2 after:-translate-x-1/2 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center after:rounded-lg after:-bottom-2";

  const classMobileActive =
    "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcNeutrals-baseWhite after:w-4 after:left-1/2 after:-translate-x-1/2 after:scale-x-100 after:transition after:duration-300 after:origin-center after:rounded-lg after:-bottom-2";

  useEffect(() => {
    if (!userData) {
      const data = getUserData();
      if (data) {
        data
          .then((response) => {
            setUserData(response);
            setLoading(false);
          })
          .catch(function (err) {
            console.error(err);
            toast.error("Something Went Wrong");
          });
      } else {
        setUserData(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [userData, router]);

  const getUserData = async () => {
    let userData;
    await axios
      .get(`${host}auth/my`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data) {
          if (response.data.statusCode === 200 || response.data.statusCode === 201) {
            userData = response.data.data[0].user;
          } else {
            toast.error("Something Went Wrong");
            return null;
          }
        }
      })
      .catch(function (err) {
        if (err.response) {
          if (err.response.data.statusCode == 401) {
            userData = null;
            localStorage.clear();
            window.location.href = "/auth/login";
          }
        }
        console.error(err);
      });

    return userData;
  };

  return (
    <>
      <nav className="fixed z-50 left-0 bottom-0 right-0 top-auto sm:top-0 sm:bottom-auto w-full sm:right-auto sm:w-14 md:w-16 lg:w-20 flex flex-col">
        <svg className="relative w-full h-full place-self-start hidden sm:block" width="132" height="1062" viewBox="0 0 132 1062" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M132 10C132 4.47715 127.523 0 122 0H10C4.47715 0 0 4.47718 0 10V1052C0 1057.52 4.47715 1062 10 1062H122C127.523 1062 132 1057.52 132 1052V758.597C132 748.097 112.32 741.051 102.87 745.629C94.4454 749.711 84.99 752 75 752C39.6538 752 11 723.346 11 688C11 652.654 39.6538 624 75 624C84.99 624 94.4454 626.289 102.87 630.371C112.32 634.949 132 627.903 132 617.403V10Z"
            fill="url(#paint0_linear_125_392)"
          />
          <defs>
            <linearGradient id="paint0_linear_125_392" x1="66" y1="0" x2="66" y2="1062" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2D947F" />
              <stop offset="1" stopColor="#56C596" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="relative w-full h-full place-self-end block sm:hidden" width="390" height="56" viewBox="0 0 390 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M194.5 51C213.002 51 228 36.0015 228 17.5C228 17.3191 227.999 17.1385 227.996 16.9582C227.872 9.14109 233.125 0 240.943 0H380C385.523 0 390 4.47715 390 10V29V55C390 55.5523 389.552 56 389 56H0.999988C0.44771 56 0 55.5523 0 55V29V10C0 4.47715 4.47715 0 10 0H148.057C155.875 0 161.128 9.14109 161.004 16.9582C161.001 17.1385 161 17.3191 161 17.5C161 36.0015 175.998 51 194.5 51Z"
            fill="url(#paint0_linear_239_184)"
          />
          <defs>
            <linearGradient id="paint0_linear_239_184" x1="0" y1="42.5" x2="390" y2="42.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2D947F" />
              <stop offset="0.504828" stopColor="#2D947F" />
              <stop offset="1" stopColor="#56C596" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute left-1/2 -translate-x-1/2 flex sm:flex-col flex-row w-full h-full sm:w-auto sm:px-0 px-6">
          {/* Desktop */}
          <ul className="lg:gap-12 md:gap-10 sm:gap-9 sm:flex-col justify-center items-center sm:w-auto sm:h-auto w-full h-full sm:flex hidden">
            <li className="border-b md:mt-3 lg:mt-4 sm:mt-3 pb-2.5 sm:block hidden">
              <Link href={"/my"}>
                <svg width="60" height="60" className="lg:h-11 md:h-9 sm:h-8 h-6 gcDropShadow" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.447 1.72482C15.3427 2.8292 14.7222 4.32706 14.7222 5.88889V14.7222H5.88889C4.32706 14.7222 2.8292 15.3427 1.72482 16.447C0.620434 17.5514 0 19.0493 0 20.6111V32.3889C0 33.9507 0.620434 35.4486 1.72482 36.553C2.8292 37.6573 4.32706 38.2778 5.88889 38.2778H14.7222V47.1111C14.7222 48.6729 15.3427 50.1708 16.447 51.2752C17.5514 52.3796 19.0493 53 20.6111 53H32.3889C33.9507 53 35.4486 52.3796 36.553 51.2752C37.6573 50.1708 38.2778 48.6729 38.2778 47.1111V38.2778H47.1111C48.6729 38.2778 50.1708 37.6573 51.2752 36.553C52.3796 35.4486 53 33.9507 53 32.3889V20.6111C53 19.0493 52.3796 17.5514 51.2752 16.447C50.1708 15.3427 48.6729 14.7222 47.1111 14.7222H38.2778V5.88889C38.2778 4.32706 37.6573 2.8292 36.553 1.72482C35.4486 0.620434 33.9507 0 32.3889 0H20.6111C19.0493 0 17.5514 0.620434 16.447 1.72482ZM20.1175 10.0879C19.7748 9.4597 20.2424 8.72091 20.9588 8.78955C23.389 9.02216 26.0215 9.89509 28.2728 11.2279C36.0041 15.805 39.2433 24.7372 35.3856 32.4196C33.52 36.4506 29.9267 38.2336 27.0564 38.5911C27.5521 42.122 28.9989 44.21 29.1186 44.3761C29.6558 45.1258 29.4925 46.2099 28.7312 46.8002C27.9771 47.3885 26.9259 47.2613 26.3786 46.5183C24.4388 43.8718 20.4946 34.7698 27.4906 22.9528C27.7354 22.5392 27.6129 22.0096 27.2183 21.776C26.8236 21.5423 26.3004 21.6896 26.0555 22.1033C22.4212 28.2421 21.5982 33.6013 21.8722 37.8135C21.8342 37.7962 21.7962 37.779 21.7582 37.7618C21.4722 37.6324 21.1883 37.5038 20.9112 37.3398C16.1576 34.5255 14.6941 28.1999 17.6438 23.2174L19.8701 19.457C21.6344 16.4769 21.672 12.9761 20.1175 10.0879Z"
                    fill="#fafafa"
                  />
                </svg>
              </Link>
            </li>

            <li className={`w-full justify-center items-center flex ${pathname.startsWith("/my/library") ? classDesktopActive : classDesktopHover}`}>
              <Link href={"/my/library"}>
                <svg className="lg:h-9 md:h-7 sm:h-6 h-6 gcDropShadow" width="61" height="45" viewBox="0 0 61 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M28.5547 7.46528V44.7917C26.651 42.9253 22.8437 39.1927 14.2773 39.1927C10.283 39.172 6.31039 39.7696 2.50615 40.9634C2.21995 41.057 1.91516 41.0826 1.61689 41.038C1.31863 40.9935 1.03543 40.88 0.790664 40.7071C0.545895 40.5342 0.346558 40.3067 0.209088 40.0434C0.071618 39.7801 -4.74901e-05 39.4885 2.71097e-08 39.1927V5.59896C-4.4334e-05 5.34124 0.0543548 5.08631 0.15977 4.85022C0.265185 4.61413 0.419332 4.40201 0.612498 4.22721C3.27665 1.8178 9.15082 0 14.2773 0C21.2942 0 25.3727 3.7401 27.5648 5.74873L27.9422 6.094C28.1353 6.26874 28.2894 6.48079 28.3948 6.71679C28.5002 6.9528 28.5547 7.20764 28.5547 7.46528ZM32.362 7.46528V44.7917C34.2656 42.9253 38.0729 39.1927 46.6393 39.1927C50.6336 39.172 54.6063 39.7696 58.4105 40.9634C58.6967 41.0572 59.0016 41.083 59.2999 41.0385C59.5983 40.994 59.8816 40.8806 60.1264 40.7076C60.3712 40.5347 60.5706 40.3071 60.708 40.0437C60.8454 39.7802 60.9169 39.4886 60.9166 39.1927V5.59896C60.9167 5.34124 60.8623 5.08631 60.7569 4.85022C60.6515 4.61413 60.4973 4.40201 60.3041 4.22721C57.64 1.81826 51.7663 0 46.6393 0C39.6234 0 35.5434 3.7401 33.3519 5.74873C33.22 5.87004 33.0953 5.98482 32.9745 6.094C32.7814 6.26874 32.6272 6.48079 32.5218 6.71679C32.4164 6.9528 32.362 7.20764 32.362 7.46528Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </Link>
            </li>

            <li className={`w-full justify-center items-center flex ${pathname.startsWith("/my/forum") ? classDesktopActive : classDesktopHover}`}>
              <Link href={"/my/forum"}>
                <svg className="lg:h-9 md:h-7 sm:h-6 h-6 gcDropShadow" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M25.9792 0C32.861 0 39.4857 2.72768 44.3438 7.61151C49.2279 12.4979 51.9583 19.0937 51.9583 26.0038C51.9583 35.0961 47.1756 43.5389 39.3818 48.2409C31.5881 52.9429 21.8978 53.2027 13.8469 48.9163H13.7664C12.9896 48.6046 12.3635 48.059 11.6361 47.6954C10.8333 47.3576 9.92144 47.3057 9.09271 47.5681C7.16765 48.2409 5.21921 48.7864 3.21882 49.254C2.17965 49.28 1.8679 48.6565 1.8679 47.6434C2.33553 45.5911 2.95903 43.5623 3.68904 41.5906C3.97221 40.7333 3.89687 39.8241 3.45523 39.0161L2.93564 38.0056C1.01059 34.3427 0 30.2642 0 26.1363V25.9779C0 19.0937 2.72521 12.4694 7.6093 7.61151C12.4934 2.72768 19.0921 0 25.9792 0ZM37.953 22.6787C36.1344 22.6787 34.6302 24.1594 34.6302 26.0038C34.6302 27.8223 36.1344 29.329 37.953 29.329C39.7975 29.329 41.2783 27.8223 41.2783 26.0038C41.2783 24.1594 39.7975 22.6787 37.953 22.6787ZM25.9792 22.6787C24.1346 22.6787 22.6512 24.1594 22.6512 26.0038C22.6512 27.8223 24.1346 29.329 25.9792 29.329C27.8237 29.329 29.3019 27.8223 29.3019 26.0038C29.3019 24.1594 27.8237 22.6787 25.9792 22.6787ZM14.0002 22.6787C12.1556 22.6787 10.6748 24.1594 10.6748 26.0038C10.6748 27.8223 12.1556 29.329 14.0002 29.329C15.8187 29.329 17.3281 27.8223 17.3281 26.0038C17.3281 24.1594 15.8187 22.6787 14.0002 22.6787Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </Link>
            </li>

            <li className={`w-full justify-center items-center flex ${pathname.startsWith("/my/saved") ? classDesktopActive : classDesktopHover}`}>
              <Link href={"/my/saved"}>
                <svg className="lg:h-9 md:h-7 sm:h-6 h-6 gcDropShadow" width="45" height="53" viewBox="0 0 45 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M40.9219 0C41.4609 0 41.9766 0.105089 42.4688 0.315268C43.2422 0.618859 43.8574 1.0976 44.3145 1.75149C44.7715 2.40538 45 3.12932 45 3.92333V49.0767C45 49.8707 44.7715 50.5946 44.3145 51.2485C43.8574 51.9024 43.2422 52.3811 42.4688 52.6847C42.0234 52.8716 41.5078 52.965 40.9219 52.965C39.7969 52.965 38.8242 52.5913 38.0039 51.844L22.5 36.9914L6.99609 51.844C6.15234 52.6147 5.17969 53 4.07812 53C3.53906 53 3.02344 52.8949 2.53125 52.6847C1.75781 52.3811 1.14258 51.9024 0.685547 51.2485C0.228516 50.5946 0 49.8707 0 49.0767V3.92333C0 3.12932 0.228516 2.40538 0.685547 1.75149C1.14258 1.0976 1.75781 0.618859 2.53125 0.315268C3.02344 0.105089 3.53906 0 4.07812 0H40.9219Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </Link>
            </li>

            <li className="lg:mt-6 md:mt-3 sm:mt-1 ml-3">
              <Link href={"/my/detection"}>
                <svg className="lg:h-11 md:h-9 sm:h-8 h-6 gcDropShadow" width="83" height="75" viewBox="0 0 83 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.3406 8.25556L28.8944 0H53.6611L61.2149 8.25556H74.3C78.8612 8.25556 82.5556 11.9499 82.5556 16.5111V66.0444C82.5556 70.6056 78.8612 74.3 74.3 74.3H8.25556C3.69436 74.3 0 70.6056 0 66.0444V16.5111C0 11.9499 3.69436 8.25556 8.25556 8.25556H21.3406ZM20.6389 41.2778C20.6389 52.6704 29.8851 61.9167 41.2778 61.9167C52.6704 61.9167 61.9167 52.6704 61.9167 41.2778C61.9167 29.8851 52.6704 20.6389 41.2778 20.6389C29.8851 20.6389 20.6389 29.8851 20.6389 41.2778ZM50.955 29.2723C51.2671 28.7491 52.0124 28.7713 52.2733 29.3255C53.1584 31.2053 53.6616 33.5107 53.6616 35.7364C53.6616 43.3798 48.5139 49.6222 41.2 50.1277C37.4313 50.509 34.5616 48.6513 33.0522 46.705C30.6764 48.5981 29.7726 50.5622 29.7028 50.7218C29.386 51.44 28.5195 51.7902 27.7555 51.4888C26.9962 51.1917 26.6328 50.3671 26.9403 49.6444C28.0397 47.0774 33.0057 40.2453 44.7172 40.2453C45.1271 40.2453 45.4626 39.9261 45.4626 39.5359C45.4626 39.1458 45.1271 38.8266 44.7172 38.8266C38.6332 38.8266 34.3427 40.5468 31.3705 42.5729C31.3667 42.5375 31.3628 42.5022 31.3589 42.467C31.3297 42.2016 31.3006 41.938 31.3006 41.664C31.3006 36.9645 35.307 33.1516 40.245 33.1516H43.9718C46.9253 33.1516 49.5108 31.662 50.955 29.2723Z"
                    fill="url(#paint0_linear_194_164)"
                  />
                  <defs>
                    <linearGradient id="paint0_linear_194_164" x1="41.2778" y1="0" x2="41.2778" y2="74.3" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2D947F" />
                      <stop offset="1" stopColor="#329D9C" />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>
            </li>
          </ul>
          <div className={`items-center justify-center lg:mt-20 md:mt-16 sm:mt-12 sm:flex-col flex-row gap-2 sm:flex hidden `}>
            <Link href={"/my/profile"} className={`w-full justify-center items-center flex ${pathname.startsWith("/my/profile") ? classDesktopActive : classDesktopHover}`}>
              <div className={`flex justify-center items-center bg-gcNeutrals-baseWhite rounded-full h-max w-max p-1 ${loading && "animate-pulse"}`}>
                {!loading && userData?.avatar !== undefined && (
                  <img
                    className={`rounded-full object-cover object-center lg:w-12 md:w-10 sm:w-8 ${!userData.avatar && "p-2"}`}
                    src={userData.avatar ? `${host}/uploads/${userData.avatar}` : "/avatars/default-avatar.svg"}
                    alt="User Profile"
                  />
                )}
                {!loading && userData?.avatar === undefined && <img className={`rounded-full object-cover object-center lg:w-12 md:w-10 sm:w-8 p-2`} src={"/avatars/default-avatar.svg"} alt="User Profile" />}
                {loading && <div className="rounded-full lg:w-12 md:w-10 sm:w-8 lg:h-12 md:h-10 sm:h-8"></div>}
              </div>
            </Link>
            <span className="p-1 bg-gcPrimary-1000 rounded-xl lg:px-3 sm:px-2 font-bold text-gcNeutrals-baseWhite lg:text-sm sm:text-xs sm:block hidden">{userData?.username ? "Free" : "Guest"}</span>
          </div>

          {/* Mobile */}
          <ul className="sm:hidden flex w-full h-full justify-between">
            <div className="flex justify-between items-center gap-10">
              <li>
                <Link href={"/my"} className={pathname == "/my" ? classMobileActive : classMobileHover}>
                  <svg className="gcDropShadow h-[27px]" width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.9333 0.724645C13.3923 0.256664 12.7075 0 12 0C11.2925 0 10.6077 0.256664 10.0667 0.724645L1.06667 8.51799C0.732612 8.80695 0.464079 9.1673 0.279837 9.57385C0.0955946 9.98041 9.0305e-05 10.4234 0 10.8717V23.6052C0 24.9271 1.04533 26 2.33333 26H6.33333C6.95217 26 7.54566 25.7477 7.98325 25.2986C8.42083 24.8495 8.66667 24.2403 8.66667 23.6052V18.1273C8.66667 17.1967 9.38933 16.4413 10.2893 16.4167H13.7107C14.145 16.4285 14.5577 16.6139 14.8608 16.9334C15.1639 17.2529 15.3335 17.6813 15.3333 18.1273V23.6052C15.3333 24.9271 16.3787 26 17.6667 26H21.6667C22.2855 26 22.879 25.7477 23.3166 25.2986C23.7542 24.8495 24 24.2403 24 23.6052V10.8704C23.9999 10.422 23.9044 9.97904 23.7202 9.57248C23.5359 9.16593 23.2674 8.80558 22.9333 8.51663L13.9333 0.724645Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href={"/my/forum"} className={pathname.startsWith("/my/forum") ? classMobileActive : classMobileHover}>
                  <svg className="gcDropShadow h-[27px]" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M25.9792 0C32.861 0 39.4857 2.72768 44.3438 7.61151C49.2279 12.4979 51.9583 19.0937 51.9583 26.0038C51.9583 35.0961 47.1756 43.5389 39.3818 48.2409C31.5881 52.9429 21.8978 53.2027 13.8469 48.9163H13.7664C12.9896 48.6046 12.3635 48.059 11.6361 47.6954C10.8333 47.3576 9.92144 47.3057 9.09271 47.5681C7.16765 48.2409 5.21921 48.7864 3.21882 49.254C2.17965 49.28 1.8679 48.6565 1.8679 47.6434C2.33553 45.5911 2.95903 43.5623 3.68904 41.5906C3.97221 40.7333 3.89687 39.8241 3.45523 39.0161L2.93564 38.0056C1.01059 34.3427 0 30.2642 0 26.1363V25.9779C0 19.0937 2.72521 12.4694 7.6093 7.61151C12.4934 2.72768 19.0921 0 25.9792 0ZM37.953 22.6787C36.1344 22.6787 34.6302 24.1594 34.6302 26.0038C34.6302 27.8223 36.1344 29.329 37.953 29.329C39.7975 29.329 41.2783 27.8223 41.2783 26.0038C41.2783 24.1594 39.7975 22.6787 37.953 22.6787ZM25.9792 22.6787C24.1346 22.6787 22.6512 24.1594 22.6512 26.0038C22.6512 27.8223 24.1346 29.329 25.9792 29.329C27.8237 29.329 29.3019 27.8223 29.3019 26.0038C29.3019 24.1594 27.8237 22.6787 25.9792 22.6787ZM14.0002 22.6787C12.1556 22.6787 10.6748 24.1594 10.6748 26.0038C10.6748 27.8223 12.1556 29.329 14.0002 29.329C15.8187 29.329 17.3281 27.8223 17.3281 26.0038C17.3281 24.1594 15.8187 22.6787 14.0002 22.6787Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                </Link>
              </li>
            </div>
            <div className="-mt-2 ml-1">
              <li className="">
                <Link href={"/my/detection"}>
                  <svg className="h-[42px]" width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.1155 4.3L15.05 0H27.95L31.8845 4.3H38.7C41.0757 4.3 43 6.22425 43 8.6V34.4C43 36.7758 41.0757 38.7 38.7 38.7H4.3C1.92425 38.7 0 36.7758 0 34.4V8.6C0 6.22425 1.92425 4.3 4.3 4.3H11.1155ZM10.75 21.5C10.75 27.434 15.566 32.25 21.5 32.25C27.434 32.25 32.25 27.434 32.25 21.5C32.25 15.566 27.434 10.75 21.5 10.75C15.566 10.75 10.75 15.566 10.75 21.5ZM26.5402 15.2468C26.7028 14.9743 27.091 14.9859 27.2269 15.2745C27.688 16.2536 27.95 17.4545 27.95 18.6137C27.95 22.5949 25.2688 25.8463 21.4593 26.1096C19.4963 26.3082 18.0016 25.3406 17.2154 24.3268C15.9779 25.3129 15.5072 26.3359 15.4708 26.419C15.3058 26.7931 14.8545 26.9755 14.4565 26.8185C14.061 26.6638 13.8718 26.2343 14.0319 25.8579C14.6046 24.5208 17.1911 20.9622 23.2912 20.9622C23.5048 20.9622 23.6795 20.796 23.6795 20.5927C23.6795 20.3895 23.5048 20.2233 23.2912 20.2233C20.1223 20.2233 17.8875 21.1193 16.3395 22.1746C16.3375 22.1562 16.3354 22.1378 16.3334 22.1194C16.3182 21.9812 16.3031 21.8439 16.3031 21.7012C16.3031 19.2534 18.3898 17.2674 20.9618 17.2674H22.903C24.4414 17.2674 25.788 16.4915 26.5402 15.2468Z"
                      fill="url(#paint0_linear_194_227)"
                    />
                    <defs>
                      <linearGradient id="paint0_linear_194_227" x1="21.5" y1="0" x2="21.5" y2="38.7" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2D947F" />
                        <stop offset="1" stopColor="#329D9C" />
                      </linearGradient>
                    </defs>
                  </svg>
                </Link>
              </li>
            </div>
            <div className="flex justify-between items-center gap-6">
              <li className="">
                <Link href={"/my/library"} className={pathname.startsWith("/my/library") ? classMobileActive : classMobileHover}>
                  <svg className="gcDropShadow h-[27px]" width="61" height="45" viewBox="0 0 61 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M28.5547 7.46528V44.7917C26.651 42.9253 22.8437 39.1927 14.2773 39.1927C10.283 39.172 6.31039 39.7696 2.50615 40.9634C2.21995 41.057 1.91516 41.0826 1.61689 41.038C1.31863 40.9935 1.03543 40.88 0.790664 40.7071C0.545895 40.5342 0.346558 40.3067 0.209088 40.0434C0.071618 39.7801 -4.74901e-05 39.4885 2.71097e-08 39.1927V5.59896C-4.4334e-05 5.34124 0.0543548 5.08631 0.15977 4.85022C0.265185 4.61413 0.419332 4.40201 0.612498 4.22721C3.27665 1.8178 9.15082 0 14.2773 0C21.2942 0 25.3727 3.7401 27.5648 5.74873L27.9422 6.094C28.1353 6.26874 28.2894 6.48079 28.3948 6.71679C28.5002 6.9528 28.5547 7.20764 28.5547 7.46528ZM32.362 7.46528V44.7917C34.2656 42.9253 38.0729 39.1927 46.6393 39.1927C50.6336 39.172 54.6063 39.7696 58.4105 40.9634C58.6967 41.0572 59.0016 41.083 59.2999 41.0385C59.5983 40.994 59.8816 40.8806 60.1264 40.7076C60.3712 40.5347 60.5706 40.3071 60.708 40.0437C60.8454 39.7802 60.9169 39.4886 60.9166 39.1927V5.59896C60.9167 5.34124 60.8623 5.08631 60.7569 4.85022C60.6515 4.61413 60.4973 4.40201 60.3041 4.22721C57.64 1.81826 51.7663 0 46.6393 0C39.6234 0 35.5434 3.7401 33.3519 5.74873C33.22 5.87004 33.0953 5.98482 32.9745 6.094C32.7814 6.26874 32.6272 6.48079 32.5218 6.71679C32.4164 6.9528 32.362 7.20764 32.362 7.46528Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                </Link>
              </li>
              <Link href={"/my/profile"} className={pathname.startsWith("/my/profile") ? classMobileActive : classMobileHover}>
                <div className={`flex justify-center items-center bg-gcNeutrals-baseWhite rounded-full h-max w-max p-1 ${loading && "animate-pulse"}`}>
                  {!loading && userData?.avatar !== undefined && (
                    <img className={`rounded-full object-cover object-center w-7`} src={userData.avatar ? `${host}/uploads/${userData.avatar}` : "/avatars/default-avatar.svg"} alt="User Profile" />
                  )}
                  {!loading && userData?.avatar === undefined && <img className={`rounded-full object-cover object-center w-7 p-1`} src={"/avatars/default-avatar.svg"} alt="User Profile" />}
                  {loading && <div className="rounded-full w-7 h-7"></div>}
                </div>
              </Link>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}
