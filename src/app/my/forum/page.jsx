"use client";

import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import LoggedInNavbar from "../LoggedInNavbar";
import TopBar from "../TopBar";
import PostCard from "../PostCard";
import request from "@/app/utils/request";
import toast from "react-hot-toast";
import MyForumAddPost from "./ForumAddPost";
import MyForumReplyPost from "./ForumReplyPost";
import { UserContext } from "@/contexts/UserContext";
import { getUserData } from "@/app/utils/getUserData";

function getInitialIsMobile() {
  let initialIsMobile = false;
  if (typeof window !== "undefined") {
    initialIsMobile = window.innerWidth;
  }
  return initialIsMobile < 640;
}

export default function Forum() {
  const [isMobile, setIsMobile] = useState(getInitialIsMobile());
  const [showAddPost, setShowAddPost] = useState(!getInitialIsMobile());
  const [showReplyPost, setShowReplyPost] = useState(false);
  const [replyData, setReplyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [post, setPost] = useState(null);
  const [idReplyPost, setIdReplyPost] = useState(null);

  const [errors, setErrors] = useState({
    image: "",
    content: "",
  });

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    } else {
      setShowAddPost(true);
      setIsMobile(false);
    }
  };

  const handleSetShowAddPost = (isOpen) => {
    if (isMobile) {
      setShowAddPost(isOpen);
    } else {
      setShowAddPost(false);
    }
  };

  const handleSetShowReplyPost = (isOpen, id = "") => {
    if (isOpen) {
      setIdReplyPost(id);
    } else {
      setIdReplyPost(null);
    }
    setShowReplyPost(isOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    const data = getPostsData();
    if (data) {
      data.then(
        (response) => {
          if (response) {
            setPosts(response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          } else {
            setPosts(null);
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
      setPosts(null);
    }
  }, []);

  const getPostsData = async () => {
    let posts = null;
    await request
      .get("forum")
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

  const handleReplyClick = (id) => {
    if (idReplyPost !== id && showReplyPost) {
      setIdReplyPost(id);
    } else {
      if (!showReplyPost) {
        setIdReplyPost(id);
      }
      setShowReplyPost(!showReplyPost);
    }
  };

  const handleSubmitAddPost = (e, data) => {
    e.preventDefault();

    toast.loading("Loading...");

    request
      .post("forum", data)
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.dismiss();
          toast.success(res.data.message);
          setPost({
            content: "",
            image: null,
          });
          setErrors({
            image: "",
            content: "",
          });
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            content: "",
            image: "",
          };

          res.response.data.messages.forEach((message) => {
            newErrors[message.field] = message.message;
          });

          setErrors(newErrors);
          toast.dismiss();
          toast.error("Something Went Wrong");
          setPost({
            content: data.content,
            image: null,
          });
        } else if (res.response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          setPost({
            content: data.content,
            image: null,
          });
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
          setPost({
            content: data.content,
            image: null,
          });
        }
      })
      .finally(() => {
        const data = getPostsData();
        if (data) {
          data.then(
            (response) => {
              if (response) {
                setPosts(response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
              } else {
                setPosts(null);
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
          setPosts(null);
        }
      });
  };

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:pl-10 flex gap-10 min-h-screen relative">
        <div className="sm:w-3/5 xl:w-2/3 w-full">
          <TopBar pageName={"Forum"} />
          <div className="px-5 mb-20">
            {isLoading && <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">Loading...</h1>}
            {!isLoading && posts === null && <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">No data forum</h1>}
            {!isLoading && posts !== null && (
              <>
                {posts.map((post, index) => (
                  <PostCard data={post} key={index} handleReplyClick={handleReplyClick} showReplyPost={showReplyPost} idReplyPost={idReplyPost} showReportButton={true} />
                ))}
              </>
            )}
          </div>
        </div>
        <MyForumAddPost showAddPost={showAddPost} handleSetShowAddPost={handleSetShowAddPost} isMobile={isMobile} showReplyPost={showReplyPost} handleSubmitAddPost={handleSubmitAddPost} errors={errors} data={post} />
        <MyForumReplyPost showReplyPost={showReplyPost} handleSetShowReplyPost={handleSetShowReplyPost} isMobile={isMobile} idPost={idReplyPost} getPostsData={getPostsData} setPosts={setPosts} />
      </section>
      {!showReplyPost && (
        <button className={`sm:hidden fixed transition-all ease-in-out duration-300 bottom-20 bg-gcPrimary-1000 rounded-full p-2.5 z-30 gcDropShadow ${showAddPost ? "-right-full" : "right-5"}`} onClick={() => handleSetShowAddPost(true)}>
          <svg width="25" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M17 2V32V2ZM2 17H32H2Z" fill="#F5F5F5" />
            <path d="M17 2V32M2 17H32" stroke="#FAFAFA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
}
