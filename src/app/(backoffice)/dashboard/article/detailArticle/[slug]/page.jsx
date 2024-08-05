"use client";

import { formatDate } from "@/app/utils/formatTimestamp";
import request from "@/app/utils/request";
import { hostNoPrefix } from "@/app/utils/urlApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailArticle({ params }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const slug = params.slug;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request
      .get(`articles/${slug}`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data !== null) {
            setIsLoading(false);
            setArticle(response.data.data);
          } else {
            setIsLoading(false);
            setArticle(null);
            router.push("/dashboard/article");
          }
          toast.dismiss();
          setIsLoading(false);
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          setIsLoading(false);
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : article ? (
        <div className="flex flex-col border p-3 rounded-xl w-full flex-wrap">
          <h1 className="gcHeading2p text-gcPrimary-1000 sm:px-0 px-4 w-full text-wrap break-all">{article.title}</h1>
          <div className="mt-5 flex sm:flex-row flex-col lg:gap-10 sm:gap-8 gap-6 w-full">
            <div className="w-full flex flex-col">
              <img className="sm:rounded-xl object-cover xl:h-[400px] lg:h-[350px] md:h-[300px] h-[200px]" src={`${hostNoPrefix}uploads/${article.image}`} alt={article.slug} />
              <div className="flex flex-row items-start justify-between mt-5 sm:px-0 px-4">
                <div className="flex flex-row justify-center items-center gap-3">
                  <img className="rounded-full lg:w-12 md:w-11 sm:w-10 w-9" src="https://placehold.co/50x50" alt="Profile Author" />
                  <div>
                    <h4 className="gcContentAccent1p text-gcPrimary-1000">Nama pembuat</h4>
                    <h6 className="gcContentBody2p text-gcSecondary-400 xl:-mt-1">Botanist</h6>
                  </div>
                </div>
                <h4 className="gcContentAccent2p text-gcPrimary-1000">{formatDate(article.createdAt)}</h4>
              </div>
              <div className="mt-8 w-full">
                <div className="prose xl:prose-xl lg:prose-lg sm:prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        "No data"
      )}
    </>
  );
}
