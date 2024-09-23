"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import TopBar from "../TopBar";
import LoggedInNavbar from "../LoggedInNavbar";
import { hostNoPrefix } from "@/app/utils/urlApi";
import toast from "react-hot-toast";
import request from "@/app/utils/request";
import { useRouter } from "next/navigation";

export default function Library() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);

  const router = useRouter();

  const filteredPlants =
    filter === "all" || filter === "plants"
      ? plants.filter((plant) =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const filteredDiseases =
    filter === "all" || filter === "diseases"
      ? diseases.filter((disease) =>
          disease.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  useEffect(() => {
    setIsLoading(true);
    const searchQuery = searchTerm ? `&search=${searchTerm}` : "";
    const pageQuery = searchTerm ? "" : `&page=${currentPage}`;

    request
      .get(`/plants?limit=${limit}${pageQuery}${searchQuery}`)
      .then(function (response) {
        if (
          response.data?.statusCode === 200 ||
          response.data?.statusCode === 201
        ) {
          setPlants(response.data.data || []);
          if (!searchTerm) {
            setTotalPages(response.data.meta?.lastPage || 1);
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const searchQuery = searchTerm ? `&search=${searchTerm}` : "";
    const pageQuery = searchTerm ? "" : `&page=${currentPage}`;

    request
      .get(`/plant-diseases?limit=${limit}${pageQuery}${searchQuery}`)
      .then(function (response) {
        if (
          response.data?.statusCode === 200 ||
          response.data?.statusCode === 201
        ) {
          setDiseases(response.data.data || []);
          if (!searchTerm) {
            setTotalPages(response.data.meta?.lastPage || 1);
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
      });
  }, [currentPage, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const handleSearchNavigation = () => {
    const firstPlant = filteredPlants.length > 0 ? filteredPlants[0] : null;
    const firstDisease =
      filteredDiseases.length > 0 ? filteredDiseases[0] : null;

    if (firstPlant) {
      router.push(`/my/library/plants/${firstPlant.id}`);
    } else if (firstDisease) {
      router.push(`/my/library/plant-diseases/${firstDisease.id}`);
    } else {
      toast.error("No results found.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchNavigation();
    }
  };

  const handleItemClick = (item) => {
    if (selectedItem?.name === item.name) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const renderDetails = (item) => {
    const getMaxDescriptionLength = () => {
      if (window.innerWidth < 640) return 40; // sm
      if (window.innerWidth < 1024) return 70; // md
      return 500; // lg and above
    };

    const maxLength = getMaxDescriptionLength();
    const shortDescription =
      item.description.length > maxLength
        ? item.description.slice(0, maxLength) + "..."
        : item.description;

    return (
      <div className="flex flex-row items-center p-4 mt-4 rounded-lg shadow-md bg-gcPrimary-200 sm:p-6 sm:items-start">
        <div className="flex items-center justify-center w-32 h-32 mb-4 sm:w-36 sm:h-36 sm:mb-0">
          <img
            src={`${hostNoPrefix}uploads/${item.image}`}
            alt={item.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="flex-1 ml-4 text-left">
          <h2 className="mb-2 text-xl font-semibold sm:text-2xl text-gcPrimary-1000">
            {item.name}
          </h2>
          <p className="mb-2 text-base text-gcPrimary-1000 sm:text-lg">
            <em>{item.latin}</em>
          </p>
          <p className="text-sm text-gcPrimary-1000 sm:text-base">
            {shortDescription}
          </p>
          <Link
            href={{
              pathname: `/my/library/${
                item.latin ? "plants" : "plant-diseases"
              }/${item.id}`,
            }}
            legacyBehavior
          >
            <a className="inline-block px-2 py-1 mt-4 text-base text-white rounded-full bg-gcPrimary-1000 hover:bg-gcPrimary-700 sm:px-3">
              Read More
            </a>
          </Link>
        </div>
      </div>
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10">
        <TopBar pageName={"Perpustakaan"} />
        <div className="flex items-center justify-center px-4 sm:px-0">
          <div className="flex flex-col flex-1 bg-gcNeutrals-baseWhite">
            <div className="relative w-full max-w-3xl mt-6">
              <svg
                className="absolute transform -translate-y-1/2 cursor-pointer left-4 top-1/2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleSearchNavigation}
              >
                <path
                  d="M11 2C6.03 2 2 6.03 2 11C2 15.97 6.03 20 11 20C13.19 20 15.19 19.21 16.74 17.93L20.29 21.48C20.68 21.87 21.31 21.87 21.7 21.48C22.09 21.09 22.09 20.46 21.7 20.07L18.15 16.52C19.42 14.97 20.21 12.97 20.21 11C20.21 6.03 16.18 2 11 2ZM11 4C14.86 4 18 7.14 18 11C18 14.86 14.86 18 11 18C7.14 18 4 14.86 4 11C4 7.14 7.14 4 11 4Z"
                  fill="#205072"
                />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search plants or diseases...."
                className="w-full px-5 py-3 pl-12 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gcPrimary-600 placeholder:text-gcSecondary-600 bg-gradient-to-r from-gcPrimary-200 to-gcNeutrals-baseWhite"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex mt-6 space-x-4 sm:space-x-6">
              <button
                className={`${
                  filter === "plants"
                    ? "bg-gcPrimary-1000 text-white"
                    : "bg-gcPrimary-600 text-white"
                } font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-base sm:text-lg`}
                onClick={() =>
                  setFilter(filter === "plants" ? "all" : "plants")
                }
              >
                Tanaman
              </button>
              <button
                className={`${
                  filter === "diseases"
                    ? "bg-gcPrimary-1000 text-white"
                    : "bg-gcPrimary-600 text-white"
                } font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-base sm:text-lg`}
                onClick={() =>
                  setFilter(filter === "diseases" ? "all" : "diseases")
                }
              >
                Penyakit
              </button>
            </div>

            {/* List of Plants */}
            {!isLoading && filteredPlants.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold sm:text-2xl text-gcPrimary-1000">
                  Tanaman
                </h2>
                <ul className="mt-6 space-y-4 text-base cursor-pointer sm:space-y-6 text-gcPrimary-1000 sm:text-xl">
                  {filteredPlants.map((plant) => (
                    <li key={plant.name} onClick={() => handleItemClick(plant)}>
                      {plant.name}
                      {selectedItem?.name === plant.name &&
                        renderDetails(selectedItem)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <hr className="mt-4 border-t border-gray-300" />

            {/* List of Diseases */}
            {!isLoading && filteredDiseases.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold sm:text-2xl text-gcPrimary-1000">
                  Penyakit Tanaman
                </h2>
                <ul className="mt-6 space-y-4 text-base cursor-pointer sm:space-y-6 text-gcPrimary-1000 sm:text-xl">
                  {filteredDiseases.map((disease) => (
                    <li
                      key={disease.name}
                      onClick={() => handleItemClick(disease)}
                    >
                      {disease.name}
                      {selectedItem?.name === disease.name &&
                        renderDetails(selectedItem)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pagination controls */}
            <div className="flex justify-between mt-10 mb-20 sm:mb-10">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                } px-4 py-2 text-white bg-gcPrimary-600 rounded`}
              >
                Prev
              </button>
              <span className="text-gcPrimary-1000">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } px-4 py-2 text-white bg-gcPrimary-600 rounded`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
