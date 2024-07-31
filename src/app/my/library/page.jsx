"use client";

import Link from "next/link";
import React, { useState } from "react";
import TopBar from "../TopBar";
import LoggedInNavbar from "../LoggedInNavbar";

export default function Library() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const plants = [
    {
      name: "Aloe Vera",
      description: "Aloe arborescens",
      image: "/images/aloe.jpg",
    },
    {
      name: "Basil",
      description: "Ocimum basilicum",
      image: "/images/basil.webp",
    },
    {
      name: "Cactus",
      description: "Cactaceae",
      image: "/images/kaktus.webp",
    },
    {
      name: "Dandelion",
      description: "Taraxacum",
      image: "/images/dandelion.jpg",
    },
  ];

  const diseases = [
    {
      name: "Leaf Blight",
      description: "Disease description",
      image: "/images/leaf_blight.jpg",
    },
    {
      name: "Powdery Mildew",
      description: "Disease description",
      image: "/images/powdery_mildew.jpeg",
    },
    {
      name: "Rust",
      description: "Disease description",
      image: "/images/rust.jpg",
    },
    {
      name: "Downy Mildew",
      description: "Disease description",
      image: "/images/donwy_mildew.webp",
    },
  ];

  const handleItemClick = (item) => {
    if (selectedItem?.name === item.name) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const renderDetails = (item) => (
    <div className="mt-4 bg-gcPrimary-200 p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row sm:space-x-4 items-center sm:items-center">
      <div className="flex justify-center items-center w-24 h-24">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-semibold text-gcPrimary-1000 mb-2">
          {item.name}
        </h2>
        <p className="text-gcPrimary-1000 text-base sm:text-lg mb-2">
          <em>{item.description}</em>
        </p>
        <p className="text-gcPrimary-1000 text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius
          augue non ante lacinia, vel bibendum velit ornare. Sed a eleifend
          nulla. Vestibulum a arcu arcu. Fusce sit amet ante non augue vehicula
          vehicula vel ac nibh....
        </p>
        <Link
          href={{
            pathname: "/my/library/detail-view",
            query: {
              name: item.name,
              description: item.description,
              image: item.image,
            },
          }}
          legacyBehavior
        >
          <a className="text-white bg-gcPrimary-1000 hover:bg-gcPrimary-700 px-3 sm:px-4 py-2 rounded-full inline-block mt-4">
            Read More
          </a>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10">
        <TopBar pageName={"Library"} />
        <div className="flex justify-center items-center px-4 sm:px-0">
          <div className="flex-1 flex flex-col bg-gcNeutrals-baseWhite">
            <div className="mt-6 relative w-full max-w-3xl">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                placeholder="Search plants or diseases...."
                className="w-full rounded-full border border-gray-300 py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-gcPrimary-600 placeholder:text-gcSecondary-600 bg-gradient-to-r from-gcPrimary-200 to-gcNeutrals-baseWhite text-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
            <div className="mt-6 flex space-x-4 sm:space-x-6">
              <button className="bg-gcPrimary-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-base sm:text-lg">
                Tanaman
              </button>
              <button className="bg-gcPrimary-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-base sm:text-lg">
                Penyakit
              </button>
            </div>
            <div className="mt-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gcPrimary-1000">
                Tanaman
              </h2>
              <ul className="mt-4 space-y-2 sm:space-y-3 text-gcPrimary-900 text-base sm:text-lg">
                {plants.map((plant) => (
                  <li key={plant.name} onClick={() => handleItemClick(plant)}>
                    {plant.name}
                    {selectedItem?.name === plant.name &&
                      renderDetails(selectedItem)}
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-t border-gray-300 mt-4" />
            <div className="mt-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gcPrimary-1000">
                Penyakit Tanaman
              </h2>
              <ul className="mt-4 space-y-2 sm:space-y-3 text-gcPrimary-900 text-base sm:text-lg">
                {diseases.map((disease) => (
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
          </div>
        </div>
      </section>
    </>
  );
}