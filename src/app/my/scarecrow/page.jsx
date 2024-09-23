"use client";

import { UserContext } from "@/contexts/UserContext";
import MyScarecrowChat from "./ScarecrowChat";
import MyScarecrowHistory from "./ScarecrowHistory";
import { useContext, useEffect, useState } from "react";
import { getUserData } from "@/app/utils/getUserData";
import request from "@/app/utils/request";
import toast from "react-hot-toast";
import TopBar from "../TopBar";

export default function MyScarecrow() {
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [historyChat, setHistoryChat] = useState(null);
  const [showChatId, setShowChatId] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setShowChatId(urlParams.get("id"));
    }
  }, []);

  useEffect(() => {
    if (!userData) {
      const data = getUserData();
      if (data) {
        data.then(
          (response) => {
            setUserData(response);
            setIsLoading(false);
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        setIsLoading(false);
        setUserData(null);
      }
    } else {
      setIsLoading(false);
    }
  }, [userData, setUserData]);

  useEffect(() => {
    setIsLoading(true);
    request
      .get(`scarecrow`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            setHistoryChat(response.data.data);
          } else {
            setHistoryChat([]);
          }
          toast.dismiss();
          setIsLoading(false);
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          setIsLoading(false);
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <TopBar pageName={"Ask Scarecrow"}>
            <button
              onClick={() => {
                setIsHistoryOpen(!isHistoryOpen);
              }}
              className="gcContentAccent5p text-gcNeutrals-baseWhite bg-gcPrimary-600 rounded-xl md:py-2 md:px-3 py-1 px-2 hover:bg-gcPrimary-500 transition sm:hidden"
            >
              History
            </button>
          </TopBar>
          <div className="flex xl:gap-2 md:gap-1 h-full md:mt-8 mt-3 pb-20">
            <MyScarecrowHistory datas={historyChat} setShowChatId={setShowChatId} isHistoryOpen={isHistoryOpen} setIsHistoryOpen={setIsHistoryOpen} />
            <MyScarecrowChat userData={userData} showChatId={showChatId} />
          </div>
        </>
      )}
    </>
  );
}
