"use client";
import { notFound } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ArticleContext } from "../layout";
import Link from "next/link";
import { formatDate } from "@/app/utils/formatTimestamp";
import { hostNoPrefix } from "@/app/utils/urlApi";
import request from "@/app/utils/request";

export default function MyArticleDetail({ params }) {
  const [articleDetail, setArticleDetail] = useState({});
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    request
      .get(`articles/${params.slug}`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data) {
            setArticleDetail(response.data.data);
          } else {
            setArticleDetail(null);
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
      });

    request
      .get(`articles/${params.slug}/related`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            setRelatedArticles(response.data.data);
          } else {
            setRelatedArticles(null);
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setRelatedArticles]);

  if (articleDetail) {
    return (
      <>
        <div className="flex flex-col pb-10">
          <h1 className="gcHeading2p text-gcPrimary-1000 mt-5 sm:px-0 px-4">{articleDetail.title}</h1>
          <div className="mt-5 flex sm:flex-row flex-col lg:gap-10 sm:gap-8 gap-6">
            <div className="sm:w-3/4 w-full flex flex-col">
              <img className="sm:rounded-xl object-cover xl:h-[400px] lg:h-[350px] md:h-[300px] h-[200px]" src={`${hostNoPrefix}uploads/${articleDetail.image}`} alt={articleDetail.slug} />
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
              <div className="mt-5 sm:px-0 px-4">
                <div className="prose xl:prose-xl lg:prose-lg sm:prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
              </div>
            </div>
            <div className="sm:w-1/4 w-full flex flex-col sm:px-0 px-4">
              <h1 className="gcHeading3p text-gcPrimary-1000">Related</h1>
              {relatedArticles &&
                relatedArticles.length > 0 &&
                relatedArticles.map((articleDetail) => {
                  return (
                    <div key={articleDetail.id} className="flex xl:flex-row flex-col-reverse justify-between sm:justify-center xl:items-center items-start xl:py-4 py-2 border-b border-gcSecondary-400 gap-3">
                      <div className="xl:w-3/5 w-full">
                        <Link href={`/my/article/${articleDetail.slug}`} className="hover:underline text-gcPrimary-1000">
                          <h2 className="gcContentAccent1p text-gcPrimary-1000">{articleDetail.title}</h2>
                        </Link>
                        <h4 className="text-gcSecondary-600 gcContentBody2p">{formatDate(articleDetail.createdAt)}</h4>
                      </div>
                      <div className="xl:w-2/5 w-full h-40 md:h-36 sm:h-32 flex justify-center items-center rounded-xl">
                        <img className="rounded-xl object-cover object-center xl:h-36 xl:w-60 w-full h-full" src={`${hostNoPrefix}uploads/${articleDetail.image}`} alt={articleDetail.slug} />
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
