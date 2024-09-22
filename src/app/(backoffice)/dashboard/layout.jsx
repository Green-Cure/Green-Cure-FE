"use client";

import { useContext, useEffect, useState } from "react";
import MenuSidebar from "./MenuSidebar";
import { BsFillPeopleFill, BsFillBarChartLineFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa6";
import { MdForum, MdArticle } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import BreadCrumbs from "./BreadCrumbs";
import { usePathname, useRouter } from "next/navigation";
import request from "@/app/utils/request";
import { UserContext } from "@/contexts/UserContext";
import { getUserData } from "@/app/utils/getUserData";
import { getRole } from "@/app/utils/getRole";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarDropdown, setIsSidebarDropdown] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);

  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const toggleSidebarDropdown = () => {
    setIsSidebarDropdown(!isSidebarDropdown);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    request
      .delete("/auth/logout")
      .then(function (response) {
        if (response.data) {
          if (response.data.statusCode === 200 || response.data.statusCode === 201) {
            toast.success("Logout Successfully");
            localStorage.clear();
            window.location.href = "/auth/login";
          } else {
            toast.error("Logout Failed Credentials Must Valid");
          }
        } else {
          toast.error("Logout Failed Credentials Must Valid");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    let role = localStorage.getItem("role");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (!role) {
      role = getRole();
    }

    if (role != "1") {
      router.push("/my");
      return;
    }

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
  }, [router, userData, setUserData]);

  useEffect(() => {
    window.addEventListener("storage", async (event) => {
      if (event.key === "token" || event.key === "role") {
        const token = localStorage.getItem("token");
        if (token) {
          const role = await getRole();
          if (role) {
            localStorage.setItem("role", role);
          }
        } else {
          localStorage.clear();
        }

        window.location.reload();
      }
    });
  });

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                onClick={toggleSidebarDropdown}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/dashboard/overview" className="flex ms-2 md:me-24">
                <svg width="60" height="60" className="h-8" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.447 1.72482C15.3427 2.8292 14.7222 4.32706 14.7222 5.88889V14.7222H5.88889C4.32706 14.7222 2.8292 15.3427 1.72482 16.447C0.620434 17.5514 0 19.0493 0 20.6111V32.3889C0 33.9507 0.620434 35.4486 1.72482 36.553C2.8292 37.6573 4.32706 38.2778 5.88889 38.2778H14.7222V47.1111C14.7222 48.6729 15.3427 50.1708 16.447 51.2752C17.5514 52.3796 19.0493 53 20.6111 53H32.3889C33.9507 53 35.4486 52.3796 36.553 51.2752C37.6573 50.1708 38.2778 48.6729 38.2778 47.1111V38.2778H47.1111C48.6729 38.2778 50.1708 37.6573 51.2752 36.553C52.3796 35.4486 53 33.9507 53 32.3889V20.6111C53 19.0493 52.3796 17.5514 51.2752 16.447C50.1708 15.3427 48.6729 14.7222 47.1111 14.7222H38.2778V5.88889C38.2778 4.32706 37.6573 2.8292 36.553 1.72482C35.4486 0.620434 33.9507 0 32.3889 0H20.6111C19.0493 0 17.5514 0.620434 16.447 1.72482ZM20.1175 10.0879C19.7748 9.4597 20.2424 8.72091 20.9588 8.78955C23.389 9.02216 26.0215 9.89509 28.2728 11.2279C36.0041 15.805 39.2433 24.7372 35.3856 32.4196C33.52 36.4506 29.9267 38.2336 27.0564 38.5911C27.5521 42.122 28.9989 44.21 29.1186 44.3761C29.6558 45.1258 29.4925 46.2099 28.7312 46.8002C27.9771 47.3885 26.9259 47.2613 26.3786 46.5183C24.4388 43.8718 20.4946 34.7698 27.4906 22.9528C27.7354 22.5392 27.6129 22.0096 27.2183 21.776C26.8236 21.5423 26.3004 21.6896 26.0555 22.1033C22.4212 28.2421 21.5982 33.6013 21.8722 37.8135C21.8342 37.7962 21.7962 37.779 21.7582 37.7618C21.4722 37.6324 21.1883 37.5038 20.9112 37.3398C16.1576 34.5255 14.6941 28.1999 17.6438 23.2174L19.8701 19.457C21.6344 16.4769 21.672 12.9761 20.1175 10.0879Z"
                    fill="#56C596"
                  />
                </svg>
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gcPrimary-600">GreenCure</span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user" onClick={toggleProfileDropdown}>
                    <span className="sr-only">Open user menu</span>
                    <RxAvatar className="w-8 h-8 rounded-full text-white bg-gcPrimary-600" />
                  </button>
                </div>
                {isProfileDropdown && (
                  <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow absolute top-1/2 right-0" id="dropdown-user">
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900" role="none">
                        {userData?.name}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate" role="none">
                        {userData?.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a href="/dashboard/overview" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <button type="button" onClick={handleLogout} className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100" role="menuitem">
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`${
          isSidebarDropdown ? "border-r border-gray-200 transform-none" : "-translate-x-full  border-r border-gray-200"
        } fixed top-0 left-0 z-40 w-64 h-screen sm:pt-[55px] pt-[60px] transition-transform sm:translate-x-0 bg-transparent`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gradient-to-b from-gcPrimary-600 to-gcPrimary-basePrimary pt-5">
          <ul className="space-y-2 font-medium">
            <li>
              <MenuSidebar icon={<BsFillBarChartLineFill className={"text-xl"} />} href={"/dashboard/overview"} title={"Overview"} />
            </li>

            <li>
              <MenuSidebar icon={<MdArticle className={"text-xl"} />} href={"/dashboard/article"} title={"Article"} />
            </li>

            <li>
              <MenuSidebar icon={<FaBookOpen className={"text-xl"} />} href={"/dashboard/library"} title={"Library"} />
            </li>

            <li>
              <MenuSidebar icon={<MdForum className={"text-xl"} />} href={"/dashboard/report-posts"} title={"Report Posts"} />
            </li>

            <li>
              <MenuSidebar icon={<BsFillPeopleFill className={"text-xl"} />} href={"/dashboard/users"} title={"Users"} />
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="mt-14">
          <BreadCrumbs />

          {children}
        </div>
      </div>

      {isSidebarDropdown && <div drawer-backdrop="" className="bg-gray-900/50 fixed inset-0 z-30"></div>}
    </div>
  );
}
