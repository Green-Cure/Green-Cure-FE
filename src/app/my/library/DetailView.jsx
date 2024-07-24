"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Library() {
  const [selectedItem, setSelectedItem] = useState(null);
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
    <div className="mt-4 bg-gcPrimary-200 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center space-x-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gcPrimary-1000 mb-2">
          {item.name}
        </h2>
        <p className="text-gcPrimary-1000 text-lg mb-2">
          <em>{item.description}</em>
        </p>
        <p className="text-gcPrimary-1000 text-base">
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
          <a className="text-white bg-gcPrimary-1000 hover:bg-gcPrimary-700 px-4 py-2 rounded-full inline-block mt-4">
            Read More
          </a>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="bg-gradient-to-br from-gcPrimary-200 to-gcPrimary-600 w-full md:w-20 flex flex-col items-center py-6 space-y-8"></aside>
      <div className="flex-1 flex flex-col px-4 md:px-10 py-8 bg-gcNeutrals-baseWhite">
        <div className="flex items-center mb-6">
          <Link href="/" legacyBehavior>
            <a className="mr-4 flex items-center">
              <svg
                className="h-10 w-10 text-gcPrimary-1000"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6l-6 6 6 6M4 12h16"
                />
              </svg>
            </a>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold leading-10 tracking-tight text-gcPrimary-1000 p-3 rounded-lg">
            Library
          </h1>
        </div>
        <div className="mt-6">
          <div className="relative w-full max-w-3xl">
            <input
              type="text"
              placeholder="Search plants or diseases...."
              className="w-full rounded-full border border-gray-300 py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-gcPrimary-600 placeholder:text-gcSecondary-600 bg-gradient-to-r from-gcPrimary-200 to-gcNeutrals-baseWhite text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </div>
        </div>
        <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <button className="bg-gcPrimary-600 text-white font-semibold py-3 px-6 rounded-full text-lg">
            Tanaman
          </button>
          <button className="bg-gcPrimary-600 text-white font-semibold py-3 px-6 rounded-full text-lg">
            Penyakit
          </button>
        </div>
        <div className="mt-10 pl-3">
          <h2 className="text-2xl font-semibold text-gcPrimary-1000">
            Tanaman
          </h2>
          <ul className="mt-4 space-y-3 text-gcPrimary-900 text-lg">
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
        <div className="mt-10 pl-3">
          <h2 className="text-2xl font-semibold text-gcPrimary-1000">
            Penyakit Tanaman
          </h2>
          <ul className="mt-4 space-y-3 text-gcPrimary-900 text-lg">
            {diseases.map((disease) => (
              <li key={disease.name} onClick={() => handleItemClick(disease)}>
                {disease.name}
                {selectedItem?.name === disease.name &&
                  renderDetails(selectedItem)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
