"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchArticles } from "@/app/api/article/route";
import request from "@/app/utils/request";
import LoggedInNavbar from "../LoggedInNavbar";
import TopBar from "../TopBar";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  // const [articles, setArticles] = useState([
  //   {
  //     id: 1,
  //     userId: 101,
  //     title: "Cara Menanam dan Merawat Tanaman Herbal untuk Pemula",
  //     slug: "cara-menanam-dan-merawat-tanaman-herbal-untuk-pemula",
  //     image: "https://cdn.pixabay.com/photo/2017/07/20/17/56/herbs-2523119_1280.jpg",
  //     content: "Panduan lengkap untuk menanam dan merawat tanaman herbal seperti kemangi, rosemary, dan sage.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 2,
  //     userId: 102,
  //     title: "11 Tanaman di Sekitar Rumah yang Bermanfaat",
  //     slug: "11-tanaman-di-sekitar-rumah-yang-bermanfaat",
  //     image: "https://cdn.pixabay.com/photo/2017/05/07/22/36/ivy-2293830_960_720.jpg",
  //     content: "Daftar tanaman yang bisa ditanam di sekitar rumah untuk keindahan dan manfaat kesehatan.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 3,
  //     userId: 103,
  //     title: "Cara Merawat Pohon Tabebuya agar Rajin Berbunga",
  //     slug: "cara-merawat-pohon-tabebuya-agar-rajin-berbunga",
  //     image: "https://portalberita.lumajangkab.go.id/files/berita/WhatsApp_Image_2023-11-23_at_6_41_08_PM.jpeg",
  //     content: "Tips dan trik untuk merawat pohon tabebuya agar selalu berbunga dengan subur.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 4,
  //     userId: 104,
  //     title: "16 Macam Tumbuhan Herbal dan Manfaatnya",
  //     slug: "16-macam-tumbuhan-herbal-dan-manfaatnya",
  //     image: "https://cdn.rri.co.id/berita/Sendawar/o/1720751413156-IMG_1539/4p6l0cpkdmmxh4b.jpeg",
  //     content: "Penjelasan tentang 16 jenis tumbuhan herbal dan manfaat kesehatannya.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 5,
  //     userId: 105,
  //     title: "Panduan Menanam Tanaman Hias di Dalam Rumah",
  //     slug: "panduan-menanam-tanaman-hias-di-dalam-rumah",
  //     image: "https://awsimages.detik.net.id/community/media/visual/2022/02/18/tanaman-lidah-mertua_169.jpeg?w=600&q=90",
  //     content: "Langkah-langkah menanam dan merawat tanaman hias di dalam rumah agar tetap sehat dan indah.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 6,
  //     userId: 106,
  //     title: "Tips Merawat Tanaman Buah di Pekarangan Rumah",
  //     slug: "tips-merawat-tanaman-buah-di-pekarangan-rumah",
  //     image: "https://imgx.sonora.id/crop/0x0:0x0/x/photo/2023/03/21/when-to-plant-apple-trees-1200x6-20230321092358.jpeg",
  //     content: "Cara merawat tanaman buah seperti mangga dan jambu di pekarangan rumah.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 7,
  //     userId: 107,
  //     title: "Cara Menanam Tanaman Obat di Pot Kecil",
  //     slug: "cara-menanam-tanaman-obat-di-pot-kecil",
  //     image: "https://asset.kompas.com/crops/Xdw_vhHr1KcIPW0YhmGynKrJyfg=/100x67:900x600/750x500/data/photo/2021/10/07/615eb844d5aa6.jpg",
  //     content: "Panduan menanam tanaman obat seperti lidah buaya dan jahe di pot kecil.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 8,
  //     userId: 108,
  //     title: "Merawat Tanaman Hias Daun agar Tetap Segar",
  //     slug: "merawat-tanaman-hias-daun-agar-tetap-segar",
  //     image: "https://pict.sindonews.net/dyn/850/pena/news/2020/11/19/166/238336/ini-lima-tanaman--hias--yang--sering-dibeli-dan-viral-aic.png",
  //     content: "Tips merawat tanaman hias daun seperti monstera dan philodendron agar tetap segar.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 9,
  //     userId: 109,
  //     title: "Cara Menanam Tanaman Hidroponik di Rumah",
  //     slug: "cara-menanam-tanaman-hidroponik-di-rumah",
  //     image: "https://asset.kompas.com/crops/Pi7ZX5WH1dLkCpENMVOQfLBivD8=/107x156:834x640/750x500/data/photo/2022/09/29/63354297c3995.jpg",
  //     content: "Langkah-langkah menanam tanaman hidroponik di rumah dengan mudah.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  //   {
  //     id: 10,
  //     userId: 110,
  //     title: "Panduan Merawat Tanaman Kaktus dan Sukulen",
  //     slug: "panduan-merawat-tanaman-kaktus-dan-sukulen",
  //     image: "https://asset-a.grid.id/crop/0x0:0x0/x/photo/2021/08/05/sukulenjpg-20210805122230.jpg",
  //     content: "Cara merawat tanaman kaktus dan sukulen agar tetap sehat dan tumbuh subur.",
  //     createdAt: "2023-07-23T00:00:00Z",
  //     updatedAt: "2023-07-23T00:00:00Z",
  //     deletedAt: null,
  //   },
  // ]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([{}]);
  useEffect(() => {
    request
      .get("articles")
      .then(function (response) {
        if (
          response.data?.statusCode === 200 ||
          response.data?.statusCode === 201
        ) {
          if (response.data.data.length > 0) {
            setArticles(response.data.data);
          } else {
            setArticles(null);
          }
          toast.dismiss();
          setLoading(false);
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          setLoading(false);
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setLoading(false);
      });
  }, [loading, setLoading, setArticles]);

  return (
    <ArticleContext.Provider value={{ articles, loading, error, meta }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default function MyArticleLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <LoggedInNavbar />
      <ArticleProvider>
        <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10 sm:mb-10 mb-20">
          <TopBar pageName={"Artikel"} />
          {children}
        </section>
      </ArticleProvider>
    </>
  );
}
