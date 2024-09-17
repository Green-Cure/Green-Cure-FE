"use client";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hostNoPrefix } from "@/app/utils/urlApi";
import request from "@/app/utils/request";
import toast from "react-hot-toast";
import LoggedInNavbar from "@/app/my/LoggedInNavbar";

const DetailLibrary = ({ params }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request
      .get(`${params.type}/${params.id}`)
      .then(function (response) {
        if (
          response.data?.statusCode === 200 ||
          response.data?.statusCode === 201
        ) {
          if (response.data.data) {
            setData(response.data.data);
          } else {
            setData(null);
          }
          setIsLoading(false);
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setIsLoading(false);
      });
  }, [data]);

  if (data && !isLoading) {
    return (
      <>
        <LoggedInNavbar />
        <section className="sm:ml-12 md:ml-16 lg:ml-20">
          <div className="relative sm:rounded-br-[200px] rounded-br-[70px] overflow-hidden">
            <img
              src={`${hostNoPrefix}uploads/${data.image}`}
              alt={data.name}
              className="object-cover bg-cover object-center w-full h-[350px] sm:h-[400px]"
            />
            <div className="bg-gradient-to-br from-transparent to-gcPrimary-900 w-full absolute top-0 bottom-0 left-0 right-0 inset-0 opacity-100 rounded-br-[70px]"></div>
            <div className="absolute z-10 top-0 w-full px-3 pt-5 sm:left-9">
              <div className="flex gap-8 border-b border-gcNeutrals-baseWhite pb-2 sm:border-0 sm:gap-10">
                <svg
                  onClick={() => router.back()}
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative left-3 sm:scale-150 sm:top-6 cursor-pointer"
                >
                  <g clipPath="url(#clip0_82_979)">
                    <path
                      d="M10.1736 17.1074L9.34788 16.2817L7.37737 14.3112L4.98381 11.9177L2.9261 9.85997C2.59211 9.52599 2.2637 9.18829 1.92415 8.85802L1.9093 8.84317V10.155L2.73499 9.32931L4.70549 7.3588L7.09905 4.96525L9.15676 2.90753C9.49075 2.57355 9.82844 2.24327 10.1587 1.90558L10.1736 1.89073C10.3424 1.72189 10.4445 1.47325 10.4445 1.2339C10.4445 1.00567 10.3443 0.734776 10.1736 0.577062C9.99729 0.415636 9.76536 0.29503 9.51672 0.306163C9.26995 0.317296 9.03801 0.400792 8.85989 0.577062L8.0342 1.40275L6.0637 3.37325L3.67014 5.76681L1.61243 7.82452C1.27844 8.15851 0.940747 8.48878 0.610474 8.82648L0.59563 8.84132C0.241235 9.19571 0.241235 9.79874 0.59563 10.1531C0.872095 10.4315 1.14856 10.7061 1.42317 10.9825L3.39368 12.953L5.78723 15.3466L7.84495 17.4043C8.17893 17.7383 8.5092 18.076 8.8469 18.4063L8.86174 18.4211C9.03059 18.59 9.27922 18.692 9.51858 18.692C9.7468 18.692 10.0177 18.5918 10.1754 18.4211C10.3368 18.2448 10.4574 18.0129 10.4463 17.7643C10.4333 17.5175 10.3517 17.2856 10.1736 17.1074Z"
                      fill="#FAFAFA"
                    />
                    <path
                      d="M1.24876 10.4277H17.0796C17.293 10.4277 17.5082 10.4296 17.7216 10.4277H17.7494C17.9869 10.4277 18.2374 10.3238 18.4063 10.1568C18.5677 9.99541 18.6883 9.73193 18.6772 9.5C18.666 9.26065 18.5881 9.01201 18.4063 8.84316C18.2244 8.67617 18.0018 8.57227 17.7494 8.57227H1.91858C1.7052 8.57227 1.48997 8.57041 1.27659 8.57227H1.24876C1.01126 8.57227 0.760771 8.67617 0.591924 8.84316C0.430498 9.00459 0.309892 9.26807 0.321025 9.5C0.332158 9.73936 0.410088 9.98799 0.591924 10.1568C0.775615 10.322 0.998271 10.4277 1.24876 10.4277Z"
                      fill="#FAFAFA"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_82_979">
                      <rect width="19" height="19" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h1 className="text-[20px] top-6 font-bold text-[#fafafa] sm:text-[40px]">
                  Perpustakaan
                </h1>
              </div>
            </div>
            <div className="absolute bottom-0 mx-14 mb-5 sm:pl-12">
              <h1 className="font-semibold text-[36px] text-gcNeutrals-baseWhite sm:text-[70.93px]">
                {data.name}
              </h1>
              <h3 className="italic text-[16px]  text-gcNeutrals-baseWhite sm:text-[30.53px] -mt-2">
                {data.latin}
              </h3>
            </div>
          </div>

          <div className="px-6 mt-8 sm:px-24 text-gcPrimary-1000 text-lg sm:text-xl">
            {data.description}
          </div>

          <div className="w-16 h-16 rounded-full cursor-pointer bg-gcPrimary-1000 flex justify-center items-center fixed z-50 right-6 bottom-20 sm:right-20 sm:w-24 sm:h-24">
            <svg
              width="24"
              height="32"
              viewBox="0 0 30 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 sm:w-12 sm:h-12"
            >
              <path
                d="M25.5 0.191223H4.5C2.019 0.191223 0 2.51542 0 5.37146V38.1796C8.59135e-05 38.5029 0.0789748 38.8196 0.227692 39.0937C0.376409 39.3679 0.588982 39.5885 0.841229 39.7304C1.09348 39.8724 1.37527 39.93 1.65455 39.8967C1.93383 39.8634 2.19938 39.7405 2.421 39.542L15 28.2802L27.579 39.542C27.8003 39.7412 28.0659 39.8644 28.3452 39.8977C28.6246 39.931 28.9065 39.873 29.1585 39.7303C29.4108 39.5884 29.6234 39.3678 29.7722 39.0937C29.9209 38.8196 29.9999 38.5029 30 38.1796V5.37146C30 2.51542 27.981 0.191223 25.5 0.191223ZM27 34.6502L15.921 24.73C15.658 24.4937 15.3339 24.3652 15.0003 24.3649C14.6666 24.3646 14.3424 24.4925 14.079 24.7283L3 34.6502V5.37146C3 4.42002 3.6735 3.64472 4.5 3.64472H25.5C26.3265 3.64472 27 4.42002 27 5.37146V34.6502Z"
                fill="#FAFAFA"
              />
            </svg>
          </div>
        </section>
      </>
    );
  }

  if (!isLoading) {
    return notFound();
  }
};

export default DetailLibrary;
