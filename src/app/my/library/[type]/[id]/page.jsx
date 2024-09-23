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

  const handleBackResult = () => {
    router.push("/my/library");
  };

  const handleSaved = () => {
    router.push("/my/saved");
  };

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
          setIsLoading(false); // Stop loading when data is fetched
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setIsLoading(false); // Stop loading on error
      });
  }, [params.id, params.type]);

  // Jika masih loading, tampilkan spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce"></div>
          <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-2.5 h-2.5 lg:w-4 lg:h-4 rounded-full bg-gcPrimary-basePrimary animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  // Jika data sudah tersedia, tampilkan konten
  if (data) {
    return (
      <>
        <LoggedInNavbar />
        <section className="sm:ml-12 md:ml-16 lg:ml-20">
          <div className="relative sm:rounded-br-[200px] rounded-br-[70px] overflow-hidden">
            <img
              src={`${hostNoPrefix}uploads/${data.image}`}
              alt={data.name}
              className="object-cover bg-cover object-center w-full h-[220px] sm:h-[200px] md:h-[250px] lg:h-[280px]"
            />
            <div className="bg-gradient-to-br from-transparent to-gcPrimary-900 w-full absolute top-0 bottom-0 left-0 right-0 inset-0 opacity-100 rounded-br-[70px]"></div>
            <div className="absolute z-10 w-full px-4 lg:top-4 md:top-3 top-2 sm:px-10">
              <div className="flex items-center gap-3 pb-2 border-b border-gcNeutrals-baseWhite sm:border-0 lg:gap-6">
                <svg
                  onClick={handleBackResult}
                  className="w-5 cursor-pointer xl:w-9 lg:w-8 md:w-7"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.02303 21.9982H36.5175C36.9824 21.9982 37.4514 22.0022 37.9163 21.9982H37.977C38.4945 21.9982 39.0403 21.7744 39.4082 21.4147C39.7599 21.0671 40.0227 20.4996 39.9984 20C39.9742 19.4845 39.8044 18.9489 39.4082 18.5853C39.012 18.2256 38.5268 18.0018 37.977 18.0018H3.48253C3.01759 18.0018 2.54861 17.9978 2.08367 18.0018H2.02303C1.50553 18.0018 0.959732 18.2256 0.591823 18.5853C0.240087 18.9329 -0.022705 19.5004 0.00155274 20C0.0258104 20.5155 0.195614 21.0511 0.591823 21.4147C0.992075 21.7704 1.47723 21.9982 2.02303 21.9982Z"
                    fill="#fafafa"
                  />
                  <path
                    d="M21.4053 36.5528L19.6099 34.7565L15.325 30.4696L10.1202 25.2625L5.64562 20.7859C4.91937 20.0593 4.20521 19.3246 3.46686 18.6061L3.43458 18.5738V21.4277L5.23004 19.6314L9.51494 15.3446L14.7198 10.1374L19.1943 5.66083C19.9206 4.93425 20.6549 4.21574 21.3731 3.48108L21.4053 3.44879C21.7725 3.08146 21.9944 2.54056 21.9944 2.01984C21.9944 1.52334 21.7765 0.934 21.4053 0.590891C21.022 0.239708 20.5177 -0.0226692 19.977 0.00155029C19.4404 0.0257698 18.9361 0.207416 18.5487 0.590891L16.7533 2.38717L12.4684 6.67401L7.26355 11.8812L2.78902 16.3578C2.06276 17.0843 1.32844 17.8029 0.610256 18.5375L0.577978 18.5698C-0.192659 19.3408 -0.192659 20.6527 0.577978 21.4237C1.17915 22.0292 1.78033 22.6266 2.37747 23.228L6.66238 27.5149L11.8672 32.722L16.3417 37.1986C17.068 37.9252 17.7862 38.6599 18.5205 39.3784L18.5528 39.4107C18.9199 39.778 19.4606 40 19.9811 40C20.4774 40 21.0664 39.782 21.4094 39.4107C21.7604 39.0272 22.0227 38.5226 21.9984 37.9817C21.9702 37.4448 21.7927 36.9403 21.4053 36.5528Z"
                    fill="#fafafa"
                  />
                </svg>
                <h1 className="gcHeading3p text-gcNeutrals-baseWhite">
                  Perpustakaan
                </h1>
              </div>
            </div>
            <div className="absolute bottom-0 lg:mx-14 md:mx-12 sm:mx-10 mx-4 mb-5 lg:pl-12 flex md:gap-2 sm:gap-1.5 gap-1 flex-col">
              <h1 className="text-gcNeutrals-baseWhite gcHeading5p">
                {data.name}
              </h1>
              <h3 className="italic gcBody1p text-gcNeutrals-baseWhite">
                {data.latin}
              </h3>
            </div>
          </div>

          <div className="px-4 mt-5 lg:px-24 sm:px-10 md:px-12 lg:mt-8 md:mt-7 sm:mt-6 text-gcPrimary-1000">
            <p className="text-justify indent-6 gcBody1p">{data.description}</p>
          </div>

          <div
            onClick={handleSaved}
            className="fixed z-50 flex items-center justify-center w-16 h-16 rounded-full cursor-pointer bg-gcPrimary-1000 right-6 bottom-20 sm:right-20 sm:w-24 sm:h-24"
          >
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

  // Jika tidak ada data dan tidak loading
  if (!isLoading) {
    return notFound();
  }
};

export default DetailLibrary;
