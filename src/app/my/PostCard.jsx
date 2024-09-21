"use client";

import { useState } from "react";
import { formatTime } from "../utils/formatTimestamp";
import { hostNoPrefix } from "../utils/urlApi";
import ForumReportModal from "./forum/ForumReportModal";
import request from "@/app/utils/request";
import toast from "react-hot-toast";

export default function PostCard({ data, handleReplyClick = () => {}, showReplyPost = false, idReplyPost, showReportButton = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({
    reason: "",
  });

  const handleForumReportSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    request
      .post(`report/forum/${data.id}`, {
        reason: reason,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setReason("");
          setIsModalOpen(false);
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            reason: "",
          };

          res.response.data.messages.forEach((message) => {
            newErrors[message.field] = message.message;
          });

          setErrors(newErrors);
          toast.error("Something Went Wrong");
        } else if (res.response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!data) {
    return;
  }

  return (
    <div className="border-b lg:pb-2 lg:mt-8 mt-4">
      <header className="flex justify-between">
        <div className="flex justify-center items-center gap-3">
          <img className="w-12 rounded-full" src={data.author.avatar !== null ? `${hostNoPrefix}uploads/${data.author.avatar}` : "/avatars/default-avatar.svg"} alt="Post Avatar" />
          <div>
            <h3 className="gcContentAccent1p text-gcPrimary-1000">{data.author.name}</h3>
            <h4 className="gcContentBody2p text-gcSecondary-400 xl:-mt-1">@{data.author.username}</h4>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <h3 className="gcContentAccent2p text-gcPrimary-1000">{formatTime(data.createdAt)}</h3>
        </div>
      </header>
      <div className="pl-16 place-self-end flex flex-col mt-1">
        <div className="bg-gradient-to-r from-gcPrimary-200 to-gcPrimary-100 rounded-3xl px-6 py-4">
          <h1 className="gcContentBody2p text-gcPrimary-1000 text-justify">{data.content}</h1>
          {data.image && <img src={`${hostNoPrefix}uploads/${data.image}`} alt="Forum Picture" className="w-full md:max-w-max lg:max-h-60 md:max-h-56 max-h-48 object-cover object-center mt-3" />}
        </div>
        <div className="py-3 px-6 flex justify-between">
          <div className="flex gap-2 lg:gap-4 items-start">
            <button type="button" onClick={() => handleReplyClick(data.id)}>
              <svg
                className={`xl:w-7 xl:h-7 md:h-6 md:w-6 sm:h-5 sm:w-5 h-4 w-4 transition ${showReplyPost && idReplyPost == data.id ? "fill-gcPrimary-900" : "hover:fill-gcPrimary-900 fill-gcPrimary-1000"}`}
                width="39"
                height="37"
                viewBox="0 0 39 37"
                fill="#205072"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.515625 7.38943C0.515625 3.51045 3.56366 0.365906 7.32359 0.365906H31.8323C35.5922 0.365906 38.6402 3.51045 38.6402 7.38943V21.4365C38.6402 25.3154 35.5922 28.46 31.8323 28.46H21.4511L13.1113 35.9884C11.3857 37.5462 8.68518 36.282 8.68518 33.9165V28.46H7.32359C3.56366 28.46 0.515625 25.3154 0.515625 21.4365V7.38943ZM7.32359 3.99682C5.06762 3.99682 4.14654 5.06203 4.14654 7.38943V13.9818V21.4365C4.14654 23.7638 5.06762 25.6506 7.32359 25.6506H11.4084V33.7926L20.4279 25.6506H31.8323C34.0882 25.6506 35.0093 23.7638 35.0093 21.4365V7.62774C35.0093 5.30034 34.0882 3.99682 31.8323 3.99682H7.32359Z"
                  fill="#205072"
                  className={`${showReplyPost && idReplyPost == data.id ? "fill-gcPrimary-900" : "hover:fill-gcPrimary-900 fill-gcPrimary-1000 "}`}
                />
              </svg>
              <h3 className="mt-1 text-gcPrimary-1000 gcHeading4p">{data.replies_count}</h3>
            </button>
            <button
              onClick={() => {
                toast.success("Copied to clipboard!");
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <svg className="xl:w-7 xl:h-7 md:h-6 md:w-6 sm:h-5 sm:w-5 h-4 w-4 hover:fill-gcPrimary-900 fill-gcPrimary-1000 transition" width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M35.9413 15.4211L21.4176 0.897448C21.1637 0.64363 20.8403 0.470787 20.4882 0.400769C20.1361 0.330751 19.7711 0.366703 19.4394 0.504078C19.1077 0.641454 18.8242 0.874086 18.6247 1.17256C18.4252 1.47104 18.3187 1.82197 18.3186 2.18098V8.61677C13.3593 9.07571 8.74977 11.3688 5.39202 15.0472C2.03426 18.7256 0.170002 23.5246 0.164062 28.5051V31.2283C0.164349 31.6051 0.281903 31.9726 0.50042 32.2796C0.718936 32.5866 1.02758 32.8181 1.38355 32.9418C1.73952 33.0655 2.12516 33.0753 2.48699 32.97C2.84882 32.8647 3.1689 32.6493 3.40284 32.3539C5.18144 30.2388 7.36373 28.4994 9.8222 27.2372C12.2807 25.9751 14.966 25.2156 17.7214 25.0031C17.8121 24.9922 18.0391 24.974 18.3186 24.9559V31.2283C18.3187 31.5873 18.4252 31.9382 18.6247 32.2367C18.8242 32.5352 19.1077 32.7678 19.4394 32.9052C19.7711 33.0426 20.1361 33.0785 20.4882 33.0085C20.8403 32.9385 21.1637 32.7656 21.4176 32.5118L35.9413 17.9882C36.2816 17.6477 36.4728 17.186 36.4728 16.7046C36.4728 16.2232 36.2816 15.7616 35.9413 15.4211ZM21.9496 26.8458V23.0587C21.9496 22.5772 21.7583 22.1155 21.4178 21.775C21.0774 21.4346 20.6156 21.2433 20.1341 21.2433C19.6712 21.2433 17.7813 21.3341 17.2984 21.3976C12.4054 21.8484 7.74799 23.7074 3.88938 26.7496C4.32735 22.7455 6.22686 19.0436 9.2242 16.3527C12.2215 13.6619 16.1061 12.1712 20.1341 12.166C20.6156 12.166 21.0774 11.9747 21.4178 11.6343C21.7583 11.2938 21.9496 10.832 21.9496 10.3505V6.56349L32.0907 16.7046L21.9496 26.8458Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 lg:gap-4 items-start">
            {showReportButton && (
              <button
                className="group"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
              >
                <svg
                  className="xl:w-7 xl:h-7 md:h-6 md:w-6 sm:h-5 sm:w-5 h-4 w-4 group-hover:child:fill-gcPrimary-900 child:fill-gcPrimary-1000 transition child:transition"
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.1829 0.375H9.81708L0.375 9.81708V23.1829L9.81708 32.625H23.1829L32.625 23.1829V9.81708L23.1829 0.375ZM16.5 25.9958C15.21 25.9958 14.1708 24.9567 14.1708 23.6667C14.1708 22.3767 15.21 21.3375 16.5 21.3375C17.79 21.3375 18.8292 22.3767 18.8292 23.6667C18.8292 24.9567 17.79 25.9958 16.5 25.9958ZM18.2917 18.2917H14.7083V7.54167H18.2917V18.2917Z"
                    fill="#205072"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && showReportButton && <ForumReportModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleSubmit={handleForumReportSubmit} reason={reason} setReason={setReason} errors={errors} isLoading={isLoading} />}
    </div>
  );
}
