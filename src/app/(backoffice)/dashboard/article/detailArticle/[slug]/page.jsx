"use client";

import { formatDate } from "@/app/utils/formatTimestamp";
import request from "@/app/utils/requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailArticle({ params }) {
  const router = useRouter();
  const [article, setArticle] = useState({
    id: 1,
    userId: 101,
    title: "Cara Menanam dan Merawat Tanaman Herbal untuk Pemula",
    slug: "cara-menanam-dan-merawat-tanaman-herbal-untuk-pemula",
    image: "https://cdn.pixabay.com/photo/2017/07/20/17/56/herbs-2523119_1280.jpg",
    content: "Panduan lengkap untuk menanam dan merawat tanaman herbal seperti kemangi, rosemary, dan sage.",
    createdAt: "2023-07-23T00:00:00Z",
    updatedAt: "2023-07-23T00:00:00Z",
    deletedAt: null,
  });
  const slug = params.slug;

  // useEffect(() => {
  //   if (!slug) {
  //     router.push("/dashboard/article");
  //     return;
  //   }
  //   request
  //     .get(`articles/${slug}`)
  //     .then(function (response) {
  //       const data = response.data.data;
  //       if (!data) {
  //         router.push("/dashboard/article");
  //         return;
  //       }
  //       setArticle(data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [slug, router]);

  return (
    <>
      {article ? (
        <div className="flex flex-col border p-3 rounded-xl">
          <h1 className="gcHeading2p text-gcPrimary-1000 sm:px-0 px-4">{article.title}</h1>
          <div className="mt-5 flex sm:flex-row flex-col lg:gap-10 sm:gap-8 gap-6">
            <div className="w-full flex flex-col">
              <img className="sm:rounded-xl object-cover xl:h-[400px] lg:h-[350px] md:h-[300px] h-[200px]" src={article.image} alt={article.slug} />
              <div className="flex flex-row items-start justify-between mt-5 sm:px-0 px-4">
                <div className="flex flex-row justify-center items-center gap-3">
                  <img className="rounded-full lg:w-12 md:w-11 sm:w-10 w-9" src="https://placehold.co/50x50" alt="Profile Author" />
                  <div>
                    <h4 className="gcContentAccent1p text-gcPrimary-1000">Jane Doe</h4>
                    <h6 className="gcContentBody2p text-gcSecondary-400 xl:-mt-1">Botanist</h6>
                  </div>
                </div>
                <h4 className="gcContentAccent2p text-gcPrimary-1000">{formatDate(article.createdAt)}</h4>
              </div>
              <div className="mt-5 sm:px-0 px-4">{article.content}</div>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
