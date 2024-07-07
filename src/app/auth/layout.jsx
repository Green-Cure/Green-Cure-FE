"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

export default function AuthLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <>
      <div className="min-h-screen">
        {!isMobile && <Navbar />}
        <div className={!isMobile && "flex pr-0 xl:pr-9 justify-between"}>
          {!isMobile && (
            <div className="rounded-br-[70px] md:w-1/2 mt-16 lg:max-w-screen-lg">
              <img className="w-full rounded-br-[70px]" src="https://placehold.co/1000x800" alt="Hero Image" />
            </div>
          )}
          {children}
        </div>
        {!isMobile && <Footer />}
      </div>
    </>
  );
}
