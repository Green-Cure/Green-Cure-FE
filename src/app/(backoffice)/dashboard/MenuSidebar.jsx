"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MenuSidebar = ({ href, icon, title }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link href={href} className={`flex items-center p-2 text-gcPrimary-1000 rounded-lg hover:bg-gray-100 group ${isActive ? "bg-gray-100" : ""}`}>
      <div className={`w-5 h-5 transition duration-75 group-hover:text-gcPrimary-1000 flex items-center ${isActive ? "text-gcPrimary-1000" : "text-gcNeutrals-baseWhite"}`}>{icon}</div>
      <span className={`ms-3 group-hover:text-gcPrimary-1000 ${isActive ? "text-gcPrimary-1000" : "text-gcNeutrals-baseWhite"}`}>{title}</span>
    </Link>
  );
};

export default MenuSidebar;
