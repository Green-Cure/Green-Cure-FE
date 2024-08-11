"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchArticles } from "@/app/api/article/route";
import request from "@/app/utils/request";
import LoggedInNavbar from "../LoggedInNavbar";
import TopBar from "../TopBar";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArticleContext } from "@/contexts/ArticleContext";
import { getArticlesData } from "@/app/utils/getArticlesData";

export default function MyArticleLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { articles, setArticles } = useContext(ArticleContext);

  useEffect(() => {
    if (!articles) {
      getArticlesData().then(
        (res) => {
          if (res) {
            setArticles(res);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, [articles, router]);

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10 sm:mb-10 mb-20">
        <TopBar pageName={"Artikel"} />
        {children}
      </section>
    </>
  );
}
