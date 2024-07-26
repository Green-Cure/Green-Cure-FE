"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import InputArticle from "../../InputArticle";

export default function EditArticle({ params }) {
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

  const handleSubmit = (article) => {
    console.log(article);
  };

  return <>{article ? <InputArticle article={article} handleSubmit={handleSubmit} /> : "Loading..."}</>;
}
