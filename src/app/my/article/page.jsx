"use client";

import MyArticleSlider from "./MyArticleSlider";
import { useContext, useEffect, useState } from "react";
import MyArticleMore from "./MyArticleMore";
import MyArticleTrending from "./MyArticleTrending";
import { ArticleContext } from "@/contexts/ArticleContext";
import { getArticlesData } from "@/app/utils/getArticlesData";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import request from "@/app/utils/request";

export default function MyArticle() {
  const router = useRouter();
  const { articles, setArticles } = useContext(ArticleContext);
  const [slides, setSlides] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setPage(urlParams.get("page"));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (!page && !urlParams.get("page") && !urlParams.get("type")) {
        router.push(`/my/article?page=1`, undefined, { shallow: true });
        setPage(1);
      }

      if (page && meta && urlParams.get("page") && urlParams.get("type")) {
        if (page < 1 || (meta && page > meta.lastPage)) {
          router.push(`/my/library?page=1`, undefined, { shallow: true });
          setPage(1);
        }
      }
    }
  }, [page]);

  useEffect(() => {
    if (page) {
      setIsLoading(true);
      request
        .get(`articles?page=${page}&limit=10`)
        .then(function (response) {
          if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
            if (response.data.data.length > 0) {
              setArticles(response.data.data);
              setSlides(getRandomArticles(response.data.data, 3));
            } else {
              setArticles(null);
            }
            if (response.data.meta) {
              setMeta(response.data.meta);
            } else {
              setMeta(null);
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
    }
  }, [page, router]);

  const getRandomArticles = (data, count) => {
    return data.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex flex-row gap-2">
            <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce"></div>
            <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      ) : articles && articles.length > 0 ? (
        <>
          <MyArticleSlider slides={slides} autoSlideInterval={3000} />
          <div className="flex lg:mt-16 md:mt-12 sm:mt-10 mt-6 xl:gap-20 lg:gap-16 md:gap-14 sm:gap-10 gap-6 mx-4 sm:flex-row flex-col-reverse">
            <div>
              <MyArticleMore articles={articles} />
              <div className="flex justify-between mt-10 mb-20 sm:mb-10">
                <button
                  onClick={() => {
                    if (meta && parseInt(page) != 1) {
                      router.push(`/my/article?page=${parseInt(page) - 1}`);
                      setPage(parseInt(page) - 1);
                    }
                  }}
                  disabled={page == 1}
                  className={`${page == 1 ? "opacity-50 cursor-not-allowed" : ""} px-4 py-2 text-white bg-gcPrimary-600 rounded`}
                >
                  Prev
                </button>
                <span className="text-gcPrimary-1000">
                  Page {page} of {meta.lastPage}
                </span>
                <button
                  onClick={() => {
                    if (meta && parseInt(page) != meta.lastPage) {
                      router.push(`/my/article?page=${parseInt(page) + 1}`);
                      setPage(parseInt(page) + 1);
                    }
                  }}
                  disabled={page == meta.total}
                  className={`${page == meta.total ? "opacity-50 cursor-not-allowed" : ""} px-4 py-2 text-white bg-gcPrimary-600 rounded`}
                >
                  Next
                </button>
              </div>
            </div>
            <MyArticleTrending />
          </div>
        </>
      ) : (
        <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">No data article</h1>
      )}
    </>
  );
}
