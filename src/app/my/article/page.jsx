"use client";

import MyArticleSlider from "./MyArticleSlider";
import { useContext, useEffect, useState } from "react";
import MyArticleMore from "./MyArticleMore";
import MyArticleTrending from "./MyArticleTrending";
import { ArticleContext } from "@/contexts/ArticleContext";
import { getArticlesData } from "@/app/utils/getArticlesData";
import { useRouter } from "next/navigation";
import request from "@/app/utils/request";

export default function MyArticle() {
  const router = useRouter();
  const { articles, setArticles } = useContext(ArticleContext);
  const [trending, setTrending] = useState(null);
  const [slides, setSlides] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticlesData()
      .then(
        (res) => {
          if (res) {
            setArticles(res);
            setSlides(getRandomArticles(res, 3));
          }
        },
        (err) => {
          console.error(err);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  };

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
            <MyArticleMore articles={articles} />
            <MyArticleTrending />
          </div>
        </>
      ) : (
        <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">No data article</h1>
      )}
    </>
  );
}
