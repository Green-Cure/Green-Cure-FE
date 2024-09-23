"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoggedInNavbar from "../../../LoggedInNavbar";
import { useRouter } from "next/navigation";
import request from "@/app/utils/request";
import toast from "react-hot-toast";
import { formatDate } from "@/app/utils/formatTimestamp";
import { hostNoPrefix } from "@/app/utils/urlApi";

export default function DetectionResult({ params }) {
  const router = useRouter();

  const handleBackResult = () => {
    router.push("/my/detection");
  };

  const [trending, setTrending] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detectionResult, setDetectionResult] = useState(null);

  useEffect(() => {
    request
      .get("articles/newest")
      .then((response) => {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            setTrending(response.data.data);
          }
          toast.dismiss();
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
      });
  }, []);

  useEffect(() => {
    request
      .get(`scan/result/${params.id}`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data !== null) {
            toast.dismiss();
            setIsLoading(false);
            setDetectionResult(response.data.data);
          } else {
            toast.error(response.data.message);
            setIsLoading(false);
            setDetectionResult(null);
            router.push("/my");
          }

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

  const handleAutoMonitor = (e) => {
    e.preventDefault();
    localStorage.setItem("monitor_name", detectionResult.plantDiseases[0].diseases);
    router.push("/my/monitor");
  };

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-row gap-2">
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce"></div>
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="relative xl:rounded-br-[200px] lg:rounded-br-[175px] md:rounded-br-[150px] sm:rounded-br-[125px] rounded-br-[70px] overflow-hidden">
              <img src="/images/backgroundetection.png" alt="" className="object-cover bg-cover object-center w-full h-[220px] sm:h-[200px] md:h-[250px] lg:h-[280px]" />
              <div className="bg-gradient-to-br from-transparent to-gcPrimary-900 w-full absolute top-0 bottom-0 left-0 right-0 inset-0 opacity-100 rounded-br-[70px]"></div>

              <div className="absolute z-10 w-full px-4 lg:top-4 md:top-3 top-2 sm:px-10">
                <div className="flex border-b border-gcNeutrals-baseWhite pb-2 sm:border-0 items-center lg:gap-6 gap-3">
                  <svg onClick={handleBackResult} className="xl:w-9 lg:w-8 md:w-7 w-5 cursor-pointer" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.02303 21.9982H36.5175C36.9824 21.9982 37.4514 22.0022 37.9163 21.9982H37.977C38.4945 21.9982 39.0403 21.7744 39.4082 21.4147C39.7599 21.0671 40.0227 20.4996 39.9984 20C39.9742 19.4845 39.8044 18.9489 39.4082 18.5853C39.012 18.2256 38.5268 18.0018 37.977 18.0018H3.48253C3.01759 18.0018 2.54861 17.9978 2.08367 18.0018H2.02303C1.50553 18.0018 0.959732 18.2256 0.591823 18.5853C0.240087 18.9329 -0.022705 19.5004 0.00155274 20C0.0258104 20.5155 0.195614 21.0511 0.591823 21.4147C0.992075 21.7704 1.47723 21.9982 2.02303 21.9982Z"
                      fill="#fafafa"
                    />
                    <path
                      d="M21.4053 36.5528L19.6099 34.7565L15.325 30.4696L10.1202 25.2625L5.64562 20.7859C4.91937 20.0593 4.20521 19.3246 3.46686 18.6061L3.43458 18.5738V21.4277L5.23004 19.6314L9.51494 15.3446L14.7198 10.1374L19.1943 5.66083C19.9206 4.93425 20.6549 4.21574 21.3731 3.48108L21.4053 3.44879C21.7725 3.08146 21.9944 2.54056 21.9944 2.01984C21.9944 1.52334 21.7765 0.934 21.4053 0.590891C21.022 0.239708 20.5177 -0.0226692 19.977 0.00155029C19.4404 0.0257698 18.9361 0.207416 18.5487 0.590891L16.7533 2.38717L12.4684 6.67401L7.26355 11.8812L2.78902 16.3578C2.06276 17.0843 1.32844 17.8029 0.610256 18.5375L0.577978 18.5698C-0.192659 19.3408 -0.192659 20.6527 0.577978 21.4237C1.17915 22.0292 1.78033 22.6266 2.37747 23.228L6.66238 27.5149L11.8672 32.722L16.3417 37.1986C17.068 37.9252 17.7862 38.6599 18.5205 39.3784L18.5528 39.4107C18.9199 39.778 19.4606 40 19.9811 40C20.4774 40 21.0664 39.782 21.4094 39.4107C21.7604 39.0272 22.0227 38.5226 21.9984 37.9817C21.9702 37.4448 21.7927 36.9403 21.4053 36.5528Z"
                      fill="#fafafa"
                    />
                  </svg>
                  <h1 className="gcHeading3p text-gcNeutrals-baseWhite">Tanamanmu Terindikasi</h1>
                </div>
              </div>

              <div className="absolute bottom-0 lg:mx-14 md:mx-12 sm:mx-10 mx-4 mb-5 lg:pl-12 flex md:gap-2 sm:gap-1.5 gap-1 flex-col">
                <h1 className="text-gcNeutrals-baseWhite gcHeading5p">{detectionResult.plantDiseases[0].diseases}</h1>
                <h3 className="italic gcBody1p text-gcNeutrals-baseWhite">{detectionResult.plantDiseases[0].diseases}</h3>
              </div>
            </div>

            <div className="px-4 lg:px-24 sm:px-10 md:px-12 lg:mt-8 md:mt-7 sm:mt-6 mt-5 text-gcPrimary-1000">
              <p className="indent-6 text-justify gcBody1p">{detectionResult.plantDiseases[0].description}</p>
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div>
                <div className="mt-4 px-4 lg:px-24 sm:px-10 md:px-12 sm:pt-4">
                  <h1 className="text-gcPrimary-1000 font-bold gcBody1p">Gejala</h1>

                  <div className="flex flex-col gap-2 mt-3">
                    {detectionResult &&
                      detectionResult.plantDiseases[0].symptoms.length > 0 &&
                      detectionResult.plantDiseases[0].symptoms.map((symptom, index) => {
                        return (
                          <div className="flex flex-row gap-2 text-gcPrimary-600 items-center" key={index}>
                            <div className="w-3 h-3 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 bg-gcPrimary-600 rounded-full"></div>
                            <span className="gcBody1p">{symptom}</span>
                          </div>
                        );
                      })}
                  </div>

                  <h1 className="text-gcPrimary-1000 font-bold gcBody1p md:mt-5 mt-4">Rekomendasi Pemulihan</h1>

                  <div className="flex flex-col gap-2 mt-3">
                    {detectionResult &&
                      detectionResult.plantDiseases[0].solutions.length > 0 &&
                      detectionResult.plantDiseases[0].solutions.map((solution, index) => {
                        return (
                          <div className="flex flex-row gap-2 text-gcPrimary-600 items-center" key={index}>
                            <div className="w-3 h-3 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 bg-gcPrimary-600 rounded-full"></div>
                            <span className="gcBody1p">{solution}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
                {/* Height above */}
                <div className="flex justify-center pt-6 sm:justify-normal px-4 lg:px-24 sm:px-10 md:px-12 sm:pt-10 ">
                  <button
                    onClick={(e) => handleAutoMonitor(e)}
                    className="bg-gcPrimary-600 hover:bg-gcPrimary-700 transition rounded-lg flex items-center gap-3 sm:rounded-2xl sm:gap-6 lg:px-6 lg:py-4 md:px-5 md:py-3.5 sm:px-4 sm:py-3 px-3.5 py-2.5"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-8 md:h-10 lg:h-11 xl:h-12 w-5 sm:w-8 md:w-10 lg:w-11 xl:w-12">
                      <path
                        d="M24 14.88C24 15.2619 23.8645 15.6282 23.6234 15.8982C23.3823 16.1683 23.0553 16.32 22.7143 16.32H21.4287V17.76C21.4287 18.1419 21.2932 18.5082 21.0521 18.7782C20.811 19.0483 20.484 19.2 20.143 19.2C19.8021 19.2 19.4751 19.0483 19.2339 18.7782C18.9928 18.5082 18.8574 18.1419 18.8574 17.76V16.32H17.5717C17.2308 16.32 16.9037 16.1683 16.6626 15.8982C16.4215 15.6282 16.2861 15.2619 16.2861 14.88C16.2861 14.4981 16.4215 14.1318 16.6626 13.8618C16.9037 13.5917 17.2308 13.44 17.5717 13.44H18.8574V12C18.8574 11.6181 18.9928 11.2518 19.2339 10.9818C19.4751 10.7117 19.8021 10.56 20.143 10.56C20.484 10.56 20.811 10.7117 21.0521 10.9818C21.2932 11.2518 21.4287 11.6181 21.4287 12V13.44H22.7143C23.0553 13.44 23.3823 13.5917 23.6234 13.8618C23.8645 14.1318 24 14.4981 24 14.88ZM3.00101 5.76H4.28666V7.2C4.28666 7.58191 4.42211 7.94818 4.66322 8.21823C4.90432 8.48829 5.23133 8.64 5.57231 8.64C5.91329 8.64 6.2403 8.48829 6.4814 8.21823C6.72251 7.94818 6.85796 7.58191 6.85796 7.2V5.76H8.14362C8.48459 5.76 8.8116 5.60829 9.05271 5.33823C9.29382 5.06818 9.42927 4.70191 9.42927 4.32C9.42927 3.93809 9.29382 3.57182 9.05271 3.30177C8.8116 3.03171 8.48459 2.88 8.14362 2.88H6.85796V1.44C6.85796 1.05809 6.72251 0.691819 6.4814 0.421766C6.2403 0.151714 5.91329 0 5.57231 0C5.23133 0 4.90432 0.151714 4.66322 0.421766C4.42211 0.691819 4.28666 1.05809 4.28666 1.44V2.88H3.00101C2.66003 2.88 2.33302 3.03171 2.09191 3.30177C1.85081 3.57182 1.71535 3.93809 1.71535 4.32C1.71535 4.70191 1.85081 5.06818 2.09191 5.33823C2.33302 5.60829 2.66003 5.76 3.00101 5.76ZM16.7146 19.2H16.2861V18.72C16.2861 18.3381 16.1506 17.9718 15.9095 17.7018C15.6684 17.4317 15.3414 17.28 15.0004 17.28C14.6595 17.28 14.3324 17.4317 14.0913 17.7018C13.8502 17.9718 13.7148 18.3381 13.7148 18.72V19.2H13.2862C12.9453 19.2 12.6182 19.3517 12.3771 19.6218C12.136 19.8918 12.0006 20.2581 12.0006 20.64C12.0006 21.0219 12.136 21.3882 12.3771 21.6582C12.6182 21.9283 12.9453 22.08 13.2862 22.08H13.7148V22.56C13.7148 22.9419 13.8502 23.3082 14.0913 23.5782C14.3324 23.8483 14.6595 24 15.0004 24C15.3414 24 15.6684 23.8483 15.9095 23.5782C16.1506 23.3082 16.2861 22.9419 16.2861 22.56V22.08H16.7146C17.0556 22.08 17.3826 21.9283 17.6237 21.6582C17.8648 21.3882 18.0003 21.0219 18.0003 20.64C18.0003 20.2581 17.8648 19.8918 17.6237 19.6218C17.3826 19.3517 17.0556 19.2 16.7146 19.2ZM20.8009 6.5796L5.87444 23.2968C5.47261 23.7467 4.92769 23.9995 4.35951 23.9995C3.79133 23.9995 3.24641 23.7467 2.84458 23.2968L0.627905 20.8152C0.42884 20.5923 0.270928 20.3277 0.16319 20.0365C0.0554527 19.7452 0 19.4331 0 19.1178C0 18.8025 0.0554527 18.4904 0.16319 18.1991C0.270928 17.9079 0.42884 17.6433 0.627905 17.4204L15.5543 0.7032C15.9562 0.253269 16.5011 0.000512466 17.0693 0.000512466C17.6374 0.000512466 18.1824 0.253269 18.5842 0.7032L20.8009 3.1848C20.9999 3.40767 21.1578 3.67229 21.2656 3.96354C21.3733 4.25478 21.4288 4.56695 21.4288 4.8822C21.4288 5.19745 21.3733 5.50962 21.2656 5.80086C21.1578 6.09211 20.9999 6.35673 20.8009 6.5796ZM14.0362 10.08L12.4291 8.28L2.74923 19.1172L4.3563 20.9172L14.0362 10.08ZM18.6763 4.8828L17.0693 3.0828L14.2505 6.24L15.8575 8.04L18.6763 4.8828Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                    <h1 className="text-gcNeutrals-baseWhite xl:text-2xl font-bold lg:text-xl md:text-lg sm:text-base text-sm gcDropShadow">Pantau Tanamanmu</h1>
                  </button>
                </div>
              </div>

              <div className="flex flex-col mt-7 px-4 lg:px-24 sm:px-10 md:px-12">
                <h1 className="font-bold gcBody1p text-gcPrimary-1000">Trending Articles</h1>
                {trending &&
                  trending.length > 0 &&
                  trending.map((articleDetail) => {
                    return (
                      <div key={articleDetail.id} className="flex xl:flex-row flex-col-reverse justify-between sm:justify-center xl:items-center items-start xl:py-4 py-2 border-b border-gcSecondary-400 gap-3">
                        <div className="xl:w-3/5 w-full">
                          <Link href={`/my/article/${articleDetail.slug}`} className="hover:underline text-gcPrimary-1000">
                            <h2 className="gcContentAccent1p text-gcPrimary-1000">{articleDetail.title}</h2>
                          </Link>
                          <h4 className="text-gcSecondary-600 gcContentBody2p">{formatDate(articleDetail.createdAt)}</h4>
                        </div>
                        <div className="xl:w-2/5 w-full h-40 md:h-36 sm:h-32 flex justify-center items-center rounded-xl">
                          <img className="rounded-xl object-cover object-center xl:h-36 xl:w-60 w-full h-full" src={`${hostNoPrefix}uploads/${articleDetail.image}`} alt={articleDetail.slug} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 w-14 h-14 rounded-full cursor-pointer bg-gcPrimary-1000 hover:bg-gcPrimary-900 transition flex justify-center items-center fixed z-50 right-6 bottom-20 sm:right-20">
              <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 sm:w-6 md:w-7 lg:w-8">
                <path
                  d="M25.5 0.191223H4.5C2.019 0.191223 0 2.51542 0 5.37146V38.1796C8.59135e-05 38.5029 0.0789748 38.8196 0.227692 39.0937C0.376409 39.3679 0.588982 39.5885 0.841229 39.7304C1.09348 39.8724 1.37527 39.93 1.65455 39.8967C1.93383 39.8634 2.19938 39.7405 2.421 39.542L15 28.2802L27.579 39.542C27.8003 39.7412 28.0659 39.8644 28.3452 39.8977C28.6246 39.931 28.9065 39.873 29.1585 39.7303C29.4108 39.5884 29.6234 39.3678 29.7722 39.0937C29.9209 38.8196 29.9999 38.5029 30 38.1796V5.37146C30 2.51542 27.981 0.191223 25.5 0.191223ZM27 34.6502L15.921 24.73C15.658 24.4937 15.3339 24.3652 15.0003 24.3649C14.6666 24.3646 14.3424 24.4925 14.079 24.7283L3 34.6502V5.37146C3 4.42002 3.6735 3.64472 4.5 3.64472H25.5C26.3265 3.64472 27 4.42002 27 5.37146V34.6502Z"
                  fill="#FAFAFA"
                />
              </svg>
            </div>
          </>
        )}
      </section>
    </>
  );
}
