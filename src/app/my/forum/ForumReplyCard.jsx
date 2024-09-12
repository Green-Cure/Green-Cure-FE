"use client";

import { formatTime } from "@/app/utils/formatTimestamp";
import { hostNoPrefix } from "@/app/utils/urlApi";
import ForumReportModal from "./ForumReportModal";
import request from "@/app/utils/request";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MyForumReplyCard({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({
    reason: "",
  });

  const handleForumReplyReport = (e) => {
    e.preventDefault();

    setIsLoading(true);

    request
      .post(`report/replies/${data.id}`, {
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

  return (
    <>
      <div className="lg:mt-8 mt-4 z-[11] relative">
        <header className="flex flex-row-reverse justify-between">
          <div className="flex flex-row-reverse justify-center items-center gap-3 text-right">
            {data && <img className="w-10 rounded-full" src={data.author.avatar !== null ? `${hostNoPrefix}uploads/${data.author.avatar}` : "/avatars/default-avatar.svg"} alt="Post Avatar" />}
            <div>
              <h3 className="gcContentAccent2p text-gcPrimary-1000">{data.author.name}</h3>
              <h4 className="gcContentBody5p text-gcSecondary-400 xl:-mt-1">@{data.author.username}</h4>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <h3 className="gcContentAccent3p text-gcPrimary-1000 lg:block sm:hidden">{formatTime(data.createdAt)}</h3>
          </div>
        </header>
        <div className="pr-16 place-self-end flex flex-col mt-1">
          <div className="sm:bg-gcNeutrals-baseWhite bg-gcSecondary-100 rounded-3xl px-6 py-4">
            <h1 className="gcContentBody5p text-gcPrimary-1000 text-justify">{data.content}</h1>
            {data.image && <img src={`${hostNoPrefix}uploads/${data.image}`} alt="Forum Picture" className="object-cover object-center mt-3 lg:max-h-60 md:max-h-56 max-h-48" />}
          </div>
          <button
            className="group place-self-end md:mt-2 mt-1"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            <svg
              className="xl:w-5 xl:h-5 md:h-4 md:w-4 sm:h-3 sm:w-3 h-2.5 w-2.5 group-hover:child:fill-gcPrimary-900 child:fill-gcPrimary-1000 transition child:transition"
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
        </div>
      </div>
      {isModalOpen && <ForumReportModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleSubmit={handleForumReplyReport} reason={reason} setReason={setReason} errors={errors} isLoading={isLoading} />}
    </>
  );
}
