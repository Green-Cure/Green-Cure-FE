"use client";

import { formatDate } from "@/app/utils/formatTimestamp";
import request from "@/app/utils/request";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import DeleteModal from "../DeleteModal";
import toast from "react-hot-toast";
import { hostNoPrefix } from "@/app/utils/urlApi";

export default function DashboardArticle() {
  const router = useRouter();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState(null);
  const [filteredArticles, seFilteredArticles] = useState(null);
  const [meta, setMeta] = useState(null);
  const [pageItems, setPageItems] = useState([]);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    if (!page) {
      router.push("/dashboard/article?page=1", undefined, { shallow: true });
    }
  }, [page]);

  if (page < 1 || (meta && page > meta.lastPage)) {
    router.push("/dashboard/article?page=1", undefined, { shallow: true });
  }

  const handleToggleDeleteModal = () => {
    setIdDelete("");
    setToggleDelete(!toggleDelete);
  };

  const handleDelete = (e, slug) => {
    e.preventDefault();
    setIsLoading(true);
    handleToggleDeleteModal();
    toast.loading("Deleting data...");

    request.delete(`articles/${slug}`).then(function (res) {
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
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!(page < 1 || (meta && page > meta.lastPage))) {
      request
        .get(`articles?page=${page}&limit=10`)
        .then(function (response) {
          if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
            if (response.data.data.length > 0) {
              setArticles(response.data.data);
            } else {
              setArticles(null);
            }
            if (response.data.meta) {
              setMeta(response.data.meta);
              let data = [];
              for (let i = 1; i <= response.data.meta.lastPage; i++) {
                data.push(
                  <li key={i}>
                    <a
                      href={`/dashboard/article?page=${i}`}
                      className={`flex items-center justify-center px-3 h-8 border border-gray-300 ${
                        page === i ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700" : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      {i}
                    </a>
                  </li>
                );
                setPageItems(data);
              }
            } else {
              setMeta(null);
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
    }
  }, [page]);

  useEffect(() => {
    if (articles) {
      if (searchQuery.length > 0) {
        seFilteredArticles(articles.filter((article) => article.title.includes(searchQuery)));
      } else {
        seFilteredArticles(articles);
      }
    }
  }, [articles, searchQuery]);

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
              placeholder="Search article..."
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
        <button
          type="button"
          className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 rounded-lg px-3 md:px-4 sm:py-1.5 py-1 text-center flex items-center justify-between gap-1"
          onClick={() => {
            router.push(`/dashboard/article/addArticle`);
          }}
        >
          <LuPlus className="md:text-2xl text-xl -ml-1" />
          <h2 className="font-medium text-sm">Add article</h2>
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
                Title
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
            {!isLoading ? (
              filteredArticles ? (
                filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => {
                    return (
                      <tr className="bg-white border-b hover:bg-gray-50" key={article.id}>
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                            <label htmlFor="checkbox-table-search-3" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 text-wrap break-all">
                          <h4
                            className="text-wrap line-clamp-3 hover:underline cursor-pointer"
                            onClick={() => {
                              router.push(`/dashboard/article/detailArticle/${article.slug}`);
                            }}
                          >
                            {article.title}
                          </h4>
                        </th>
                        <td className="px-6 py-4">
                          <img className="max-h-24" src={`${hostNoPrefix}uploads/${article.image}`} alt="Article Thumbnails" />
                        </td>
                        <td className="px-6 py-4">{formatDate(article.createdAt)}</td>
                        <td className="px-6 py-4 ">
                          <div className="flex gap-3 items-center justify-start">
                            <button
                              type="button"
                              className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                              onClick={() => {
                                router.push(`/dashboard/article/editArticle/${article.slug}`);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                              onClick={() => {
                                setToggleDelete(!toggleDelete);
                                setIdDelete(article.slug);
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
                  <td className="p-4 text-nowrap">No data</td>
                )
              ) : (
                <td className="p-4 text-nowrap">No data</td>
              )
            ) : (
              <td className="p-4">Loading...</td>
            )}
          </tbody>
        </table>

        <DeleteModal handleToggleDeleteModal={handleToggleDeleteModal} toggleDelete={toggleDelete} handleDelete={handleDelete} id={idDelete} label={"article"} />
      </div>

      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          {!isLoading && (
            <span className="font-semibold text-gray-900">
              {page === 1 ? "1" : (page - 1) * 10 + 1}-{!isLoading && (page === 1 ? "1" : (page - 1) * 10 + filteredArticles?.length)}
            </span>
          )}{" "}
          of <span className="font-semibold text-gray-900">{meta?.total}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => {
                if (meta && parseInt(page) !== 1) {
                  router.push(`/dashboard/article?page=${parseInt(page) - 1}`);
                }
              }}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </button>
          </li>
          {pageItems.map((pageItem) => {
            return pageItem;
          })}
          <li>
            <button
              onClick={() => {
                if (meta && parseInt(page) !== meta.lastPage) {
                  router.push(`/dashboard/article?page=${parseInt(page) + 1}`);
                }
              }}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
