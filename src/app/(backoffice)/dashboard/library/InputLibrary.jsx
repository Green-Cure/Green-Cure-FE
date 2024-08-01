"use client";

import { hostNoPrefix } from "@/app/utils/urlApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

export default function InputLibrary({ data, handleSubmit, typeLibrary, setTypeLibrary, types, errors, isLoading, currThumbnail }) {
  const router = useRouter();

  const newData = data ? data : {};

  const [name, setName] = useState(data ? data.name : "");
  const [latin, setLatin] = useState(data ? data.latin : "");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState(data ? data.description : "");

  useEffect(() => {
    setName(data?.name);
    setLatin(data?.latin);
    setThumbnail(data?.image);
    setDescription(data?.description);
  }, [data]);

  return (
    <>
      {types !== null && (
        <div className="border rounded-xl lg:p-4 md:p-3 p-2">
          <div className="flex flex-col">
            <label htmlFor="type" className="text-gcPrimary-1000 gcContentAccent1p">
              Type
            </label>
            <select
              id={"type"}
              name={"type"}
              type={"text"}
              value={typeLibrary ? typeLibrary : "Select One"}
              required
              label={"Type"}
              onChange={(e) => {
                setTypeLibrary(e.target.value);
              }}
              className="
                  
                  block w-full rounded-xl border py-3.5 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
            >
              <option value="Select One" disabled>
                Select One
              </option>
              {types &&
                types.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      {currThumbnail !== null && (
        <div className="border rounded-xl lg:p-4 md:p-3 p-2">
          <div className="flex flex-col">
            <label htmlFor="type" className="text-gcPrimary-1000 gcHeading7p">
              Current Thumbnail
            </label>
            <img src={`${hostNoPrefix}uploads/${currThumbnail}`} alt="Current Thumbnail" className="rounded-xl max-w-96 max-h-60 object-cover object-center mt-1" />
          </div>
        </div>
      )}

      {typeLibrary ? (
        <div className="border rounded-xl lg:p-4 md:p-3 p-2 mt-3">
          <form
            action=""
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              if (!data) {
                newData.name = name;
                newData.description = description;
                newData.image = thumbnail;
                if (typeLibrary == "plant") {
                  newData.latin = latin;
                }
                console.log("No Initial Data");
              } else {
                newData.name = name;
                newData.description = description;
                newData.image = thumbnail;
                if (typeLibrary == "plant") {
                  newData.latin = latin;
                }
                console.log("With Initial Data");
              }

              handleSubmit(newData);
            }}
          >
            <div className="grid grid-cols-6 gap-6 sm:gap-3">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="name" className="text-gcPrimary-1000 gcHeading7p">
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
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
                {errors.name && <small className="text-red-600">{errors.name}</small>}
              </div>

              <div className="col-span-6 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="thumbnail" className="text-gcPrimary-1000 gcHeading7p">
                    Thumbnail
                  </label>
                </div>
                <input
                  id="thumbnail"
                  name="image"
                  accept={"image/*"}
                  type={"file"}
                  required={data ? false : true}
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="block w-full rounded-xl border py-2.5 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                />
                {errors.image && <small className="text-red-600">{errors.image}</small>}
              </div>

              {typeLibrary == "plant" && (
                <div className="col-span-6">
                  <label htmlFor="latin" className="text-gcPrimary-1000 gcHeading7p">
                    Latin
                  </label>
                  <input
                    id="latin"
                    name="latin"
                    type="text"
                    placeholder="e.g Latin..."
                    required
                    onChange={(e) => setLatin(e.target.value)}
                    value={latin}
                    className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
                  />
                  {errors.latin && <small className="text-red-600">{errors.latin}</small>}
                </div>
              )}

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="description" className="text-gcPrimary-1000 gcHeading7p">
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
                {errors.description && <small className="text-red-600">{errors.description}</small>}
              </div>

              <div className="sm:col-span-6 flex gap-2">
                <button
                  type="submit"
                  className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  type="button"
                  className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="border rounded-xl lg:p-4 md:p-3 p-2 mt-3">
          <h1 className="text-gcPrimary-1000 gcHeading7p">Please Select Type</h1>
        </div>
      )}
    </>
  );
}
