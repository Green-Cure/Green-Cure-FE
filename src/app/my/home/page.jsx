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
                <Link href={"/my/forum"}>
                  <div className="bg-gradient-to-r rounded-2xl from-gcPrimary-600 to-gcPrimary-basePrimary md:p-5 p-4">
                    <svg className="xl:h-9 lg:h-8 h-6 w-max" width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M26.6471 0.166576C33.529 0.166576 40.1537 2.89425 45.0118 7.77809C49.8959 12.6645 52.6263 19.2603 52.6263 26.1704C52.6263 35.2627 47.8435 43.7055 40.0498 48.4075C32.256 53.1095 22.5658 53.3692 14.5149 49.0829H14.4343C13.6575 48.7712 13.0315 48.2256 12.304 47.8619C11.5013 47.5242 10.5894 47.4723 9.76067 47.7346C7.83562 48.4075 5.88718 48.953 3.88679 49.4206C2.84762 49.4466 2.53587 48.8231 2.53587 47.81C3.0035 45.7577 3.62699 43.7289 4.35701 41.7571C4.64018 40.8999 4.56484 39.9906 4.1232 39.1827L3.60361 38.1722C1.67856 34.5093 0.667969 30.4308 0.667969 26.3029V26.1444C0.667969 19.2603 3.39318 12.6359 8.27726 7.77809C13.1613 2.89425 19.7601 0.166576 26.6471 0.166576ZM38.6209 22.8452C36.8024 22.8452 35.2982 24.326 35.2982 26.1704C35.2982 27.9889 36.8024 29.4956 38.6209 29.4956C40.4654 29.4956 41.9463 27.9889 41.9463 26.1704C41.9463 24.326 40.4654 22.8452 38.6209 22.8452ZM26.6471 22.8452C24.8026 22.8452 23.3192 24.326 23.3192 26.1704C23.3192 27.9889 24.8026 29.4956 26.6471 29.4956C28.4916 29.4956 29.9699 27.9889 29.9699 26.1704C29.9699 24.326 28.4916 22.8452 26.6471 22.8452ZM14.6681 22.8452C12.8236 22.8452 11.3428 24.326 11.3428 26.1704C11.3428 27.9889 12.8236 29.4956 14.6681 29.4956C16.4867 29.4956 17.9961 27.9889 17.9961 26.1704C17.9961 24.326 16.4867 22.8452 14.6681 22.8452Z"
                        fill="#F5F5F5"
                      />
                    </svg>
                    <h3 className="text-gcNeutrals-baseWhite gcHeading7p mt-1">Forum</h3>
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
              <h1 className="gcHeading3p text-gcPrimary-1000 hover:underline cursor-pointer" onClick={() => router.push("/my/article")}>
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
