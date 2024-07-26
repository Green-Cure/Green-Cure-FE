"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

function getInitialIsMobile() {
  let initialIsMobile = false;
  if (typeof window !== "undefined") {
    initialIsMobile = window.innerWidth;
  }
  return initialIsMobile < 768;
}

export default function AuthLayout({ children }) {
  const [isMobile, setIsMobile] = useState(getInitialIsMobile());
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
      <div className="min-h-screen grid grid-rows-[auto-1fr-auto] md:bg-gradient-to-br from-gcNeutrals-baseWhite to-gcPrimary-basePrimary">
        {!isMobile && <Navbar />}
        <main className={isMobile ? "bg-gradient-to-b from-gcPrimary-500 to-gcPrimary-600" : "flex pr-0 xl:pr-9 justify-between"}>{children}</main>
        {!isMobile && <Footer />}
      </div>
    </>
  );
}
