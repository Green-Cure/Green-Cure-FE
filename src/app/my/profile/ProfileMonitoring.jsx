"use client";

import request from "@/app/utils/request";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileMonitoring() {
  const [isLoading, setIsLoading] = useState(false);
  const [monitorDatas, setMonitorDatas] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    request
      .get("monitor")
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            setMonitorDatas(response.data.data);
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.error("Server Error");
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An unexpected error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className="xl:px-20 lg:px-16 md:px-12 px-7 sm:px-10 flex flex-col w-full mb-20 lg:pt-6 sm:pt-5 pt-4">
        {!isLoading && monitorDatas !== null && monitorDatas.map((data, index) => <MonitorItem key={index} data={data} />)}
        {!isLoading && monitorDatas === null && <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">No data</h1>}
        {isLoading && <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">Loading...</h1>}
      </section>
    </>
  );
}

function MonitorItem({ data }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteMonitorItem = () => {
    toast.error("This feature not avalaible");
  };

  return (
    <div
      className="border-b border-gcNeutrals-200 pb-2 mb-3 flex justify-between items-center transition duration-300 cursor-pointer relative"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/my/monitor/${data.id}`);
      }}
    >
      <div>
        <h2 className="gcContentAccent5p font-semibold text-gcPrimary-1000">{data.name}</h2>
        <p className="gcContentBody6p text-gcSecondary-600">{data.name}</p>
      </div>
      <div className="relative z-20 flex xl:gap-8 lg:gap-7 md:gap-6 sm:gap-5 gap-4 items-center">
        <button
          type="button"
          disabled={isLoading}
          className="group"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteMonitorItem();
          }}
        >
          <svg className="xl:w-10 xl:h-10 lg:w-9 lg:h-9 md:w-8 md:h-8 sm:w-7 sm:h-7 h-6 w-6 transition" width="45" height="57" viewBox="0 0 45 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.375 3.5H33.4375L30.3125 0.375H14.6875L11.5625 3.5H0.625V9.75H44.375M3.75 50.375C3.75 52.0326 4.40848 53.6223 5.58058 54.7944C6.75268 55.9665 8.3424 56.625 10 56.625H35C36.6576 56.625 38.2473 55.9665 39.4194 54.7944C40.5915 53.6223 41.25 52.0326 41.25 50.375V12.875H3.75V50.375Z"
              fill="#AAB9C5"
              className="group-hover:fill-gcSecondary-600 transition"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
