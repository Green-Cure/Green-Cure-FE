"use client";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { hostNoPrefix } from "@/app/utils/urlApi";
import request from "@/app/utils/request";
import toast from "react-hot-toast";

const DetailLibrary = ({ params }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request
      .get(`${params.type}/${params.id}`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data) {
            setData(response.data.data);
          } else {
            setData(null);
          }
          setIsLoading(false);
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setIsLoading(false);
      });
  }, [data]);

  if (data && !isLoading) {
    return (
      <div className="container mx-auto p-6">
        <button onClick={() => router.back()} className="text-gcPrimary-1000">
          Back to Library
        </button>
        <div className="mt-6 bg-gcPrimary-200 p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row sm:space-x-4 items-center sm:items-center">
          <div className="flex justify-center items-center w-24 h-24">
            <img src={`${hostNoPrefix}uploads/${data.image}`} alt={data.name} className="object-cover rounded-lg" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-gcPrimary-1000 mb-2">{data.name}</h2>
            <p className="text-gcPrimary-1000 text-base sm:text-lg mb-2">
              <em>{data.description}</em>
            </p>
            <p className="text-gcPrimary-1000 text-sm sm:text-base">{data.description}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading) {
    return notFound();
  }
};

export default DetailLibrary;
