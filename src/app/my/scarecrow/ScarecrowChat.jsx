"use client";

import request from "@/app/utils/request";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { remark } from "remark";

export default function MyScarecrowChat({ userData, showChatId, isHistoryOpen, getHistoryData, setShowChatId }) {
  const [prompt, setPrompt] = useState("");
  const [chatData, setChatData] = useState(null);
  const [isLoading, setIsLoading] = useState(!!showChatId);
  const [errors, setErrors] = useState({
    question: "",
  });

  useEffect(() => {
    if (showChatId) {
      setIsLoading(true);
      request
        .get(`scarecrow/${showChatId}`)
        .then(function (response) {
          if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
            if (response.data.data) {
              setChatData(response.data.data);
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
    }
    if (!showChatId) {
      setChatData(null);
      setPrompt("");
    }
  }, [showChatId]);

  const handlePromptSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    request
      .post(`scarecrow`, {
        text: prompt,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setChatData(res.data.data);
          setShowChatId(res.data.data.id);
          setErrors({
            question: "",
          });
          getHistoryData();
        } else if (res.data?.statusCode === 422) {
          const newErrors = {
            question: "",
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
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <section className={`xl:w-4/5 sm:w-2/3 sm:pl-3 lg:pl-4 sm:px-0 px-4 relative w-full ${isHistoryOpen && "hidden"}`}>
        <div>
          <div className="relative before:hidden sm:before:block before:absolute before:left-0 before:top-0 before:transform before:w-0.5 before:h-[80vh] before:bg-gcSecondary-500 before:rounded-xl xl:pl-10 lg:pl-8 md:pl-7 sm:pl-6 h-[80vh] mb-20">
            {isLoading && (
              <div className="flex justify-center items-center m-auto h-full w-full">
                <div className="flex flex-row gap-2">
                  <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce"></div>
                  <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            )}

            {!isLoading && (
              <div className="flex flex-col lg:gap-5 sm:gap-3 gap-3 mb-10">
                <div className="flex flex-row justify-between w-full xl:gap-5 lg:gap-4 md:gap-3 gap-2">
                  <div className="bg-gcSecondary-200 bg-gradient-to-r from-gcSecondary-200 to-gcSecondary-200 sm:py-5 lg:px-8 md:px-6 sm:px-5 p-5 rounded-3xl w-full">
                    <p className="gcContentBody6p text-gcPrimary-1000 text-justify">{!showChatId && !chatData ? "Please enter your prompt first" : chatData?.question}</p>
                  </div>
                  <img
                    className="rounded-full object-cover object-center lg:w-11 lg:h-11 md:w-10 md:h-10 sm:w-9 sm:h-9 h-8 w-8 mt-2"
                    src={userData.avatar ? `${host}/uploads${userData.avatar}` : "/avatars/default-avatar.svg"}
                    alt="Profile Avatar"
                  />
                </div>

                <div className="flex flex-row justify-between w-full xl:gap-5 lg:gap-4 md:gap-3 gap-2">
                  <div className="bg-gcPrimary-700 rounded-full p-2 md:p-3 w-max h-max">
                    <svg className="lg:w-8 lg:h-8 md:w-7 md:h-7 sm:w-7 sm:h-7 h-6 w-6" width="49" height="44" viewBox="0 0 49 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M48.6139 27.1846C48.6139 27.8823 48.3404 28.5515 47.8535 29.0448C47.3667 29.5382 46.7064 29.8154 46.0179 29.8154H43.4218V32.4462C43.4218 33.1439 43.1483 33.813 42.6615 34.3064C42.1746 34.7998 41.5143 35.0769 40.8258 35.0769C40.1373 35.0769 39.477 34.7998 38.9901 34.3064C38.5033 33.813 38.2298 33.1439 38.2298 32.4462V29.8154H35.6337C34.9452 29.8154 34.2849 29.5382 33.7981 29.0448C33.3112 28.5515 33.0377 27.8823 33.0377 27.1846C33.0377 26.4869 33.3112 25.8177 33.7981 25.3244C34.2849 24.831 34.9452 24.5538 35.6337 24.5538H38.2298V21.9231C38.2298 21.2254 38.5033 20.5562 38.9901 20.0628C39.477 19.5695 40.1373 19.2923 40.8258 19.2923C41.5143 19.2923 42.1746 19.5695 42.6615 20.0628C43.1483 20.5562 43.4218 21.2254 43.4218 21.9231V24.5538H46.0179C46.7064 24.5538 47.3667 24.831 47.8535 25.3244C48.3404 25.8177 48.6139 26.4869 48.6139 27.1846ZM6.21207 10.5231H8.8081V13.1538C8.8081 13.8516 9.08161 14.5207 9.56846 15.0141C10.0553 15.5074 10.7156 15.7846 11.4041 15.7846C12.0926 15.7846 12.7529 15.5074 13.2398 15.0141C13.7266 14.5207 14.0002 13.8516 14.0002 13.1538V10.5231H16.5962C17.2847 10.5231 17.945 10.2459 18.4319 9.75254C18.9187 9.25918 19.1922 8.59003 19.1922 7.89231C19.1922 7.19458 18.9187 6.52544 18.4319 6.03207C17.945 5.53871 17.2847 5.26154 16.5962 5.26154H14.0002V2.63077C14.0002 1.93305 13.7266 1.2639 13.2398 0.770535C12.7529 0.27717 12.0926 0 11.4041 0C10.7156 0 10.0553 0.27717 9.56846 0.770535C9.08161 1.2639 8.8081 1.93305 8.8081 2.63077V5.26154H6.21207C5.52356 5.26154 4.86325 5.53871 4.3764 6.03207C3.88955 6.52544 3.61604 7.19458 3.61604 7.89231C3.61604 8.59003 3.88955 9.25918 4.3764 9.75254C4.86325 10.2459 5.52356 10.5231 6.21207 10.5231ZM33.903 35.0769H33.0377V34.2C33.0377 33.5023 32.7642 32.8331 32.2773 32.3398C31.7905 31.8464 31.1302 31.5692 30.4417 31.5692C29.7532 31.5692 29.0929 31.8464 28.606 32.3398C28.1192 32.8331 27.8456 33.5023 27.8456 34.2V35.0769H26.9803C26.2918 35.0769 25.6315 35.3541 25.1446 35.8475C24.6578 36.3408 24.3843 37.01 24.3843 37.7077C24.3843 38.4054 24.6578 39.0746 25.1446 39.5679C25.6315 40.0613 26.2918 40.3385 26.9803 40.3385H27.8456V41.2154C27.8456 41.9131 28.1192 42.5823 28.606 43.0756C29.0929 43.569 29.7532 43.8462 30.4417 43.8462C31.1302 43.8462 31.7905 43.569 32.2773 43.0756C32.7642 42.5823 33.0377 41.9131 33.0377 41.2154V40.3385H33.903C34.5916 40.3385 35.2519 40.0613 35.7387 39.5679C36.2256 39.0746 36.4991 38.4054 36.4991 37.7077C36.4991 37.01 36.2256 36.3408 35.7387 35.8475C35.2519 35.3541 34.5916 35.0769 33.903 35.0769ZM42.1541 12.0204L12.0142 42.5615C11.2028 43.3835 10.1025 43.8452 8.9552 43.8452C7.80791 43.8452 6.7076 43.3835 5.89622 42.5615L1.42023 38.0278C1.01827 37.6206 0.69941 37.1372 0.481863 36.6051C0.264315 36.073 0.152344 35.5027 0.152344 34.9268C0.152344 34.3508 0.264315 33.7805 0.481863 33.2484C0.69941 32.7163 1.01827 32.2329 1.42023 31.8257L31.5601 1.28469C32.3715 0.462704 33.4718 0.000936237 34.6191 0.000936237C35.7664 0.000936237 36.8667 0.462704 37.6781 1.28469L42.1541 5.81838C42.5561 6.22556 42.8749 6.70899 43.0925 7.24107C43.31 7.77316 43.422 8.34346 43.422 8.9194C43.422 9.49535 43.31 10.0657 43.0925 10.5977C42.8749 11.1298 42.5561 11.6133 42.1541 12.0204ZM28.4947 18.4154L25.2496 15.1269L5.70368 34.9257L8.94872 38.2141L28.4947 18.4154ZM37.8642 8.9205L34.6191 5.63204L28.9273 11.4L32.1724 14.6885L37.8642 8.9205Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>

                  <div className="bg-gradient-to-r from-gcPrimary-200 to-gcPrimary-100 sm:py-5 lg:px-8 md:px-6 sm:px-5 p-4 rounded-3xl flex flex-col w-full mb-20">
                    <ScarecrowDetail answer={!showChatId && !chatData ? "Please enter your prompt first" : chatData?.answer} />
                  </div>
                </div>
              </div>
            )}

            {!showChatId && !isLoading && !chatData && (
              <div className="absolute w-full xl:pr-10 lg:pr-8 md:pr-7 sm:pr-6 z-40 bottom-0">
                <div className="w-full bg-gradient-to-b from-gcPrimary-600 to-gcPrimary-700  rounded-3xl p-4 sm:p-5 flex flex-col gap-3 ">
                  <div className="flex flex-row justify-between">
                    <h2 className="text-gcNeutrals-baseWhite gcHeading3p">Scarecrow</h2>
                    <svg className="lg:w-7 lg:h-7 md:w-6 md:h-6 w-5 h-5" width="49" height="44" viewBox="0 0 49 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M48.6139 27.1846C48.6139 27.8823 48.3404 28.5515 47.8535 29.0448C47.3667 29.5382 46.7064 29.8154 46.0179 29.8154H43.4218V32.4462C43.4218 33.1439 43.1483 33.813 42.6615 34.3064C42.1746 34.7998 41.5143 35.0769 40.8258 35.0769C40.1373 35.0769 39.477 34.7998 38.9901 34.3064C38.5033 33.813 38.2298 33.1439 38.2298 32.4462V29.8154H35.6337C34.9452 29.8154 34.2849 29.5382 33.7981 29.0448C33.3112 28.5515 33.0377 27.8823 33.0377 27.1846C33.0377 26.4869 33.3112 25.8177 33.7981 25.3244C34.2849 24.831 34.9452 24.5538 35.6337 24.5538H38.2298V21.9231C38.2298 21.2254 38.5033 20.5562 38.9901 20.0628C39.477 19.5695 40.1373 19.2923 40.8258 19.2923C41.5143 19.2923 42.1746 19.5695 42.6615 20.0628C43.1483 20.5562 43.4218 21.2254 43.4218 21.9231V24.5538H46.0179C46.7064 24.5538 47.3667 24.831 47.8535 25.3244C48.3404 25.8177 48.6139 26.4869 48.6139 27.1846ZM6.21207 10.5231H8.8081V13.1538C8.8081 13.8516 9.08161 14.5207 9.56846 15.0141C10.0553 15.5074 10.7156 15.7846 11.4041 15.7846C12.0926 15.7846 12.7529 15.5074 13.2398 15.0141C13.7266 14.5207 14.0002 13.8516 14.0002 13.1538V10.5231H16.5962C17.2847 10.5231 17.945 10.2459 18.4319 9.75254C18.9187 9.25918 19.1922 8.59003 19.1922 7.89231C19.1922 7.19458 18.9187 6.52544 18.4319 6.03207C17.945 5.53871 17.2847 5.26154 16.5962 5.26154H14.0002V2.63077C14.0002 1.93305 13.7266 1.2639 13.2398 0.770535C12.7529 0.27717 12.0926 0 11.4041 0C10.7156 0 10.0553 0.27717 9.56846 0.770535C9.08161 1.2639 8.8081 1.93305 8.8081 2.63077V5.26154H6.21207C5.52356 5.26154 4.86325 5.53871 4.3764 6.03207C3.88955 6.52544 3.61604 7.19458 3.61604 7.89231C3.61604 8.59003 3.88955 9.25918 4.3764 9.75254C4.86325 10.2459 5.52356 10.5231 6.21207 10.5231ZM33.903 35.0769H33.0377V34.2C33.0377 33.5023 32.7642 32.8331 32.2773 32.3398C31.7905 31.8464 31.1302 31.5692 30.4417 31.5692C29.7532 31.5692 29.0929 31.8464 28.606 32.3398C28.1192 32.8331 27.8456 33.5023 27.8456 34.2V35.0769H26.9803C26.2918 35.0769 25.6315 35.3541 25.1446 35.8475C24.6578 36.3408 24.3843 37.01 24.3843 37.7077C24.3843 38.4054 24.6578 39.0746 25.1446 39.5679C25.6315 40.0613 26.2918 40.3385 26.9803 40.3385H27.8456V41.2154C27.8456 41.9131 28.1192 42.5823 28.606 43.0756C29.0929 43.569 29.7532 43.8462 30.4417 43.8462C31.1302 43.8462 31.7905 43.569 32.2773 43.0756C32.7642 42.5823 33.0377 41.9131 33.0377 41.2154V40.3385H33.903C34.5916 40.3385 35.2519 40.0613 35.7387 39.5679C36.2256 39.0746 36.4991 38.4054 36.4991 37.7077C36.4991 37.01 36.2256 36.3408 35.7387 35.8475C35.2519 35.3541 34.5916 35.0769 33.903 35.0769ZM42.1541 12.0204L12.0142 42.5615C11.2028 43.3835 10.1025 43.8452 8.9552 43.8452C7.80791 43.8452 6.7076 43.3835 5.89622 42.5615L1.42023 38.0278C1.01827 37.6206 0.69941 37.1372 0.481863 36.6051C0.264315 36.073 0.152344 35.5027 0.152344 34.9268C0.152344 34.3508 0.264315 33.7805 0.481863 33.2484C0.69941 32.7163 1.01827 32.2329 1.42023 31.8257L31.5601 1.28469C32.3715 0.462704 33.4718 0.000936237 34.6191 0.000936237C35.7664 0.000936237 36.8667 0.462704 37.6781 1.28469L42.1541 5.81838C42.5561 6.22556 42.8749 6.70899 43.0925 7.24107C43.31 7.77316 43.422 8.34346 43.422 8.9194C43.422 9.49535 43.31 10.0657 43.0925 10.5977C42.8749 11.1298 42.5561 11.6133 42.1541 12.0204ZM28.4947 18.4154L25.2496 15.1269L5.70368 34.9257L8.94872 38.2141L28.4947 18.4154ZM37.8642 8.9205L34.6191 5.63204L28.9273 11.4L32.1724 14.6885L37.8642 8.9205Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <form method="post" onSubmit={(e) => handlePromptSubmit(e)}>
                    <input
                      type="text"
                      required
                      value={prompt}
                      onChange={(e) => {
                        setPrompt(e.target.value);
                      }}
                      placeholder="Enter your prompt...."
                      className="focus:bg-gcNeutrals-baseWhite outline-none border-none w-full rounded-lg py-3 px-5 gcContentBody3p"
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const ScarecrowDetail = ({ answer }) => {
  return <div className="gcContentBody7p text-gcPrimary-1000 text-justify" dangerouslySetInnerHTML={{ __html: answer }} />;
};
