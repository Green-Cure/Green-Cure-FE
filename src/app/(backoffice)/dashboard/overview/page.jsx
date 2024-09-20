"use client";

import request from "@/app/utils/request";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const [articleMeta, setArticleMeta] = useState(null);
  const [plantMeta, setPlantMeta] = useState(null);
  const [plantDiseasesMeta, setPlantDiseasesMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    request
      .get(`articles?page=1&limit=0`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
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
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
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
          if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
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
  }, []);

  useEffect(() => {
    if (articleMeta && plantMeta && plantDiseasesMeta) {
      setIsLoading(false);
    }
  }, [articleMeta, plantMeta, plantDiseasesMeta]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-center h-44 rounded bg-gcPrimary-1000">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center h-44 rounded bg-gcPrimary-1000">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center h-44 rounded bg-gcPrimary-1000">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-200">
        <p className="text-2xl text-gray-400">
          <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-200">
        <p className="text-2xl text-gray-400">
          <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
      </div>
    </>
  );
}
