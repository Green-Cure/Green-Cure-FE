"use client";

import request from "@/app/utils/request";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardOverview() {
  const [articleMeta, setArticleMeta] = useState(null);
  const [plantMeta, setPlantMeta] = useState(null);
  const [plantDiseasesMeta, setPlantDiseasesMeta] = useState(null);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    request
      .get(`articles?page=1&limit=0`)
      .then(function (response) {
        if (
          response.data?.statusCode === 200 ||
          response.data?.statusCode === 201
        ) {
          if (response.data.meta) {
            setArticleMeta(response.data.meta);
          } else {
            setArticleMeta({});
          }
          toast.dismiss();
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
      });

    request
      .get("plants?page=1&limit=0")
      .then(function (response) {
        if (
          response.data?.statusCode === 200 ||
          response.data?.statusCode === 201
        ) {
          if (response.data.meta) {
            setPlantMeta(response.data.meta);
          } else {
            setPlantMeta({});
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    request
      .get("plant-diseases?page=1&limit=0")
      .then(function (response) {
        if (response.data) {
          if (
            response.data?.statusCode === 200 ||
            response.data?.statusCode === 201
          ) {
            if (response.data.meta) {
              setPlantDiseasesMeta(response.data.meta);
            } else {
              setPlantDiseasesMeta({});
            }
          } else if (response.data.statusCode === 500) {
            console.error("INTERNAL_SERVER_ERROR");
            toast.dismiss();
            toast.error("Server Error");
          } else {
            toast.error("An unexpected error occurred");
          }
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server Error");
        return;
      });

    request
      .get("user")
      .then(function (response) {
        if (
          response.data?.statusCode === 200 ||
          response.data?.statusCode === 201
        ) {
          if (response.data.data.length > 0) {
            setUsers(response.data.data);
          } else {
            setUsers([]);
          }
          toast.dismiss();
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
      });
  }, []);

  useEffect(() => {
    if (articleMeta && plantMeta && plantDiseasesMeta && users) {
      setIsLoading(false);
    }
  }, [articleMeta, plantMeta, plantDiseasesMeta, users]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-row gap-2">
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce"></div>
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col justify-center xl:h-40 lg:h-36 md:h-32 sm:h-28 h-24 rounded bg-gcPrimary-1000 lg:p-5 md:p-4 sm:p-3 p-2.5">
              <p className="place-self-start gcContentBody1p text-gcNeutrals-baseWhite">
                Article Uploaded
              </p>
              <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold gcDropShadow text-gcNeutrals-baseWhite place-self-center md:mt-2 mt-1">
                {articleMeta?.total}
              </h3>
            </div>
            <div className="flex flex-col justify-center xl:h-40 lg:h-36 md:h-32 sm:h-28 h-24 rounded bg-gcPrimary-1000 lg:p-5 md:p-4 sm:p-3 p-2.5">
              <p className="place-self-start gcContentBody1p text-gcNeutrals-baseWhite">
                Plant Uploaded
              </p>
              <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold gcDropShadow text-gcNeutrals-baseWhite place-self-center md:mt-2 mt-1">
                {plantMeta?.total}
              </h3>
            </div>
            <div className="flex flex-col justify-center xl:h-40 lg:h-36 md:h-32 sm:h-28 h-24 rounded bg-gcPrimary-1000 lg:p-5 md:p-4 sm:p-3 p-2.5">
              <p className="place-self-start gcContentBody1p text-gcNeutrals-baseWhite">
                Plant Diseases Uploaded
              </p>
              <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold gcDropShadow text-gcNeutrals-baseWhite place-self-center md:mt-2 mt-1">
                {plantDiseasesMeta?.total}
              </h3>
            </div>
          </div>

          {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
            <div className="flex items-center flex-col justify-center h-96 rounded bg-gcPrimary-1000 lg:p-5 md:p-4 sm:p-3 p-2.5 md:gap-2.5 gap-1.5">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-row items-center justify-center md:gap-2.5 gap-1.5">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold gcDropShadow text-gcNeutrals-baseWhite md:mt-2 mt-1">
                    {users?.length}
                  </h3>
                  <p className="gcContentBody1p text-gcNeutrals-baseWhite">
                    Active Users
                  </p>
                </div>
                <p className="gcContentBody2p text-gcNeutrals-baseWhite">
                  Last 6 Months
                </p>
              </div>
              {users && <OverviewUsersChart users={users} />}
            </div>
            <div className="grid grid-cols-1 h-96 md:gap-2.5 gap-1.5">
              <div className="flex items-center justify-center rounded bg-gcPrimary-1000">
                <p className="text-2xl text-gray-400">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gcPrimary-1000">
                <p className="text-2xl text-gray-400">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div> */}
        </>
      )}
    </>
  );
}
