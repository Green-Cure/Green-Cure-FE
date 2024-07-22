import Link from "next/link";
import React from "react";

export default function Library() {
  return (
    <div className="flex min-h-screen">
      <aside className="bg-gradient-to-br from-gcPrimary-200 to-gcPrimary-600 w-16 flex flex-col items-center py-4 space-y-6"></aside>
      <div className="flex-1 flex flex-col px-8 py-6 bg-gcNeutrals-baseWhite">
        <div className="flex items-center mb-4">
          <Link href="/" legacyBehavior>
            <a className="mr-2">
              <svg
                className="h-6 w-6 text-gcPrimary-1000"
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
          <h1 className="text-3xl font-bold leading-9 tracking-tight text-gcPrimary-1000 p-2 rounded-lg">
            Library
          </h1>
        </div>
        <div className="mt-4">
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="Search plants or diseases...."
              className="w-full rounded-full border border-gray-300 py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gcPrimary-600 placeholder:text-gcSecondary-600 bg-gradient-to-r from-gcPrimary-200 to-gcNeutrals-baseWhite"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button className="bg-gcPrimary-600 text-white font-semibold py-2 px-4 rounded-full">
            Tanaman
          </button>
          <button className="bg-gcPrimary-500 text-white font-semibold py-2 px-4 rounded-full">
            Penyakit
          </button>
        </div>
        <div className="mt-8 pl-2">
          <h2 className="text-xl font-semibold text-gcPrimary-1000">Tanaman</h2>
          <ul className="mt-2 space-y-2 text-gcPrimary-900">
            <li>Aloe Vera</li>
            <li>Basil</li>
            <li>Cactus</li>
            <li>Dandelion</li>
          </ul>
        </div>
        <hr className="border-t border-gray-300 mt-1" />
        <div className="mt-8 pl-2">
          <h2 className="text-xl font-semibold text-gcPrimary-1000">
            Penyakit Tanaman
          </h2>
          <ul className="mt-2 space-y-2 text-gcPrimary-900">
            <li>Leaf Blight</li>
            <li>Powdery Mildew</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
