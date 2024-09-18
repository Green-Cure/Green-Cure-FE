"use client";

import Link from "next/link";
import { hostNoPrefix } from "@/app/utils/urlApi";
import { useEffect, useState } from "react";
import request from "@/app/utils/request";
import { formatDate } from "@/app/utils/formatTimestamp";
import toast from "react-hot-toast";

export default function MyArticleTrending() {
  const [trending, setTrending] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    request
      .get("articles/newest")
      .then((response) => {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            setTrending(response.data.data);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="sm:w-2/5 w-full">
        <h1 className="gcHeading3p text-gcPrimary-1000">Trending</h1>
        {trending && trending.length > 0 && (
          <div className="flex flex-col">
            {trending.map((article, index) => {
              return (
                <div key={index} className="flex justify-between sm:flex-row sm:justify-center items-center xl:py-4 py-2 border-b border-gcSecondary-400 gap-3">
                  <div className="w-3/5">
                    <Link href={`/my/article/${article.slug}`} className="hover:underline text-gcPrimary-1000">
                      <h2 className="gcContentAccent1p text-gcPrimary-1000">{article.title}</h2>
                    </Link>
                    <h4 className="text-gcSecondary-600 gcContentBody2p mt-1">{formatDate(article.createdAt)}</h4>
                  </div>
                  <div className="sm:w-2/5 w-28 lg:h-36 md:h-32 sm:h-24 h-20 flex justify-center items-center rounded-xl">
                    <img className="rounded-xl object-cover object-center xl:h-36 xl:w-60 lg:h-32 lg:w-56 md:h-28 md:w-52 sm:h-24 sm:w-48 h-20 w-44" src={`${hostNoPrefix}uploads/${article.image}`} alt={article.slug} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
