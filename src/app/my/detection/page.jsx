"use client";

import React, { useState } from "react";
import LoggedInNavbar from "../LoggedInNavbar";
import { useRouter } from "next/navigation";
import request from "@/app/utils/request";
import toast from "react-hot-toast";

export default function Detection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({
    image: "",
  });

  const handleSubmit = (e) => {
    setIsLoading(true);

    e.preventDefault();

    request
      .post("scan", {
        image: imageFile,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setImageUrl("");
          setImageFile("");
          setErrors({
            image: "",
          });
          router.push(`/my/detection/result/${res.data.data.id}`);
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            image: "",
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
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20">
        <div className="flex justify-between items-center sm:px-10 lg:py-4 md:py-3 py-2 sm:mx-0 mx-4">
          <button type="button" onClick={() => router.back()} className="flex justify-center items-center lg:gap-6 gap-3">
            <svg className="xl:w-9 lg:w-8 md:w-7 w-5" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.02303 21.9982H36.5175C36.9824 21.9982 37.4514 22.0022 37.9163 21.9982H37.977C38.4945 21.9982 39.0403 21.7744 39.4082 21.4147C39.7599 21.0671 40.0227 20.4996 39.9984 20C39.9742 19.4845 39.8044 18.9489 39.4082 18.5853C39.012 18.2256 38.5268 18.0018 37.977 18.0018H3.48253C3.01759 18.0018 2.54861 17.9978 2.08367 18.0018H2.02303C1.50553 18.0018 0.959732 18.2256 0.591823 18.5853C0.240087 18.9329 -0.022705 19.5004 0.00155274 20C0.0258104 20.5155 0.195614 21.0511 0.591823 21.4147C0.992075 21.7704 1.47723 21.9982 2.02303 21.9982Z"
                fill="#205072"
              />
              <path
                d="M21.4053 36.5528L19.6099 34.7565L15.325 30.4696L10.1202 25.2625L5.64562 20.7859C4.91937 20.0593 4.20521 19.3246 3.46686 18.6061L3.43458 18.5738V21.4277L5.23004 19.6314L9.51494 15.3446L14.7198 10.1374L19.1943 5.66083C19.9206 4.93425 20.6549 4.21574 21.3731 3.48108L21.4053 3.44879C21.7725 3.08146 21.9944 2.54056 21.9944 2.01984C21.9944 1.52334 21.7765 0.934 21.4053 0.590891C21.022 0.239708 20.5177 -0.0226692 19.977 0.00155029C19.4404 0.0257698 18.9361 0.207416 18.5487 0.590891L16.7533 2.38717L12.4684 6.67401L7.26355 11.8812L2.78902 16.3578C2.06276 17.0843 1.32844 17.8029 0.610256 18.5375L0.577978 18.5698C-0.192659 19.3408 -0.192659 20.6527 0.577978 21.4237C1.17915 22.0292 1.78033 22.6266 2.37747 23.228L6.66238 27.5149L11.8672 32.722L16.3417 37.1986C17.068 37.9252 17.7862 38.6599 18.5205 39.3784L18.5528 39.4107C18.9199 39.778 19.4606 40 19.9811 40C20.4774 40 21.0664 39.782 21.4094 39.4107C21.7604 39.0272 22.0227 38.5226 21.9984 37.9817C21.9702 37.4448 21.7927 36.9403 21.4053 36.5528Z"
                fill="#205072"
              />
            </svg>
          </button>

          <button
            disabled={isLoading}
            type="button"
            className={`bg-gcPrimary-600 hover:bg-gcPrimary-700 transition lg:py-2.5 lg:px-10 sm:py-2 sm:px-8 py-2 px-6 text-gcNeutrals-baseWhite gcContentAccent1p rounded-3xl ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={(e) => handleSubmit(e)}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              "Save"
            )}
          </button>
        </div>

        <div className="flex-row flex mb-4 justify-center font-bold lg:mt-6 md:mt-5 sm:mt-4 mt-3">
          <h1 className="gcHeading1p sm:text-gcPrimary-1000 text-gcPrimary-1000">Detect Your Plant Disease</h1>
        </div>

        <div className="flex justify-center relative sm:mt-10 mt-6 sm:bottom-5">
          <div
            className={`flex items-center justify-center flex-col sm:cursor-pointer border-gcPrimary-700 relative w-full xl:mx-36 lg:mx-32 md:mx-28 sm:mx-24 mx-14 xl:py-20 lg:py-16 md:py-14 sm:py-12 py-10 xl:px-10 lg:px-9 md:px-8 sm:px-7 px-6 sm:h-auto h-[50vh] group ${
              !(imageUrl && imageUrl.length > 0) && "border-dashed sm:border-gcPrimary-1000 sm:border-4 border-4"
            } ${isLoading ? "cursor-not-allowed" : "sm:cursor-pointer"}`}
          >
            <div className={`bg-gcPrimary-1000 rounded-3xl flex justify-center items-center xl:p-7 lg:p-6 md:p-5 sm:p-4 p-3.5 h-max group-hover:bg-gcPrimary-900 transition ${imageUrl && imageUrl.length > 0 ? "invisible" : "visible"}`}>
              <svg width="173" height="129" viewBox="0 0 173 129" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:w-32 lg:w-28 md:w-24 sm:w-20 w-16 xl:h-32 lg:h-28 md:h-24 sm:h-20 h-16 object-cover object-center">
                <path d="M110.112 87.3577L82.4428 60.5955M82.4428 60.5955L54.7734 87.3577M82.4428 60.5955V120.81" stroke="#FAFAFA" strokeWidth="16.0639" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M145.726 113.917C152.601 110.291 158.033 104.554 161.163 97.6116C164.293 90.6689 164.944 82.9155 163.012 75.5754C161.081 68.2352 156.677 61.7262 150.496 57.0757C144.315 52.4252 136.709 49.898 128.878 49.893H119.995C117.862 41.9104 113.885 34.4996 108.364 28.2176C102.842 21.9356 95.9206 16.946 88.1187 13.6238C80.3167 10.3017 71.8377 8.73341 63.3189 9.03699C54.8002 9.34056 46.4634 11.5081 38.9354 15.3765C31.4074 19.245 24.884 24.7137 19.8558 31.3717C14.8275 38.0296 11.4252 45.7034 9.90452 53.8162C8.38389 61.929 8.78455 70.2696 11.0764 78.2111C13.3682 86.1526 17.4915 93.4882 23.1364 99.6665"
                  stroke="#FAFAFA"
                  strokeWidth="16.3706"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M110.112 87.3577L82.4428 60.5955L54.7734 87.3577" stroke="#FAFAFA" strokeWidth="16.0639" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="file"
              accept={"image/*"}
              name="Scan Image"
              id="scan-image-input"
              disabled={isLoading}
              className={`w-full h-full z-50 visible absolute top-0 left-0 right-0 bottom-0 border-2 opacity-0 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <div className={`visible text-center mt-8 ${imageUrl && imageUrl.length > 0 && "opacity-0"}`}>
              <h1 className="text-gcPrimary-1000 gcHeading3p">Tap to upload an image</h1>
              <h3 className="text-gcPrimary-1000 gcContentBody4p">File must be JPEG, JPG, or PNG and up to 40MB</h3>
            </div>
            {imageUrl && imageUrl.length > 0 && (
              <div className="absolute flex items-start justify-center w-full h-full">
                <img src={imageUrl} alt="Thumbnail" className="object-cover h-[50vh]" />
              </div>
            )}
          </div>
        </div>
        {errors.image && <small className="text-red-600 text-center mx-auto flex justify-center">{errors.image}</small>}
      </section>
    </>
  );
}
