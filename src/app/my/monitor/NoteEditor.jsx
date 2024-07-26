"use client";
import React from "react";
import LoggedInNavbar from "../LoggedInNavbar";

const NoteEditor = ({ onBack }) => {
  return (
    <>
      <LoggedInNavbar />
      <div className="p-4 bg-gcNeutrals-baseWhite min-h-screen relative">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <button onClick={onBack} className="text-gcPrimary-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button className="px-4 py-2 bg-gcPrimary-basePrimary text-white rounded-full">
              Save
            </button>
          </div>
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-gcPrimary-1000">Judul</h2>
            <p className="text-gcPrimary-900">Senin, 8 Juli 2024, 00.23</p>
          </div>
          <div className="mb-4">
            <textarea
              className="w-full h-32 p-4 bg-gcNeutrals-100 rounded-lg border border-gcNeutrals-200"
              placeholder="Write your note here..."
            ></textarea>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <button className="text-gcNeutrals-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-7.5 7.5m7.5-7.5l-7.5-7.5"
                  />
                </svg>
              </button>
              <button className="text-gcNeutrals-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75v10.5m-7.5-5.25h15"
                  />
                </svg>
              </button>
              <button className="text-gcNeutrals-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </button>
              <button className="text-gcNeutrals-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19.5V4.5"
                  />
                </svg>
              </button>
            </div>
            <button className="text-gcPrimary-basePrimary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h18M3 21h18M3 12h18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteEditor;
