"use client";

import MyArticleSlider from "./MyArticleSlider";
import { useContext } from "react";
import { ArticleContext } from "./layout";
import MyArticleMore from "./MyArticleMore";
import MyArticleTrending from "./MyArticleTrending";

export default function MyArticle() {
  const { articles, loading, error, meta } = useContext(ArticleContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  };

  const getLatestArticles = (data, count) => {
    return data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, count);
  };

  const getRandomArticles = (data, count) => {
    return data.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const trending = getLatestArticles(articles, 3);
  const slides = getRandomArticles(articles, 3);

  return (
    <>
      <MyArticleSlider slides={slides} autoSlideInterval={3000} />
      <div className="flex lg:mt-16 md:mt-12 sm:mt-10 mt-6 xl:gap-20 lg:gap-16 md:gap-14 sm:gap-10 gap-6 mx-4 sm:flex-row flex-col-reverse">
        <MyArticleMore articles={articles} />
        <MyArticleTrending trending={trending} formatDate={formatDate} />
      </div>
    </>
  );
}
