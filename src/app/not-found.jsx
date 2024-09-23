"use client";

import React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function NotFound() {
  return (
    <>
      <div className="bg-gradient-to-br from-gcNeutrals-baseWhite to-gcPrimary-basePrimary min-h-screen flex flex-col justify-between">
        <Navbar />
        <section className="pt-16 flex m-auto gap-10 px-6">
          <div className="text-center w-full h-full">
            <h1 className="lg:text-9xl md:text-8xl sm:text-7xl text-6xl font-extrabold text-gcPrimary-1000">404</h1>
            <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold mt-4 mb-2 text-gcPrimary-1000">Page Not Found</h2>
            <p className="text-gray-600 mb-8 lg:text-base text-sm">{`Sorry, the page you're looking for doesn't exist. It might have been removed or the URL is incorrect.`}</p>
            <a href="/" className="bg-gcPrimary-1000 text-white py-2 px-6 rounded-lg lg:text-lg md:text-base text-sm font-semibold hover:bg-gcPrimary-900 transition-colors">
              Back to Landing Page
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
