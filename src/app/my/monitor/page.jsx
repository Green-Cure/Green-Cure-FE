"use client";
import React from "react";
import LoggedInNavbar from "../LoggedInNavbar";
import TopBar from "../TopBar";

export default function Monitor() {
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
            <button className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-gcPrimary-1000 text-white flex items-center justify-center shadow-lg">
              <i className="fas fa-plus text-lg sm:text-base"></i>
            </button>
            <button className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-gcPrimary-500 text-white flex items-center justify-center shadow-lg">
              <i className="fas fa-tools text-lg sm:text-base"></i>
            </button>
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
