"use client";

import React, { useState } from "react";
import LoggedInNavbar from "../LoggedInNavbar";
import { useRouter } from "next/navigation";

export default function Detection() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    console.log("Summit Button Clicked!");
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
            onClick={handleSubmit}
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

        <div className="sm:flex-row flex sm:mb-4 justify-center font-bold lg:mt-6 md:mt-5 sm:mt-4 mt-3">
          <h1 className="gcHeading1p sm:text-gcPrimary-1000 text-gcNeutrals-baseWhite">Detect Your Plant Disease</h1>
        </div>

        <div className="flex justify-center relative sm:mt-10 mt-6 sm:bottom-5">
          <div
            className={`flex items-center justify-center flex-col sm:cursor-pointer border-gcPrimary-700 relative w-full xl:mx-36 lg:mx-32 md:mx-28 sm:mx-24 mx-14 xl:py-20 lg:py-16 md:py-14 sm:py-12 py-10 xl:px-10 lg:px-9 md:px-8 sm:px-7 px-6 sm:h-auto h-[50vh] group ${
              !(imageUrl && imageUrl.length > 0) && "border-dashed sm:border-gcPrimary-1000 sm:border-4 border-4"
            }`}
          >
            <div className="sm:bg-gcPrimary-1000 sm:rounded-3xl sm:flex sm:justify-center sm:items-center xl:p-7 lg:p-6 md:p-5 sm:p-4 p-3.5 h-max sm:group-hover:bg-gcPrimary-900 transition">
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
              className="w-full h-full z-50 invisible sm:visible absolute sm:top-0 sm:left-0 sm:right-0 sm:bottom-0 sm:border-2 sm:opacity-0 sm:cursor-pointer"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <div className="invisible sm:visible text-center mt-8">
              <h1 className="sm:text-gcPrimary-1000 gcHeading3p">Tap to upload an image</h1>
              <h3 className="sm:text-gcPrimary-1000 gcContentBody4p">File must be JPEG, JPG, or PNG and up to 40MB</h3>
            </div>
            {imageUrl && imageUrl.length > 0 && (
              <div className="absolute flex items-center justify-center w-full">
                <img src={imageUrl} alt="Thumbnail" className="top-0 left-0 right-0 bottom-0 object-cover h-[50vh]" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-9 sm:invisible mt-10">
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
            <path
              d="M32.0833 18.518C32.0804 20.6617 32.0643 22.4817 31.9433 23.9765C31.8018 25.712 31.5116 27.1615 30.8641 28.3647C30.5816 28.8922 30.2228 29.3752 29.7995 29.7982C28.5848 31.013 27.0389 31.5628 25.0789 31.8253C23.1641 32.0834 20.7083 32.0834 17.5773 32.0834H17.4227C14.2902 32.0834 11.8373 32.0834 9.921 31.8253C7.96246 31.5628 6.41517 31.013 5.20183 29.7982C4.12558 28.722 3.5685 27.3832 3.27392 25.7222C2.98225 24.0888 2.92975 22.0588 2.91954 19.5374C2.91663 18.8957 2.91663 18.2176 2.91663 17.5001V17.4213C2.91663 14.2888 2.91663 11.8359 3.17475 9.91966C3.43725 7.96112 3.98704 6.41383 5.20183 5.20049C6.41517 3.9857 7.96246 3.43591 9.921 3.17341C11.6243 2.94445 13.8148 2.9182 16.482 2.91528C16.752 2.91528 17.0109 3.02253 17.2018 3.21342C17.3927 3.40432 17.5 3.66323 17.5 3.9332C17.5 4.20317 17.3927 4.46208 17.2018 4.65298C17.0109 4.84387 16.752 4.95112 16.482 4.95112C13.7768 4.95403 11.7658 4.97737 10.1923 5.18883C8.45829 5.42216 7.41267 5.86549 6.63975 6.63841C5.86683 7.41132 5.42496 8.45841 5.19163 10.1938C4.95392 11.9584 4.951 14.2742 4.951 17.5001V18.6434L6.31017 17.4563C6.90594 16.9351 7.67753 16.6597 8.46871 16.6859C9.2599 16.7122 10.0115 17.0382 10.5714 17.5978L16.3902 23.4165C16.8416 23.8682 17.438 24.1462 18.0742 24.2014C18.7104 24.2566 19.3458 24.0856 19.8683 23.7184L20.2737 23.434C21.0273 22.9043 21.9384 22.646 22.8579 22.7014C23.7774 22.7568 24.651 23.1225 25.3356 23.7388L29.1754 27.1951C29.5618 26.3828 29.7923 25.3167 29.9148 23.8117C30.03 22.3942 30.046 20.6734 30.0475 18.518C30.0475 18.248 30.1547 17.9891 30.3456 17.7982C30.5365 17.6073 30.7954 17.5001 31.0654 17.5001C31.3353 17.5001 31.5943 17.6073 31.7852 17.7982C31.976 17.9891 32.0833 18.248 32.0833 18.518Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.5209 16.0417C22.4277 16.0417 20.8805 16.0417 19.9194 15.0807C18.9584 14.1197 18.9584 12.5724 18.9584 9.47925C18.9584 6.38612 18.9584 4.83883 19.9194 3.87779C20.8805 2.91675 22.4277 2.91675 25.5209 2.91675C28.614 2.91675 30.1613 2.91675 31.1223 3.87779C32.0834 4.83883 32.0834 6.38612 32.0834 9.47925C32.0834 12.5724 32.0834 14.1197 31.1223 15.0807C30.1613 16.0417 28.614 16.0417 25.5209 16.0417ZM28.4813 7.97716L26.2938 5.78966C26.0887 5.58484 25.8107 5.46979 25.5209 5.46979C25.231 5.46979 24.953 5.58484 24.748 5.78966L22.5605 7.97716C22.3673 8.1845 22.2621 8.45874 22.2671 8.74209C22.2721 9.02545 22.3869 9.2958 22.5873 9.4962C22.7877 9.69659 23.058 9.81138 23.3414 9.81638C23.6247 9.82138 23.899 9.7162 24.1063 9.523L24.4271 9.20216V12.3959C24.4271 12.686 24.5424 12.9642 24.7475 13.1693C24.9526 13.3744 25.2308 13.4897 25.5209 13.4897C25.811 13.4897 26.0892 13.3744 26.2943 13.1693C26.4994 12.9642 26.6146 12.686 26.6146 12.3959V9.20216L26.9355 9.523C27.0356 9.63046 27.1563 9.71665 27.2905 9.77643C27.4247 9.83621 27.5695 9.86835 27.7164 9.87094C27.8632 9.87354 28.0091 9.84652 28.1453 9.79151C28.2815 9.7365 28.4052 9.65462 28.5091 9.55076C28.6129 9.4469 28.6948 9.32319 28.7498 9.187C28.8048 9.0508 28.8318 8.90493 28.8292 8.75807C28.8266 8.61121 28.7945 8.46638 28.7347 8.33221C28.6749 8.19805 28.5888 8.0773 28.4813 7.97716Z"
              fill="black"
            />
          </svg>
          <button>
            <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              <circle cx="32.5926" cy="33.4075" r="25.2593" fill="" />
              <path
                d="M66 33C66 51.2254 51.2254 66 33 66C14.7746 66 0 51.2254 0 33C0 14.7746 14.7746 0 33 0C51.2254 0 66 14.7746 66 33ZM3.92048 33C3.92048 49.0602 16.9398 62.0795 33 62.0795C49.0602 62.0795 62.0795 49.0602 62.0795 33C62.0795 16.9398 49.0602 3.92048 33 3.92048C16.9398 3.92048 3.92048 16.9398 3.92048 33Z"
                fill="black"
              />
            </svg>
          </button>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
            <g clipPath="url(#clip0_783_290)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.6427 1.81325C18.4853 0.802583 20.1267 1.49325 19.9933 2.80258L19.052 11.9999H26.6667C26.92 12 27.1681 12.0723 27.3818 12.2083C27.5956 12.3443 27.7662 12.5384 27.8736 12.7678C27.9811 12.9972 28.0209 13.2525 27.9885 13.5038C27.9561 13.7551 27.8528 13.9919 27.6907 14.1866L14.3573 30.1866C13.5147 31.1973 11.8733 30.5066 12.0067 29.1973L12.948 19.9999H5.33332C5.07997 19.9998 4.83189 19.9275 4.61813 19.7916C4.40437 19.6556 4.23378 19.4615 4.12633 19.232C4.01889 19.0026 3.97903 18.7473 4.01144 18.496C4.04385 18.2448 4.14718 18.0079 4.30932 17.8133L17.6427 1.81325ZM8.17999 17.3333H15.3107C15.3852 17.3333 15.4589 17.3489 15.527 17.3791C15.5952 17.4093 15.6562 17.4535 15.7062 17.5088C15.7562 17.5641 15.7941 17.6292 15.8173 17.7C15.8406 17.7709 15.8488 17.8458 15.8413 17.9199L15.104 25.1266L23.82 14.6666H16.6893C16.6148 14.6666 16.5411 14.651 16.4729 14.6207C16.4048 14.5905 16.3438 14.5463 16.2938 14.491C16.2438 14.4357 16.2059 14.3706 16.1827 14.2998C16.1594 14.229 16.1512 14.1541 16.1587 14.0799L16.896 6.87458L8.17999 17.3333Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_783_290">
                <rect width="32" height="32" fill="black" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
}
