"use client";

import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import { formatDate } from "@/app/utils/formatTimestamp";
import { host } from "@/app/utils/urlApi";
import request from "@/app/utils/request";

export default function DashboardLibrary() {
  const router = useRouter();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [datas, setDatas] = useState([
    {
      id: 1,
      name: "tnaman",
      image: "k0m9fydl6k4pfiyzq1pmv3c6.jpeg",
      type: "testing",
      createdAt: "2024-07-25T03:58:51.643+00:00",
      updatedAt: "2024-07-25T03:58:51.643+00:00",
      deletedAt: null,
    },
  ]);

  const handleToggleDeleteModal = () => {
    setIdDelete("");
    setToggleDelete(!toggleDelete);
  };

  const handleDelete = (id) => {
    request
      .delete(`plants/${id}`)
      .then(function (response) {
        return console.log(response.response.data);
        const data = response.response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex justify-between">
        <form className="flex items-center max-w-sm xl:w-96 lg:w-80 md:w-72 sm:w-64 w-52">
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
              placeholder="Search library..."
              required
            />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-gcNeutrals-baseWhite rounded-lg border focus:ring-4 focus:outline-none focus:ring-gcPrimary-800 bg-gcPrimary-1000 transition hover:bg-gcPrimary-900">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <button
          type="button"
          className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 rounded-lg px-3 md:px-4 sm:py-1.5 py-1 text-center flex items-center justify-between gap-1"
          onClick={() => {
            router.push(`/dashboard/library/addLibrary`);
          }}
        >
          <LuPlus className="md:text-2xl text-xl -ml-1" />
          <h2 className="font-medium text-sm">Add library</h2>
        </button>
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
              <th scope="col" className="px-6 py-3 w-1/3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 w-1/3">
                Thumbnails
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data) => {
              return (
                <tr className="bg-white border-b hover:bg-gray-50" key={data.id}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                      <label htmlFor="checkbox-table-search-3" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    <h4
                      className="text-wrap line-clamp-3 hover:underline cursor-pointer"
                      onClick={() => {
                        router.push(`/dashboard/library/detailLibrary/${data.id}`);
                      }}
                    >
                      {data.name}
                    </h4>
                  </th>
                  <td className="px-6 py-4">
                    <img className="max-h-24" src={`${host}/uploads/${data.image}`} alt="Data Thumbnails" />
                  </td>
                  <td className="px-6 py-4">{formatDate(data.createdAt)}</td>
                  <td className="px-6 py-4 ">
                    <div className="flex gap-3 items-center justify-start">
                      <button
                        type="button"
                        className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                        onClick={() => {
                          router.push(`/dashboard/library/editLibrary/${data.id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                        onClick={() => {
                          setToggleDelete(!toggleDelete);
                          setIdDelete(data.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <DeleteModal handleToggleDeleteModal={handleToggleDeleteModal} toggleDelete={toggleDelete} handleDelete={handleDelete} id={idDelete} label={"data"} />
      </div>

      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900">1-10</span> of <span className="font-semibold text-gray-900">1000</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
              Previous
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              1
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              2
            </a>
          </li>
          <li>
            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
              3
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              4
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              5
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
