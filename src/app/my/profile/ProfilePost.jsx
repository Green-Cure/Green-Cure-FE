"use client";

import { useEffect, useState } from "react";
import PostCard from "../PostCard";
import request from "@/app/utils/request";
import toast from "react-hot-toast";

export default function ProfilePost({ userData }) {
  const [myPosts, setMyPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = getMyPostsData();
    if (data) {
      data.then(
        (response) => {
          if (response) {
            setMyPosts(response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          } else {
            setMyPosts(null);
          }
          toast.dismiss();
          setIsLoading(false);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      toast.dismiss();
      setIsLoading(false);
      setMyPosts(null);
    }
  }, []);

  const getMyPostsData = async () => {
    let posts = null;
    await request
      .get("forum/my")
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            posts = response.data.data;
          } else {
            posts = null;
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.error("Server Error");
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An unexpected error occurred");
      });
    return posts;
  };

  return (
    <>
      <section className="xl:px-20 lg:px-16 md:px-12 px-7 sm:px-10 flex flex-col w-full mb-20">
        {!isLoading && myPosts !== null && myPosts.map((post, index) => <PostCard key={index} data={{ ...post, author: userData }} />)}
        {!isLoading && myPosts === null && <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">No data</h1>}
      </section>
    </>
  );
}
