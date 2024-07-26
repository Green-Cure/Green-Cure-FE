"use client";

import { formatDate } from "@/app/utils/formatTimestamp";
import request from "@/app/utils/requests";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import DeleteModal from "../DeleteModal";

export default function DashboardArticle() {
  const router = useRouter();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const [articles, setArticles] = useState([
    {
      id: 1,
      userId: 101,
      title: "Cara Menanam dan Merawat Tanaman Herbal untuk Pemula",
      slug: "cara-menanam-dan-merawat-tanaman-herbal-untuk-pemula",
      image: "https://cdn.pixabay.com/photo/2017/07/20/17/56/herbs-2523119_1280.jpg",
      content: "Panduan lengkap untuk menanam dan merawat tanaman herbal seperti kemangi, rosemary, dan sage.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 2,
      userId: 102,
      title: "11 Tanaman di Sekitar Rumah yang Bermanfaat",
      slug: "11-tanaman-di-sekitar-rumah-yang-bermanfaat",
      image: "https://cdn.pixabay.com/photo/2017/05/07/22/36/ivy-2293830_960_720.jpg",
      content: "Daftar tanaman yang bisa ditanam di sekitar rumah untuk keindahan dan manfaat kesehatan.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 3,
      userId: 103,
      title: "Cara Merawat Pohon Tabebuya agar Rajin Berbunga",
      slug: "cara-merawat-pohon-tabebuya-agar-rajin-berbunga",
      image: "https://portalberita.lumajangkab.go.id/files/berita/WhatsApp_Image_2023-11-23_at_6_41_08_PM.jpeg",
      content: "Tips dan trik untuk merawat pohon tabebuya agar selalu berbunga dengan subur.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 4,
      userId: 104,
      title: "16 Macam Tumbuhan Herbal dan Manfaatnya",
      slug: "16-macam-tumbuhan-herbal-dan-manfaatnya",
      image: "https://cdn.rri.co.id/berita/Sendawar/o/1720751413156-IMG_1539/4p6l0cpkdmmxh4b.jpeg",
      content: "Penjelasan tentang 16 jenis tumbuhan herbal dan manfaat kesehatannya.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 5,
      userId: 105,
      title: "Panduan Menanam Tanaman Hias di Dalam Rumah",
      slug: "panduan-menanam-tanaman-hias-di-dalam-rumah",
      image: "https://awsimages.detik.net.id/community/media/visual/2022/02/18/tanaman-lidah-mertua_169.jpeg?w=600&q=90",
      content: "Langkah-langkah menanam dan merawat tanaman hias di dalam rumah agar tetap sehat dan indah.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 6,
      userId: 106,
      title: "Tips Merawat Tanaman Buah di Pekarangan Rumah",
      slug: "tips-merawat-tanaman-buah-di-pekarangan-rumah",
      image: "https://imgx.sonora.id/crop/0x0:0x0/x/photo/2023/03/21/when-to-plant-apple-trees-1200x6-20230321092358.jpeg",
      content: "Cara merawat tanaman buah seperti mangga dan jambu di pekarangan rumah.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 7,
      userId: 107,
      title: "Cara Menanam Tanaman Obat di Pot Kecil",
      slug: "cara-menanam-tanaman-obat-di-pot-kecil",
      image: "https://asset.kompas.com/crops/Xdw_vhHr1KcIPW0YhmGynKrJyfg=/100x67:900x600/750x500/data/photo/2021/10/07/615eb844d5aa6.jpg",
      content: "Panduan menanam tanaman obat seperti lidah buaya dan jahe di pot kecil.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 8,
      userId: 108,
      title: "Merawat Tanaman Hias Daun agar Tetap Segar",
      slug: "merawat-tanaman-hias-daun-agar-tetap-segar",
      image: "https://pict.sindonews.net/dyn/850/pena/news/2020/11/19/166/238336/ini-lima-tanaman--hias--yang--sering-dibeli-dan-viral-aic.png",
      content: "Tips merawat tanaman hias daun seperti monstera dan philodendron agar tetap segar.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 9,
      userId: 109,
      title: "Cara Menanam Tanaman Hidroponik di Rumah",
      slug: "cara-menanam-tanaman-hidroponik-di-rumah",
      image: "https://asset.kompas.com/crops/Pi7ZX5WH1dLkCpENMVOQfLBivD8=/107x156:834x640/750x500/data/photo/2022/09/29/63354297c3995.jpg",
      content: "Langkah-langkah menanam tanaman hidroponik di rumah dengan mudah.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 10,
      userId: 110,
      title: "Panduan Merawat Tanaman Kaktus dan Sukulen",
      slug: "panduan-merawat-tanaman-kaktus-dan-sukulen",
      image: "https://asset-a.grid.id/crop/0x0:0x0/x/photo/2021/08/05/sukulenjpg-20210805122230.jpg",
      content: "Cara merawat tanaman kaktus dan sukulen agar tetap sehat dan tumbuh subur.",
      createdAt: "2023-07-23T00:00:00Z",
      updatedAt: "2023-07-23T00:00:00Z",
      deletedAt: null,
    },
  ]);

  const handleToggleDeleteModal = () => {
    setIdDelete("");
    setToggleDelete(!toggleDelete);
  };

  const handleDelete = (slug) => {
    request
      .delete(`articles/${slug}`)
      .then(function (response) {
        return console.log(response.response.data);
        const data = response.response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex justify-between">
        <form className="flex items-center max-w-sm xl:w-96 lg:w-80 md:w-72 sm:w-64 w-52">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gcPrimary-1000">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gcPrimary-1000 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              placeholder="Search article..."
              required
            />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-gcNeutrals-baseWhite rounded-lg border focus:ring-4 focus:outline-none focus:ring-gcPrimary-800 bg-gcPrimary-1000 transition hover:bg-gcPrimary-900">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <button
          type="button"
          className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 rounded-lg px-3 md:px-4 sm:py-1.5 py-1 text-center flex items-center justify-between gap-1"
          onClick={() => {
            router.push(`/dashboard/article/addArticle`);
          }}
        >
          <LuPlus className="md:text-2xl text-xl -ml-1" />
          <h2 className="font-medium text-sm">Add article</h2>
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gcNeutrals-baseWhite uppercase bg-gcPrimary-1000">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 w-1/3">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-1/3">
                Thumbnails
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => {
              return (
                <tr className="bg-white border-b hover:bg-gray-50" key={article.id}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                      <label htmlFor="checkbox-table-search-3" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    <h4
                      className="text-wrap line-clamp-3 hover:underline cursor-pointer"
                      onClick={() => {
                        router.push(`/dashboard/article/detailArticle/${article.slug}`);
                      }}
                    >
                      {article.title}
                    </h4>
                  </th>
                  <td className="px-6 py-4">
                    <img className="max-h-24" src={`${article.image}`} alt="Article Thumbnails" />
                  </td>
                  <td className="px-6 py-4">{formatDate(article.createdAt)}</td>
                  <td className="px-6 py-4 ">
                    <div className="flex gap-3 items-center justify-start">
                      <button
                        type="button"
                        className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                        onClick={() => {
                          router.push(`/dashboard/article/editArticle/${article.slug}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                        onClick={() => {
                          setToggleDelete(!toggleDelete);
                          setIdDelete(article.slug);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <DeleteModal handleToggleDeleteModal={handleToggleDeleteModal} toggleDelete={toggleDelete} handleDelete={handleDelete} id={idDelete} label={"article"} />
      </div>

      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900">1-10</span> of <span className="font-semibold text-gray-900">1000</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
              Previous
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              1
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              2
            </a>
          </li>
          <li>
            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
              3
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              4
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              5
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
