"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import DeleteModal from "../DeleteModal";
import { useRouter } from "next/navigation";
import request from "@/app/utils/request";
import toast from "react-hot-toast";
import { hostNoPrefix } from "@/app/utils/urlApi";

export default function DashboardUsers() {
  const router = useRouter();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleDeleteModal = () => {
    setIdDelete("");
    setToggleDelete(!toggleDelete);
  };

  const handleDeleteUser = (e, id) => {
    e.preventDefault();

    setIsLoading(true);

    toast.loading("Deleting user...");

    request
      .delete(`user/${id}`)
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.dismiss();
          toast.success(res.data.message);
          setIsLoading(false);
        } else if (res.response.data.statusCode === 422) {
          toast.dismiss();
          toast.error("Something Went Wrong");
          setIsLoading(false);
        } else if (res.response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          setIsLoading(false);
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
          setIsLoading(false);
        }
      })
      .finally(() => {
        handleToggleDeleteModal();
      });
  };

  useEffect(() => {
    request
      .get("user")
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            setUsers(response.data.data);
          } else {
            setUsers([]);
          }
          toast.dismiss();
          setIsLoading(false);
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          setIsLoading(false);
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (users) {
      if (searchQuery.length > 0) {
        setFilteredUsers(users.filter((user) => user.name.includes(searchQuery) || user.username.includes(searchQuery) || user.email.includes(searchQuery)));
      } else {
        setFilteredUsers(users);
      }
    }
  }, [users, searchQuery]);

  return (
    <>
      <div className="flex justify-between">
        <form className="flex items-center justify-start max-w-sm xl:w-96 lg:w-80 md:w-72 sm:w-64 w-52">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gcPrimary-1000">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gcPrimary-1000 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              placeholder="Search user..."
              required
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-gcNeutrals-baseWhite rounded-lg border focus:ring-4 focus:outline-none focus:ring-gcPrimary-800 bg-gcPrimary-1000 transition hover:bg-gcPrimary-900">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gcNeutrals-baseWhite uppercase bg-gcPrimary-1000">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              filteredUsers ? (
                filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    return (
                      <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                            <label htmlFor="checkbox-table-search-1" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                          <img className="w-10 h-10 rounded-full" src={user.avatar ? `${hostNoPrefix}uploads/${user.avatar}` : "/avatars/default-avatar.svg"} alt="User Profile" />
                          <Link href={`/dashboard/users/detailUser/${user.id}`}>
                            <div className="ps-3 hover:underline cursor-pointer">
                              <div className="text-base font-semibold">{user.name}</div>
                              <div className="font-normal text-gray-500">{user.email}</div>
                            </div>
                          </Link>
                        </th>
                        <td className="px-6 py-4">{user.role == "1" ? "Admin" : user.role == "2" ? "Guest" : user.role == "3" ? "Member" : "None"}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`h-2.5 w-2.5 rounded-full me-2 ${user.deletedAt ? "bg-red-500" : "bg-green-500"}`}></div> {user.deletedAt ? "Offline" : "Online"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3 items-center justify-start">
                            <button
                              type="button"
                              className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                              onClick={(e) => {
                                setToggleDelete(!toggleDelete);
                                setIdDelete(user.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="p-4 text-nowrap">No data</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td className="p-4 text-nowrap">No data</td>
                </tr>
              )
            ) : (
              <tr>
                <td className="p-4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>

        <DeleteModal handleToggleDeleteModal={handleToggleDeleteModal} toggleDelete={toggleDelete} handleDelete={handleDeleteUser} id={idDelete} label={"user"} />
      </div>
    </>
  );
}
