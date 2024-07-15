"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfileTopBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex justify-between border-b border-b-[#A09CAB] lg:py-4 md:py-3 py-2 sm:mx-0 mx-4">
      <Link href={"#"} className="flex justify-center items-center lg:gap-6 gap-3">
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

        <h2 className="gcHeading3p text-gcPrimary-1000">Profile</h2>
      </Link>
      <div className="flex justify-center items-center">
        <div className="hidden sm:flex xl:gap-16 lg:gap-10 md:gap-8 gap-3 justify-center items-center">
          <ul className="flex xl:gap-16 lg:gap-10 md:gap-8 gap-3 justify-center items-center gcBody2p text-gcSecondary-500">
            <li className="relative">
              <Link
                href={"#"}
                className="md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcSecondary-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-medium"
              >
                Help
              </Link>
            </li>
            <li className="relative">
              <Link
                href={"#"}
                className="md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcSecondary-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-medium"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="relative">
              <Link
                href={"#"}
                className="md:hover:bg-transparent after:block after:content-[''] after:absolute after:h-[3px] after:bg-gcSecondary-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-medium"
              >
                Log Out
              </Link>
            </li>
          </ul>
          <button className="bg-gradient-to-r from-gcPrimary-700 to-gcPrimary-600 py-1.5 lg:px-5 px-3 rounded-xl gcContentAccent1p text-gcNeutrals-baseWhite gcDropShadow hover:from-gcPrimary-600 hover:to-gcPrimary-700 transition-all duration-500">
            Go to Premium
          </button>
        </div>
        <div className="relative">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gcPrimary-1000"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg className="w-5 h-5 gcDropShadow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <ul className={`${isNavOpen ? "" : "hidden"} absolute transition -bottom-100 right-0 left-100 flex flex-col bg-gcPrimary-200 gap-3 w-28 gcContentAccent1p text-gcPrimary-1000 text-right px-2 py-3 rounded-xl`}>
            <li className="relative border-b border-b-gcPrimary-1000">
              <Link href={"#"} className="hover:text-gcPrimary-900">
                Help
              </Link>
            </li>
            <li className="relative border-b border-b-gcPrimary-1000">
              <Link href={"#"} className="hover:text-gcPrimary-900">
                Privacy Policy
              </Link>
            </li>
            <li className="relative border-b border-b-gcPrimary-1000">
              <Link href={"#"} className="hover:text-gcPrimary-900">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
