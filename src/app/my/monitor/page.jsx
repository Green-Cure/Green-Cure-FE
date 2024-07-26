// src/app/my/monitor/page.jsx
"use client";
import React, { useState } from "react";
import LoggedInNavbar from "../LoggedInNavbar";
import TopBar from "../TopBar";
import NoteEditor from "./NoteEditor";

export default function Monitor() {
  const [showNoteEditor, setShowNoteEditor] = useState(false);

  if (showNoteEditor) {
    return <NoteEditor onBack={() => setShowNoteEditor(false)} />;
  }

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-4 sm:mr-4 md:ml-16 lg:ml-20 sm:px-4 md:px-8 lg:px-10">
        <TopBar pageName={"Pantau"} />
        <div className="mt-8">
          <div className="pl-4">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gcPrimary-1000">
              Tasks
            </h1>
            <TaskItem title="Water Plants" schedule="Daily at 6 AM" />
            <TaskItem title="Fertilize Plants" schedule="Weekly on Saturday" />
            <TaskItem title="Prune Plants" schedule="Monthly on 1st" />
          </div>
          <div className="fixed bottom-16 right-8 flex flex-col items-center space-y-4">
            <button
              className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-gcPrimary-1000 text-white flex items-center justify-center shadow-lg"
              onClick={() => setShowNoteEditor(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.75v14.5m7.25-7.25H4.75"
                />
              </svg>
            </button>
            <button className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-gcPrimary-500 text-white flex items-center justify-center shadow-lg"></button>
          </div>
        </div>
      </section>
    </>
  );
}

function TaskItem({ title, schedule }) {
  return (
    <div className="border-b border-gcNeutrals-200 pb-2 mb-6">
      <h2 className="text-base sm:text-lg font-semibold text-gcPrimary-1000">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-gcSecondary-600">{schedule}</p>
    </div>
  );
}
