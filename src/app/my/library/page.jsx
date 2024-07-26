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
      image: "/path/to/image/aloe-vera.jpg",
    },
    {
      name: "Basil",
      description: "Ocimum basilicum",
      image: "/path/to/image/basil.jpg",
    },
    {
      name: "Cactus",
      description: "Cactaceae",
      image: "/path/to/image/cactus.jpg",
    },
    {
      name: "Dandelion",
      description: "Taraxacum",
      image: "/path/to/image/dandelion.jpg",
    },
  ];

  const diseases = [
    {
      name: "Leaf Blight",
      description: "Disease description",
      image: "/path/to/image/leaf-blight.jpg",
    },
    {
      name: "Powdery Mildew",
      description: "Disease description",
      image: "/path/to/image/powdery-mildew.jpg",
    },
    {
      name: "Rust",
      description: "Disease description",
      image: "/path/to/image/rust.jpg",
    },
    {
      name: "Downy Mildew",
      description: "Disease description",
      image: "/path/to/image/downy-mildew.jpg",
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
    <div className="mt-4 bg-gcPrimary-200 p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
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
            pathname: "/detail-view",
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.61426"
                  y="2.15909"
                  width="20.6818"
                  height="20.6818"
                  rx="10.3409"
                  stroke="#205072"
                  strokeWidth="2.95455"
                />
                <path
                  d="M19.3409 19.8864L25.25 25.7955"
                  stroke="#205072"
                  strokeWidth="2.95455"
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
