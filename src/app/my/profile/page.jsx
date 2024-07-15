"use client";

import React, { useState } from "react";
import LoggedInNavbar from "../LoggedInNavbar";
import ProfileTopBar from "./ProfileTopBar";
import ProfileDataSection from "./ProfileDataSection";
import ProfileNavbar from "./ProfileNavbar";
import ProfilePostCard from "./ProfilePostCard";

export default function Profile() {
  const [showProfileNavbar, setShowProfileNavbar] = useState("1");

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10">
        <ProfileTopBar />
        <ProfileDataSection />
        <ProfileNavbar showProfileNavbar={showProfileNavbar} />
        {showProfileNavbar == "1" && <ProfilePostCard />}
      </section>
    </>
  );
}
