// src/app/my/monitor/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import LoggedInNavbar from "../LoggedInNavbar";
import TopBar from "../TopBar";
import NoteEditor from "./NoteEditor";
import { useRouter } from "next/navigation";
import request from "@/app/utils/request";
import toast from "react-hot-toast";
import AddMonitorModal from "./AddMonitorModal";

export default function Monitor() {
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [monitorDatas, setMonitorDatas] = useState(null);
  const [isAddMonitorOpen, setIsAddMonitorOpen] = useState(false);

  useEffect(() => {
    if (!isAddMonitorOpen) {
      setIsloading(true);

      request
        .get("monitor")
        .then(function (response) {
          if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
            if (response.data.data.length > 0) {
              setMonitorDatas(response.data.data);
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
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }, [isAddMonitorOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("monitor_name")) {
        setIsAddMonitorOpen(true);
      }
    }
  }, []);

  if (showNoteEditor) {
    return <NoteEditor onBack={() => setShowNoteEditor(false)} />;
  }

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10">
        <TopBar pageName={"Pantau"} />
        <div className="xl:mt-8 lg:mt-7 md:mt-6 sm:mt-5 mt-4 px-4 sm:px-0 pb-20">
          <div>
            {!isLoading &&
              monitorDatas &&
              monitorDatas.length > 0 &&
              monitorDatas.map((data, index) => {
                return <MonitorItem key={index} data={data} />;
              })}
            {!isLoading && (!monitorDatas || (monitorDatas && monitorDatas.length === 0)) && <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">No monitor data</h1>}
          </div>
          <div className="fixed z-50 bottom-20 lg:right-8 sm:right-6 right-4 flex flex-row-reverse items-center justify-center space-y-4">
            <button className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gcPrimary-1000 text-white flex items-center justify-center shadow-lg hover:bg-gcPrimary-900 transition" onClick={() => setIsAddMonitorOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5m7.25-7.25H4.75" />
              </svg>
            </button>
            <button className="w-14 h-14 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg scale-75">
              <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="85.8194" height="85.8194" rx="42.9097" fill="#329D9C" />
                <path
                  d="M67.2611 48.1981C67.2611 48.8994 66.9862 49.5719 66.4968 50.0678C66.0075 50.5637 65.3438 50.8423 64.6518 50.8423H62.0426V53.4865C62.0426 54.1877 61.7677 54.8603 61.2783 55.3562C60.789 55.852 60.1253 56.1306 59.4333 56.1306C58.7413 56.1306 58.0776 55.852 57.5883 55.3562C57.099 54.8603 56.8241 54.1877 56.8241 53.4865V50.8423H54.2148C53.5228 50.8423 52.8591 50.5637 52.3698 50.0678C51.8805 49.5719 51.6056 48.8994 51.6056 48.1981C51.6056 47.4968 51.8805 46.8243 52.3698 46.3284C52.8591 45.8325 53.5228 45.554 54.2148 45.554H56.8241V42.9098C56.8241 42.2085 57.099 41.536 57.5883 41.0401C58.0776 40.5442 58.7413 40.2656 59.4333 40.2656C60.1253 40.2656 60.789 40.5442 61.2783 41.0401C61.7677 41.536 62.0426 42.2085 62.0426 42.9098V45.554H64.6518C65.3438 45.554 66.0075 45.8325 66.4968 46.3284C66.9862 46.8243 67.2611 47.4968 67.2611 48.1981ZM24.6433 31.4517H27.2526V34.0959C27.2526 34.7972 27.5275 35.4697 28.0168 35.9656C28.5061 36.4615 29.1698 36.7401 29.8618 36.7401C30.5538 36.7401 31.2175 36.4615 31.7068 35.9656C32.1962 35.4697 32.4711 34.7972 32.4711 34.0959V31.4517H35.0803C35.7723 31.4517 36.436 31.1731 36.9253 30.6773C37.4147 30.1814 37.6896 29.5088 37.6896 28.8076C37.6896 28.1063 37.4147 27.4337 36.9253 26.9379C36.436 26.442 35.7723 26.1634 35.0803 26.1634H32.4711V23.5192C32.4711 22.818 32.1962 22.1454 31.7068 21.6495C31.2175 21.1536 30.5538 20.8751 29.8618 20.8751C29.1698 20.8751 28.5061 21.1536 28.0168 21.6495C27.5275 22.1454 27.2526 22.818 27.2526 23.5192V26.1634H24.6433C23.9513 26.1634 23.2876 26.442 22.7983 26.9379C22.309 27.4337 22.0341 28.1063 22.0341 28.8076C22.0341 29.5088 22.309 30.1814 22.7983 30.6773C23.2876 31.1731 23.9513 31.4517 24.6433 31.4517ZM52.4753 56.1306H51.6056V55.2492C51.6056 54.548 51.3307 53.8754 50.8413 53.3795C50.352 52.8836 49.6883 52.6051 48.9963 52.6051C48.3043 52.6051 47.6406 52.8836 47.1513 53.3795C46.662 53.8754 46.3871 54.548 46.3871 55.2492V56.1306H45.5173C44.8253 56.1306 44.1616 56.4092 43.6723 56.9051C43.183 57.401 42.9081 58.0735 42.9081 58.7748C42.9081 59.4761 43.183 60.1486 43.6723 60.6445C44.1616 61.1404 44.8253 61.4189 45.5173 61.4189H46.3871V62.3003C46.3871 63.0016 46.662 63.6742 47.1513 64.17C47.6406 64.6659 48.3043 64.9445 48.9963 64.9445C49.6883 64.9445 50.352 64.6659 50.8413 64.17C51.3307 63.6742 51.6056 63.0016 51.6056 62.3003V61.4189H52.4753C53.1673 61.4189 53.831 61.1404 54.3203 60.6445C54.8097 60.1486 55.0846 59.4761 55.0846 58.7748C55.0846 58.0735 54.8097 57.401 54.3203 56.9051C53.831 56.4092 53.1673 56.1306 52.4753 56.1306ZM60.7684 32.9567L30.475 63.6533C29.6595 64.4794 28.5536 64.9436 27.4004 64.9436C26.2473 64.9436 25.1414 64.4794 24.3259 63.6533L19.8271 59.0965C19.4231 58.6872 19.1026 58.2013 18.8839 57.6666C18.6653 57.1318 18.5527 56.5586 18.5527 55.9797C18.5527 55.4008 18.6653 54.8276 18.8839 54.2928C19.1026 53.758 19.4231 53.2721 19.8271 52.8629L50.1205 22.1663C50.936 21.3401 52.0419 20.876 53.195 20.876C54.3482 20.876 55.4541 21.3401 56.2696 22.1663L60.7684 26.7231C61.1724 27.1323 61.4929 27.6182 61.7115 28.153C61.9302 28.6878 62.0427 29.261 62.0427 29.8399C62.0427 30.4188 61.9302 30.992 61.7115 31.5268C61.4929 32.0616 61.1724 32.5475 60.7684 32.9567ZM47.0394 39.3842L43.7778 36.079L24.1323 55.9786L27.3939 59.2838L47.0394 39.3842ZM56.4566 29.841L53.195 26.5358L47.4743 32.3331L50.7358 35.6383L56.4566 29.841Z"
                  fill="#FAFAFA"
                />
              </svg>
            </button>
          </div>
        </div>

        {isAddMonitorOpen && <AddMonitorModal isAddMonitorOpen={isAddMonitorOpen} setIsAddMonitorOpen={setIsAddMonitorOpen} />}
      </section>
    </>
  );
}

function MonitorItem({ data }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteMonitorItem = () => {
    toast.error("This feature not avalaible");
  };

  return (
    <div
      className="border-b border-gcNeutrals-200 pb-2 mb-3 flex justify-between items-center transition duration-300 cursor-pointer relative"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/my/monitor/${data.id}`);
      }}
    >
      <div>
        <h2 className="gcContentAccent5p font-semibold text-gcPrimary-1000">{data.name}</h2>
        <p className="gcContentBody6p text-gcSecondary-600">{data.information}</p>
      </div>
      <div className="relative z-20 flex xl:gap-8 lg:gap-7 md:gap-6 sm:gap-5 gap-4 items-center">
        <button
          type="button"
          disabled={isLoading}
          className="group"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteMonitorItem();
          }}
        >
          <svg className="xl:w-10 xl:h-10 lg:w-9 lg:h-9 md:w-8 md:h-8 sm:w-7 sm:h-7 h-6 w-6 transition" width="45" height="57" viewBox="0 0 45 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.375 3.5H33.4375L30.3125 0.375H14.6875L11.5625 3.5H0.625V9.75H44.375M3.75 50.375C3.75 52.0326 4.40848 53.6223 5.58058 54.7944C6.75268 55.9665 8.3424 56.625 10 56.625H35C36.6576 56.625 38.2473 55.9665 39.4194 54.7944C40.5915 53.6223 41.25 52.0326 41.25 50.375V12.875H3.75V50.375Z"
              fill="#AAB9C5"
              className="group-hover:fill-gcSecondary-600 transition"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
