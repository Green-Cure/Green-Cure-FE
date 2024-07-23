"use client";
import { notFound } from "next/navigation";
import { useContext } from "react";
import { ArticleContext } from "../layout";
import Link from "next/link";

export default function MyArticleDetail({ params }) {
  const { articles, loading, error, meta } = useContext(ArticleContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  };

  const findArticleBySlug = (data, slug) => {
    return data.find((article) => article.slug === slug);
  };

  const findRelatedArticles = (data, article, maxCount) => {
    const keywords = article.title.split(" ");
    return data.filter((item) => item.id !== article.id && keywords.some((keyword) => item.title.includes(keyword))).slice(0, maxCount);
  };

  const article = findArticleBySlug(articles, params.slug);

  if (article) {
    const relatedArticles = findRelatedArticles(articles, article, 3);

    return (
      <>
        <div className="flex flex-col">
          <h1 className="gcHeading1p text-gcPrimary-1000 mt-5 sm:px-0 px-4">{article.title}</h1>
          <div className="mt-5 flex sm:flex-row flex-col lg:gap-10 sm:gap-8 gap-6">
            <div className="sm:w-3/4 w-full flex flex-col">
              <img className="sm:rounded-xl object-cover xl:h-[550px] lg:h-[400px] md:h-[300px] h-[200px]" src={article.image} alt={article.slug} />
              <div className="flex flex-row items-start justify-between mt-5 sm:px-0 px-4">
                <div className="flex flex-row justify-center items-center gap-3">
                  <img className="rounded-full lg:w-12 md:w-11 sm:w-10 w-9" src="https://placehold.co/50x50" alt="Profile Author" />
                  <div>
                    <h4 className="gcContentAccent1p text-gcPrimary-1000">Jane Doe</h4>
                    <h6 className="gcContentBody2p text-gcSecondary-400 xl:-mt-1">Botanist</h6>
                  </div>
                </div>
                <h4 className="gcContentAccent2p text-gcPrimary-1000">6 July 2024</h4>
              </div>
              <div className="mt-5 sm:px-0 px-4">{article.content}</div>
            </div>
            <div className="sm:w-1/4 w-full flex flex-col sm:px-0 px-4">
              <h1 className="gcHeading3p text-gcPrimary-1000">Related</h1>
              {relatedArticles.map((article) => {
                return (
                  <div key={article.id} className="flex xl:flex-row flex-col-reverse justify-between sm:justify-center xl:items-center items-start xl:py-4 py-2 border-b border-gcSecondary-400 gap-3">
                    <div className="xl:w-3/5 w-full">
                      <Link href={`/my/article/${article.slug}`} className="hover:underline text-gcPrimary-1000">
                        <h2 className="gcContentAccent1p text-gcPrimary-1000">{article.title}</h2>
                      </Link>
                      <h4 className="text-gcSecondary-600 gcContentBody2p">{formatDate(article.createdAt)}</h4>
                    </div>
                    <div className="xl:w-2/5 w-full h-40 md:h-36 sm:h-32 flex justify-center items-center rounded-xl">
                      <img className="rounded-xl object-cover object-center xl:h-36 xl:w-60 w-full h-full" src={article.image} alt={article.slug} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  notFound();
}
