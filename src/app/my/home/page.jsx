"use client";

import Link from "next/link";
import LoggedInNavbar from "../LoggedInNavbar";
import WeatherCard from "./WeatherCard";
import { useContext, useEffect, useRef, useState } from "react";
import request from "@/app/utils/request";
import { UserContext } from "@/contexts/UserContext";
import { getUserData } from "@/app/utils/getUserData";
import { ArticleContext } from "@/contexts/ArticleContext";
import { getArticlesData } from "@/app/utils/getArticlesData";
import { hostNoPrefix } from "@/app/utils/urlApi";
import { useRouter } from "next/navigation";

export default function MyHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);
  const { articles, setArticles } = useContext(ArticleContext);

  const [scrollPosition, setScrollPosition] = useState(0);

  const articleSliderContainerRef = useRef();

  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;

    setScrollPosition(newScrollPosition);

    articleSliderContainerRef.current.scrollLeft = newScrollPosition;
  };

  useEffect(() => {
    if (!articles) {
      getArticlesData().then(
        (res) => {
          if (res) {
            setArticles(res);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, [articles]);

  useEffect(() => {
    if (!userData) {
      const data = getUserData();
      if (data) {
        data.then(
          (response) => {
            setUserData(response);
            setLoading(false);
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        setLoading(false);
        setUserData(null);
      }
    } else {
      setLoading(false);
    }
  }, [userData, setUserData]);

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 lg:px-14 md:px-12 sm:px-10 px-4 mb-20">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-row gap-2">
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce"></div>
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-row justify-between xl:mt-12 lg:mt-14 md:mt-12 sm:mt-11 mt-10 relative">
              <div className="text-gcPrimary-1000">
                <h1 className="gcHeading1p">Hi {userData?.name.split(" ")[0]},</h1>
                <h3 className="gcContentBody4p">Tanamanmu Membutuhkanmu</h3>
              </div>
              <div className="place-self-center sm:block hidden">
                <form className="xl:w-96 lg:w-80 md:w-72 sm:w-64 mx-auto">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                      <svg className="lg:w-5 lg:h-5 h-4 w-4 text-gcPrimary-1000" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.61426" y="2.15909" width="20.6818" height="20.6818" rx="10.3409" stroke="#205072" strokeWidth="2.95455" />
                        <path d="M19.3409 19.8864L25.25 25.7955" stroke="#205072" strokeWidth="2.95455" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full lg:px-4 lg:py-4 px-3 md:py-3 py-2.5 lg:ps-12 ps-10 gcContentBody3p text-gcPrimary-1000 placeholder:text-gcPrimary-1000 rounded-3xl bg-gradient-to-r from-gcPrimary-200 to-gcPrimary-100 outline-none placeholder:gcContentBody3p"
                      placeholder="Search plants or diseases...."
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="sm:hidden block absolute right-0 -top-1/2">
                <svg width="60" height="60" className="w-11 gcDropShadow" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.447 1.72482C15.3427 2.8292 14.7222 4.32706 14.7222 5.88889V14.7222H5.88889C4.32706 14.7222 2.8292 15.3427 1.72482 16.447C0.620434 17.5514 0 19.0493 0 20.6111V32.3889C0 33.9507 0.620434 35.4486 1.72482 36.553C2.8292 37.6573 4.32706 38.2778 5.88889 38.2778H14.7222V47.1111C14.7222 48.6729 15.3427 50.1708 16.447 51.2752C17.5514 52.3796 19.0493 53 20.6111 53H32.3889C33.9507 53 35.4486 52.3796 36.553 51.2752C37.6573 50.1708 38.2778 48.6729 38.2778 47.1111V38.2778H47.1111C48.6729 38.2778 50.1708 37.6573 51.2752 36.553C52.3796 35.4486 53 33.9507 53 32.3889V20.6111C53 19.0493 52.3796 17.5514 51.2752 16.447C50.1708 15.3427 48.6729 14.7222 47.1111 14.7222H38.2778V5.88889C38.2778 4.32706 37.6573 2.8292 36.553 1.72482C35.4486 0.620434 33.9507 0 32.3889 0H20.6111C19.0493 0 17.5514 0.620434 16.447 1.72482ZM20.1175 10.0879C19.7748 9.4597 20.2424 8.72091 20.9588 8.78955C23.389 9.02216 26.0215 9.89509 28.2728 11.2279C36.0041 15.805 39.2433 24.7372 35.3856 32.4196C33.52 36.4506 29.9267 38.2336 27.0564 38.5911C27.5521 42.122 28.9989 44.21 29.1186 44.3761C29.6558 45.1258 29.4925 46.2099 28.7312 46.8002C27.9771 47.3885 26.9259 47.2613 26.3786 46.5183C24.4388 43.8718 20.4946 34.7698 27.4906 22.9528C27.7354 22.5392 27.6129 22.0096 27.2183 21.776C26.8236 21.5423 26.3004 21.6896 26.0555 22.1033C22.4212 28.2421 21.5982 33.6013 21.8722 37.8135C21.8342 37.7962 21.7962 37.779 21.7582 37.7618C21.4722 37.6324 21.1883 37.5038 20.9112 37.3398C16.1576 34.5255 14.6941 28.1999 17.6438 23.2174L19.8701 19.457C21.6344 16.4769 21.672 12.9761 20.1175 10.0879Z"
                    fill="#56C596"
                  />
                </svg>
              </div>
            </div>

            <div className="sm:mt-3 mt-1.5 flex sm:flex-row flex-col justify-center items-stretch gap-3">
              <div className="sm:w-3/5 w-full grid grid-cols-2 gap-2">
                <Link href={"/my/detection"}>
                  <div className="bg-gradient-to-r rounded-2xl from-gcPrimary-600 to-gcPrimary-basePrimary md:p-5 p-4">
                    <svg className="xl:h-9 lg:h-8 h-6 w-max" width="53" height="47" viewBox="0 0 53 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.0997 5.35413L18.8539 0.158295H34.4414L39.1955 5.35413H47.4309C50.3016 5.35413 52.6268 7.67926 52.6268 10.55V41.725C52.6268 44.5957 50.3016 46.9208 47.4309 46.9208H5.86429C2.99359 46.9208 0.668457 44.5957 0.668457 41.725V10.55C0.668457 7.67926 2.99359 5.35413 5.86429 5.35413H14.0997ZM13.658 26.1375C13.658 33.3077 19.4774 39.127 26.6476 39.127C33.8179 39.127 39.6372 33.3077 39.6372 26.1375C39.6372 18.9672 33.8179 13.1479 26.6476 13.1479C19.4774 13.1479 13.658 18.9672 13.658 26.1375ZM32.7388 18.5816C32.9353 18.2523 33.4044 18.2663 33.5686 18.615C34.1257 19.7982 34.4423 21.2491 34.4423 22.6499C34.4423 27.4605 31.2025 31.3893 26.5993 31.7074C24.2274 31.9474 22.4213 30.7782 21.4713 29.5532C19.976 30.7447 19.4072 31.9809 19.3633 32.0813C19.1639 32.5333 18.6185 32.7538 18.1377 32.564C17.6598 32.3771 17.4311 31.8581 17.6246 31.4032C18.3166 29.7876 21.442 25.4877 28.813 25.4877C29.071 25.4877 29.2821 25.2868 29.2821 25.0412C29.2821 24.7957 29.071 24.5948 28.813 24.5948C24.9838 24.5948 22.2835 25.6774 20.4129 26.9526C20.4105 26.9304 20.408 26.9082 20.4056 26.886C20.3872 26.7189 20.3689 26.553 20.3689 26.3806C20.3689 23.4228 22.8904 21.0231 25.9983 21.0231H28.3438C30.2027 21.0231 31.8299 20.0856 32.7388 18.5816Z"
                        fill="#F5F5F5"
                      />
                    </svg>
                    <h3 className="text-gcNeutrals-baseWhite gcHeading7p mt-1">Deteksi</h3>
                  </div>
                </Link>
                <Link href={"/my/library"}>
                  <div className="bg-gradient-to-r rounded-2xl from-gcPrimary-600 to-gcPrimary-basePrimary md:p-5 p-4">
                    <svg className="xl:h-9 lg:h-8 h-6 w-max" width="62" height="46" viewBox="0 0 62 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M29.0976 8.13186V45.4582C27.194 43.5919 23.3867 39.8593 14.8203 39.8593C10.826 39.8386 6.85336 40.4361 3.04912 41.63C2.76292 41.7236 2.45812 41.7492 2.15986 41.7046C1.86159 41.66 1.5784 41.5466 1.33363 41.3737C1.08886 41.2007 0.889527 40.9733 0.752057 40.7099C0.614587 40.4466 0.542921 40.1551 0.542969 39.8593V6.26554C0.542924 6.00782 0.597324 5.75289 0.702739 5.5168C0.808154 5.28071 0.962301 5.06859 1.15547 4.89379C3.81962 2.48438 9.69379 0.66658 14.8203 0.66658C21.8371 0.66658 25.9157 4.40668 28.1078 6.41531L28.4852 6.76058C28.6783 6.93532 28.8324 7.14737 28.9378 7.38337C29.0432 7.61938 29.0976 7.87422 29.0976 8.13186ZM32.9049 8.13186V45.4582C34.8086 43.5919 38.6159 39.8593 47.1823 39.8593C51.1766 39.8386 55.1492 40.4361 58.9535 41.63C59.2397 41.7238 59.5445 41.7495 59.8429 41.7051C60.1412 41.6606 60.4245 41.5472 60.6693 41.3742C60.9142 41.2012 61.1135 40.9737 61.2509 40.7102C61.3883 40.4468 61.4599 40.1551 61.4596 39.8593V6.26554C61.4597 6.00782 61.4053 5.75289 61.2998 5.5168C61.1944 5.28071 61.0403 5.06859 60.8471 4.89379C58.183 2.48484 52.3093 0.66658 47.1823 0.66658C40.1664 0.66658 36.0864 4.40668 33.8948 6.41531C33.763 6.53662 33.6383 6.6514 33.5174 6.76058C33.3243 6.93532 33.1702 7.14737 33.0648 7.38337C32.9594 7.61938 32.905 7.87422 32.9049 8.13186Z"
                        fill="#F5F5F5"
                      />
                    </svg>

                    <h3 className="text-gcNeutrals-baseWhite gcHeading7p mt-1">Perpustakaan</h3>
                  </div>
                </Link>
                <Link href={"/my/scarecrow"}>
                  <div className="bg-gradient-to-r rounded-2xl from-gcPrimary-600 to-gcPrimary-basePrimary md:p-5 p-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:h-9 lg:h-8 h-6 w-max fill-[#F5F5F5]">
                      <path
                        d="M24 14.88C24 15.2619 23.8645 15.6282 23.6234 15.8982C23.3823 16.1683 23.0553 16.32 22.7143 16.32H21.4287V17.76C21.4287 18.1419 21.2932 18.5082 21.0521 18.7782C20.811 19.0483 20.484 19.2 20.143 19.2C19.8021 19.2 19.4751 19.0483 19.2339 18.7782C18.9928 18.5082 18.8574 18.1419 18.8574 17.76V16.32H17.5717C17.2308 16.32 16.9037 16.1683 16.6626 15.8982C16.4215 15.6282 16.2861 15.2619 16.2861 14.88C16.2861 14.4981 16.4215 14.1318 16.6626 13.8618C16.9037 13.5917 17.2308 13.44 17.5717 13.44H18.8574V12C18.8574 11.6181 18.9928 11.2518 19.2339 10.9818C19.4751 10.7117 19.8021 10.56 20.143 10.56C20.484 10.56 20.811 10.7117 21.0521 10.9818C21.2932 11.2518 21.4287 11.6181 21.4287 12V13.44H22.7143C23.0553 13.44 23.3823 13.5917 23.6234 13.8618C23.8645 14.1318 24 14.4981 24 14.88ZM3.00101 5.76H4.28666V7.2C4.28666 7.58191 4.42211 7.94818 4.66322 8.21823C4.90432 8.48829 5.23133 8.64 5.57231 8.64C5.91329 8.64 6.2403 8.48829 6.4814 8.21823C6.72251 7.94818 6.85796 7.58191 6.85796 7.2V5.76H8.14362C8.48459 5.76 8.8116 5.60829 9.05271 5.33823C9.29382 5.06818 9.42927 4.70191 9.42927 4.32C9.42927 3.93809 9.29382 3.57182 9.05271 3.30177C8.8116 3.03171 8.48459 2.88 8.14362 2.88H6.85796V1.44C6.85796 1.05809 6.72251 0.691819 6.4814 0.421766C6.2403 0.151714 5.91329 0 5.57231 0C5.23133 0 4.90432 0.151714 4.66322 0.421766C4.42211 0.691819 4.28666 1.05809 4.28666 1.44V2.88H3.00101C2.66003 2.88 2.33302 3.03171 2.09191 3.30177C1.85081 3.57182 1.71535 3.93809 1.71535 4.32C1.71535 4.70191 1.85081 5.06818 2.09191 5.33823C2.33302 5.60829 2.66003 5.76 3.00101 5.76ZM16.7146 19.2H16.2861V18.72C16.2861 18.3381 16.1506 17.9718 15.9095 17.7018C15.6684 17.4317 15.3414 17.28 15.0004 17.28C14.6595 17.28 14.3324 17.4317 14.0913 17.7018C13.8502 17.9718 13.7148 18.3381 13.7148 18.72V19.2H13.2862C12.9453 19.2 12.6182 19.3517 12.3771 19.6218C12.136 19.8918 12.0006 20.2581 12.0006 20.64C12.0006 21.0219 12.136 21.3882 12.3771 21.6582C12.6182 21.9283 12.9453 22.08 13.2862 22.08H13.7148V22.56C13.7148 22.9419 13.8502 23.3082 14.0913 23.5782C14.3324 23.8483 14.6595 24 15.0004 24C15.3414 24 15.6684 23.8483 15.9095 23.5782C16.1506 23.3082 16.2861 22.9419 16.2861 22.56V22.08H16.7146C17.0556 22.08 17.3826 21.9283 17.6237 21.6582C17.8648 21.3882 18.0003 21.0219 18.0003 20.64C18.0003 20.2581 17.8648 19.8918 17.6237 19.6218C17.3826 19.3517 17.0556 19.2 16.7146 19.2ZM20.8009 6.5796L5.87444 23.2968C5.47261 23.7467 4.92769 23.9995 4.35951 23.9995C3.79133 23.9995 3.24641 23.7467 2.84458 23.2968L0.627905 20.8152C0.42884 20.5923 0.270928 20.3277 0.16319 20.0365C0.0554527 19.7452 0 19.4331 0 19.1178C0 18.8025 0.0554527 18.4904 0.16319 18.1991C0.270928 17.9079 0.42884 17.6433 0.627905 17.4204L15.5543 0.7032C15.9562 0.253269 16.5011 0.000512466 17.0693 0.000512466C17.6374 0.000512466 18.1824 0.253269 18.5842 0.7032L20.8009 3.1848C20.9999 3.40767 21.1578 3.67229 21.2656 3.96354C21.3733 4.25478 21.4288 4.56695 21.4288 4.8822C21.4288 5.19745 21.3733 5.50962 21.2656 5.80086C21.1578 6.09211 20.9999 6.35673 20.8009 6.5796ZM14.0362 10.08L12.4291 8.28L2.74923 19.1172L4.3563 20.9172L14.0362 10.08ZM18.6763 4.8828L17.0693 3.0828L14.2505 6.24L15.8575 8.04L18.6763 4.8828Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                    <h3 className="text-gcNeutrals-baseWhite gcHeading7p mt-1">Ask Scarecrow</h3>
                  </div>
                </Link>
                <Link href={"/my/monitor"}>
                  <div className="bg-gradient-to-r rounded-2xl from-gcPrimary-600 to-gcPrimary-basePrimary md:p-5 p-4">
                    <svg className="xl:h-9 lg:h-8 h-6 w-max" width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M51.4561 0.791643H5.17144C3.94415 0.792471 2.76736 1.28038 1.89953 2.14821C1.0317 3.01603 0.543797 4.19282 0.542969 5.42012V51.7048C0.543797 52.9321 1.0317 54.1089 1.89953 54.9768C2.76736 55.8446 3.94415 56.3325 5.17144 56.3333H36.6125C37.2205 56.3344 37.8226 56.2152 38.3843 55.9825C38.9459 55.7497 39.456 55.4081 39.885 54.9773L54.7286 40.1337C55.1594 39.7047 55.501 39.1946 55.7338 38.633C55.9665 38.0713 56.0857 37.4692 56.0846 36.8612V5.42012C56.0838 4.19282 55.5959 3.01603 54.7281 2.14821C53.8602 1.28038 52.6834 0.792471 51.4561 0.791643ZM19.0569 16.9913H37.5707C38.1845 16.9913 38.7731 17.2351 39.2071 17.6691C39.6411 18.1031 39.885 18.6918 39.885 19.3055C39.885 19.9193 39.6411 20.5079 39.2071 20.9419C38.7731 21.3759 38.1845 21.6198 37.5707 21.6198H19.0569C18.4431 21.6198 17.8544 21.3759 17.4204 20.9419C16.9864 20.5079 16.7426 19.9193 16.7426 19.3055C16.7426 18.6918 16.9864 18.1031 17.4204 17.6691C17.8544 17.2351 18.4431 16.9913 19.0569 16.9913ZM28.3138 40.1337H19.0569C18.4431 40.1337 17.8544 39.8898 17.4204 39.4558C16.9864 39.0218 16.7426 38.4332 16.7426 37.8194C16.7426 37.2056 16.9864 36.617 17.4204 36.183C17.8544 35.749 18.4431 35.5052 19.0569 35.5052H28.3138C28.9276 35.5052 29.5162 35.749 29.9502 36.183C30.3842 36.617 30.628 37.2056 30.628 37.8194C30.628 38.4332 30.3842 39.0218 29.9502 39.4558C29.5162 39.8898 28.9276 40.1337 28.3138 40.1337ZM19.0569 30.8767C18.4431 30.8767 17.8544 30.6329 17.4204 30.1989C16.9864 29.7649 16.7426 29.1763 16.7426 28.5625C16.7426 27.9487 16.9864 27.3601 17.4204 26.9261C17.8544 26.4921 18.4431 26.2482 19.0569 26.2482H37.5707C38.1845 26.2482 38.7731 26.4921 39.2071 26.9261C39.6411 27.3601 39.885 27.9487 39.885 28.5625C39.885 29.1763 39.6411 29.7649 39.2071 30.1989C38.7731 30.6329 38.1845 30.8767 37.5707 30.8767H19.0569ZM37.5707 50.7466V37.8149H50.5024L37.5707 50.7466Z"
                        fill="#F5F5F5"
                      />
                    </svg>

                    <h3 className="text-gcNeutrals-baseWhite gcHeading7p mt-1">Pantau Tanaman</h3>
                  </div>
                </Link>
              </div>
              <div className="sm:w-2/5 w-full">
                <h1 className="sm:hidden block gcHeading3p text-gcPrimary-1000">Cuaca</h1>
                <WeatherCard />
              </div>
            </div>

            <div className="mt-5">
              <h1 className="gcHeading3p text-gcPrimary-1000 hover:underline cursor-pointer w-max" onClick={() => router.push("/my/article")}>
                Articles
              </h1>
              <div className="flex flex-col m-auto p-auto sm:mt-3 mt-1.5 xl:mt-3 relative group/item">
                {articles && articles.length > 0 ? (
                  <div ref={articleSliderContainerRef} className="flex overflow-x-scroll no-scrollbar scroll-smooth">
                    <div className="flex flex-nowrap gap-4">
                      {articles &&
                        articles.map((article, index) => {
                          if (index > 5) return;
                          return (
                            <div key={article.id} className="inline-block">
                              <div className="w-80 max-w-xs overflow-hidden rounded-lg transition-shadow duration-300 ease-in-out pb-2">
                                <img className="rounded-xl object-cover object-center xl:h-60 lg:h-65 md:h-52 h-48 w-full mb-2" src={`${hostNoPrefix}uploads/${article.image}`} alt={article.slug} />
                                <Link href={`/my/article/${article.slug}`} className="hover:underline text-gcPrimary-1000">
                                  <h2 className="gcContentBody2p text-gcPrimary-1000 px-2">{article.title}</h2>
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      {articles && articles.length > 4 && (
                        <div className="inline-block">
                          <div className="w-80 xl:h-60 lg:h-65 md:h-52 h-48 max-w-xs overflow-hidden rounded-lg transition-shadow duration-300 ease-in-out pb-2 bg-gcSecondary-200 flex justify-center items-center">
                            <Link href={"/my/article"} className="gcContentAccent1p text-gcPrimary-1000 hover:underline">
                              Selengkapnya
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">No article data</h1>
                )}

                {articles && articles.length > 1 && (
                  <>
                    <button
                      onClick={() => handleScroll(500)}
                      className="bg-gcSecondary-400 xl:w-12 xl:h-12 lg:w-11 lg:h-11 sm:h-10 sm:w-10 p-2 xl:p-3 hidden sm:flex justify-center items-center absolute right-0 top-1/2  -translate-y-1/2 translate-x-1/2 z-30 rounded-full invisible group-hover/item:visible"
                    >
                      <svg className="" width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19.6217 3.53342L21.4988 5.3746L25.9784 9.76862L31.4198 15.106L36.0978 19.6945C36.857 20.4392 37.6036 21.1922 38.3756 21.9287L38.4093 21.9618V19.0366L36.5322 20.8778L32.0526 25.2718L26.6112 30.6092L21.9332 35.1976C21.174 35.9424 20.4063 36.6789 19.6554 37.4319L19.6217 37.465C19.2378 37.8415 19.0058 38.3959 19.0058 38.9297C19.0058 39.4386 19.2336 40.0427 19.6217 40.3943C20.0224 40.7543 20.5497 41.0232 21.1149 40.9984C21.6759 40.9736 22.2032 40.7874 22.6081 40.3943L24.4852 38.5532L28.9649 34.1591L34.4063 28.8218L39.0842 24.2333C39.8435 23.4885 40.6112 22.7521 41.362 21.999L41.3958 21.9659C42.2014 21.1757 42.2014 19.831 41.3958 19.0407C40.7672 18.4201 40.1387 17.8078 39.5145 17.1913L35.0348 12.7973L29.5934 7.4599L24.9155 2.87142C24.1562 2.12667 23.4054 1.37365 22.6377 0.637177L22.6039 0.604076C22.2201 0.227566 21.6548 0 21.1107 0C20.5919 0 19.976 0.223427 19.6175 0.604076C19.2505 0.997139 18.9763 1.51432 19.0016 2.06875C19.0311 2.61903 19.2167 3.13622 19.6217 3.53342Z"
                          fill="#FAFAFA"
                        />
                        <path
                          d="M38.9264 18.0022H3.5696C3.09303 18.0022 2.61233 17.9972 2.13577 18.0022H2.0736C1.54317 18.0022 0.983727 18.282 0.606621 18.7316C0.24609 19.1662 -0.0232697 19.8756 0.00159454 20.5C0.0264549 21.1444 0.200504 21.8138 0.606621 22.2684C1.01273 22.718 1.51002 22.9978 2.0736 22.9978L37.4304 22.9978C37.907 22.9978 38.3877 23.0028 38.8642 22.9978H38.9264C39.4568 22.9978 40.0163 22.718 40.3934 22.2684C40.7539 21.8338 41.0233 21.1244 40.9984 20.5C40.9735 19.8556 40.7995 19.1862 40.3934 18.7316C39.9831 18.287 39.4858 18.0022 38.9264 18.0022Z"
                          fill="#FAFAFA"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleScroll(-500)}
                      className="bg-gcSecondary-400 xl:w-12 xl:h-12 lg:w-11 lg:h-11 sm:h-10 sm:w-10 p-2 xl:p-3 hidden sm:flex justify-center items-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 rounded-full invisible group-hover/item:visible rotate-180"
                    >
                      <svg className="w-8" width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19.6217 3.53342L21.4988 5.3746L25.9784 9.76862L31.4198 15.106L36.0978 19.6945C36.857 20.4392 37.6036 21.1922 38.3756 21.9287L38.4093 21.9618V19.0366L36.5322 20.8778L32.0526 25.2718L26.6112 30.6092L21.9332 35.1976C21.174 35.9424 20.4063 36.6789 19.6554 37.4319L19.6217 37.465C19.2378 37.8415 19.0058 38.3959 19.0058 38.9297C19.0058 39.4386 19.2336 40.0427 19.6217 40.3943C20.0224 40.7543 20.5497 41.0232 21.1149 40.9984C21.6759 40.9736 22.2032 40.7874 22.6081 40.3943L24.4852 38.5532L28.9649 34.1591L34.4063 28.8218L39.0842 24.2333C39.8435 23.4885 40.6112 22.7521 41.362 21.999L41.3958 21.9659C42.2014 21.1757 42.2014 19.831 41.3958 19.0407C40.7672 18.4201 40.1387 17.8078 39.5145 17.1913L35.0348 12.7973L29.5934 7.4599L24.9155 2.87142C24.1562 2.12667 23.4054 1.37365 22.6377 0.637177L22.6039 0.604076C22.2201 0.227566 21.6548 0 21.1107 0C20.5919 0 19.976 0.223427 19.6175 0.604076C19.2505 0.997139 18.9763 1.51432 19.0016 2.06875C19.0311 2.61903 19.2167 3.13622 19.6217 3.53342Z"
                          fill="#FAFAFA"
                        />
                        <path
                          d="M38.9264 18.0022H3.5696C3.09303 18.0022 2.61233 17.9972 2.13577 18.0022H2.0736C1.54317 18.0022 0.983727 18.282 0.606621 18.7316C0.24609 19.1662 -0.0232697 19.8756 0.00159454 20.5C0.0264549 21.1444 0.200504 21.8138 0.606621 22.2684C1.01273 22.718 1.51002 22.9978 2.0736 22.9978L37.4304 22.9978C37.907 22.9978 38.3877 23.0028 38.8642 22.9978H38.9264C39.4568 22.9978 40.0163 22.718 40.3934 22.2684C40.7539 21.8338 41.0233 21.1244 40.9984 20.5C40.9735 19.8556 40.7995 19.1862 40.3934 18.7316C39.9831 18.287 39.4858 18.0022 38.9264 18.0022Z"
                          fill="#FAFAFA"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
