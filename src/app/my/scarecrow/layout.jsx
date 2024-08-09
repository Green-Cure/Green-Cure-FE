"use client";

import LoggedInNavbar from "../LoggedInNavbar";
import TopBar from "../TopBar";

export default function MyScarecrowLayout({ children }) {
  return (
    <>
      <div className="relative">
        <LoggedInNavbar />
        <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10 h-full">
          <TopBar pageName={"Ask Scarecrow"} />
          {children}
        </section>
      </div>
    </>
  );
}
