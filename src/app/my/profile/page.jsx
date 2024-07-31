"use client";

import React, { useContext, useEffect, useState } from "react";
import LoggedInNavbar from "../LoggedInNavbar";
import ProfileDataSection from "./ProfileDataSection";
import ProfileNavbar from "./ProfileNavbar";
import ProfilePost from "./ProfilePost";
import ProfileMonitoring from "./ProfileMonitoring";
import ProfileSaved from "./ProfileSaved";
import TopBar from "../TopBar";
import Link from "next/link";
import request from "@/app/utils/request";
import { getUserData } from "@/app/utils/getUserData";
import { UserContext } from "@/contexts/UserContext";

export default function Profile() {
  const [showProfileNavbar, setShowProfileNavbar] = useState("1");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const handleLogout = (e) => {
    e.preventDefault();
    request
      .delete("/auth/logout")
      .then(function (response) {
        if (response.data) {
          if (response.data.statusCode === 200 || response.data.statusCode === 201) {
            localStorage.clear();
            window.location.href = "/auth/login";
          } else {
            window.alert("Logout gagal");
          }
        } else {
          window.alert("Logout gagal");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

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
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10">
        <TopBar pageName={"Profile"}>
          <div className="flex justify-center items-center">
            <div className="hidden sm:flex xl:gap-16 lg:gap-10 md:gap-8 gap-3 justify-center items-center">
              <ul className="flex xl:gap-16 lg:gap-10 md:gap-8 gap-3 justify-center items-center gcBody2p text-gcSecondary-500">
                <li className="relative">
                  <Link
                    href={"#"}
                    className="md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcSecondary-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-medium"
                  >
                    Help
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href={"#"}
                    className="md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcSecondary-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-medium"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="relative">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcSecondary-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-medium"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
              <button className="bg-gradient-to-r from-gcPrimary-700 to-gcPrimary-600 py-1.5 lg:px-5 px-3 rounded-xl gcContentAccent2p text-gcNeutrals-baseWhite gcDropShadow hover:from-gcPrimary-600 hover:to-gcPrimary-700 transition-all duration-500">
                Go to Premium
              </button>
            </div>
            <div className="relative">
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                <svg className="w-5 h-5 gcDropShadow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <ul className={`${isNavOpen ? "" : "hidden"} absolute transition -bottom-100 right-0 left-100 flex flex-col bg-gcPrimary-200 gap-3 w-28 gcContentAccent1p text-gcPrimary-1000 text-right px-2 py-3 rounded-xl`}>
                <li className="relative border-b border-b-gcPrimary-1000">
                  <Link href={"#"} className="hover:text-gcPrimary-900">
                    Help
                  </Link>
                </li>
                <li className="relative border-b border-b-gcPrimary-1000">
                  <Link href={"#"} className="hover:text-gcPrimary-900">
                    Privacy Policy
                  </Link>
                </li>
                <li className="relative border-b border-b-gcPrimary-1000">
                  <Link href={"#"} className="hover:text-gcPrimary-900">
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </TopBar>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <ProfileDataSection userData={userData} />
            <ProfileNavbar showProfileNavbar={showProfileNavbar} setShowProfileNavbar={setShowProfileNavbar} />
            {showProfileNavbar == "1" && <ProfilePost />}
            {showProfileNavbar == "2" && <ProfileMonitoring />}
            {showProfileNavbar == "3" && <ProfileSaved />}
          </>
        )}
      </section>
    </>
  );
}
