"use client";

import request from "@/app/utils/request";
import { hostNoPrefix } from "@/app/utils/urlApi";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";

export default function MyForumAddPost({ showAddPost, handleSetShowAddPost, isMobile, showReplyPost, handleSubmitAddPost, errors, data }) {
  const { userData } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setContent(data ? data.content : "");
    setImage("");
    setPreviewImage("");
  }, [data]);

  return (
    <div
      className={`sm:w-2/5 xl:w-1/3 sm:pr-10 sm:pl-7 sm:bg-gcSecondary-100 bg-gcNeutrals-baseWhite sm:relative absolute top-0 bottom-0 transition-all duration-300 ease-in-out ${
        isMobile ? (showAddPost ? "right-0 left-0" : "-left-full right-full") : showAddPost && !showReplyPost ? "right-0" : "-right-full hidden"
      }`}
    >
      <div className="flex flex-col p-5 sm:p-0">
        <div className="flex justify-between items-center sm:mt-24">
          <button className="flex justify-between items-center lg:gap-5 gap-3" disabled={isMobile ? false : true} onClick={() => handleSetShowAddPost(false)}>
            <svg className="sm:hidden xl:w-9 lg:w-8 md:w-7 w-5" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.3493 10.5658L20.612 2.5206C20.859 2.27975 20.9978 1.95309 20.9978 1.61247C20.9978 1.27186 20.859 0.945195 20.612 0.704345C20.3651 0.463494 20.0301 0.328186 19.6808 0.328186C19.3316 0.328186 18.9966 0.463494 18.7496 0.704345L10.5 8.76237L2.25035 0.704345C2.00338 0.463494 1.66842 0.328186 1.31915 0.328186C0.969886 0.328186 0.634924 0.463494 0.387954 0.704345C0.140984 0.945195 0.00223861 1.27186 0.0022386 1.61247C0.0022386 1.95309 0.140984 2.27975 0.387954 2.5206L8.65072 10.5658L0.387954 18.6111C0.265025 18.73 0.167453 18.8714 0.100868 19.0273C0.0342819 19.1832 0 19.3504 0 19.5192C0 19.6881 0.0342819 19.8552 0.100868 20.0111C0.167453 20.167 0.265025 20.3084 0.387954 20.4273C0.50988 20.5472 0.654938 20.6424 0.814763 20.7073C0.974587 20.7722 1.14601 20.8057 1.31915 20.8057C1.49229 20.8057 1.66372 20.7722 1.82355 20.7073C1.98337 20.6424 2.12843 20.5472 2.25035 20.4273L10.5 12.3693L18.7496 20.4273C18.8716 20.5472 19.0166 20.6424 19.1765 20.7073C19.3363 20.7722 19.5077 20.8057 19.6808 20.8057C19.854 20.8057 20.0254 20.7722 20.1852 20.7073C20.3451 20.6424 20.4901 20.5472 20.612 20.4273C20.735 20.3084 20.8325 20.167 20.8991 20.0111C20.9657 19.8552 21 19.6881 21 19.5192C21 19.3504 20.9657 19.1832 20.8991 19.0273C20.8325 18.8714 20.735 18.73 20.612 18.6111L12.3493 10.5658Z"
                fill="#205072"
              />
            </svg>
            <h1 className="gcHeading3p text-gcPrimary-1000">Add Post</h1>
          </button>
          <button
            className="bg-gcPrimary-1000 text-gcNeutrals-baseWhite xl:px-8 px-4 md:py-2 py-1.5 gcContentAccent1p rounded-2xl hover:bg-gcPrimary-900"
            type="button"
            onClick={(e) => {
              const newData = {};
              if (previewImage.length > 0) {
                newData.image = image;
              }
              newData.content = content;
              handleSubmitAddPost(e, newData);
            }}
          >
            Post
          </button>
        </div>
        <div className="flex gap-3 sm:gap-0 justify-between items-start">
          <div className="flex justify-center items-start mt-5 sm:p-0">
            {userData && <img className="w-12 rounded-full sm:hidden" src={userData.avatar !== null ? `${hostNoPrefix}uploads/${data.author.avatar}` : "/avatars/default-avatar.svg"} alt="Post Avatar" />}
            {!userData && <img className="w-12 rounded-full sm:hidden" src="/avatars/default-avatar.svg" alt="Post Avatar" />}
          </div>
          <div className="bg-gradient-to-r w-full from-gcPrimary-200 to-gcPrimary-100 p-6 rounded-2xl mt-5">
            <textarea
              placeholder="Type Something..."
              className="min-h-28 bg-transparent placeholder:text-gcPrimary-900 text-gcPrimary-900 gcContentAccent2p w-full focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            {errors.content && <small className="text-red-600">{errors.content}</small>}

            {previewImage.length > 0 && (
              <div className="mb-3">
                <img src={previewImage} alt="Preview Image" className="object-cover object-center max-h-60 w-full" />
              </div>
            )}

            <div className="flex flex-col gap-3 mt-2.5">
              <div className="flex gap-3">
                <div>
                  <input
                    id="imageAddPost"
                    name="image"
                    accept={"image/*"}
                    type={"file"}
                    required={true}
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setImage(e.target.files[0]);
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="imageAddPost" className="bg-gcPrimary-1000 rounded-xl flex justify-center items-center p-1.5 md:p-2 cursor-pointer hover:bg-gcPrimary-900 transition">
                    <svg className="xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-9 md:h-9 sm:w-8 sm:h-8 w-6 h-6" width="58" height="45" viewBox="0 0 58 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M36.4521 30.2538L27.229 21.0307M27.229 21.0307L18.0059 30.2538M27.229 21.0307V41.7827" stroke="#FAFAFA" strokeWidth="5.35463" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M48.3223 39.407C50.6142 38.1575 52.4247 36.1804 53.4681 33.7877C54.5115 31.395 54.7284 28.723 54.0845 26.1933C53.4407 23.6636 51.9727 21.4204 49.9124 19.8177C47.852 18.215 45.3166 17.344 42.7063 17.3423H39.7455C39.0343 14.5912 37.7086 12.0372 35.8682 9.87225C34.0278 7.70727 31.7206 5.98768 29.12 4.84276C26.5193 3.69783 23.693 3.15736 20.8534 3.26198C18.0138 3.36661 15.2349 4.1136 12.7255 5.44679C10.2162 6.77999 8.04175 8.66471 6.36566 10.9592C4.68957 13.2538 3.55545 15.8984 3.04858 18.6944C2.5417 21.4903 2.67525 24.3648 3.43919 27.1017C4.20313 29.8385 5.57758 32.3666 7.45921 34.4959"
                        stroke="#FAFAFA"
                        strokeWidth="5.45687"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M36.4521 30.2538L27.229 21.0307L18.0059 30.2538" stroke="#FAFAFA" strokeWidth="5.35463" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </label>
                </div>
              </div>
              {errors.image && <small className="text-red-600">{errors.image}</small>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
