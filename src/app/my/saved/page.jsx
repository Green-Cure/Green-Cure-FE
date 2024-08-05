"use client";

import LoggedInNavbar from "../LoggedInNavbar";
import PostCard from "../PostCard";
import TopBar from "../TopBar";

export default function MySaved() {
  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10">
        <TopBar pageName={"Saved"} />
        <div className="sm:mx-0 mx-4 mb-20">
          <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">Coming Soon</h1>
        </div>
      </section>
    </>
  );
}
