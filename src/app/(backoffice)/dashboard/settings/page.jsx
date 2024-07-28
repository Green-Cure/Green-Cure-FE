"use client";

import { useState } from "react";

export default function DashboardSettings() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  const handleSubmit = () => {
    console.log("Submit Triggered");
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-3">
        <div className="col-span-8 border rounded-xl lg:p-4 md:p-3 p-2 flex gap-4 items-center">
          <div className="w-1/5">
            <img className="rounded-full" src="https://placehold.co/200x200" alt="Profile Picture" />
          </div>
          <div className="w-4/5">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="profilePicture" className="text-gcPrimary-1000 gcContentAccent1p">
                  Profile Picture
                </label>
              </div>
              <input
                id="profilePicture"
                name="profilePicture"
                accept={"image/*"}
                type={"file"}
                onChange={(e) => setProfilePicture(e.target.files)}
                className="block w-full rounded-xl border py-2.5 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
              />
            </div>
          </div>
        </div>
        <div className="col-span-8 border rounded-xl lg:p-4 md:p-3 p-2">
          <h1 className="text-gcPrimary-1000 gcHeading7p">General Information</h1>
          <form method="POST" onSubmit={handleSubmit} className="mt-3">
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="name" className="text-gcPrimary-1000 gcContentAccent1p">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g Name..."
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div>
                <label htmlFor="title" className="text-gcPrimary-1000 gcContentAccent1p">
                  Title Website
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g Title Website..."
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div>
                <label htmlFor="address" className="text-gcPrimary-1000 gcContentAccent1p">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="e.g Address..."
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div>
                <label htmlFor="keyword" className="text-gcPrimary-1000 gcContentAccent1p">
                  Keyword
                </label>
                <textarea
                  id="keyword"
                  name="keyword"
                  type="text"
                  placeholder="e.g Keyword..."
                  required
                  onChange={(e) => setKeyword(e.target.value)}
                  rows={4}
                  value={keyword}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div>
                <label htmlFor="description" className="text-gcPrimary-1000 gcContentAccent1p">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  placeholder="e.g Description..."
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  rows={4}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-3 text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
