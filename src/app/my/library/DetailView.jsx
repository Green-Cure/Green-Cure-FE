"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailView() {
  const router = useRouter();
  const [item, setItem] = useState({ name: "", description: "", image: "" });

  useEffect(() => {
    if (router.query.name && router.query.description && router.query.image) {
      setItem({
        name: router.query.name,
        description: router.query.description,
        image: router.query.image,
      });
    }
  }, [router.query]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gcNeutrals-baseWhite p-6">
      <div className="w-full max-w-3xl">
        <Link href="/library" legacyBehavior>
          <a className="text-gcPrimary-1000 flex items-center mb-6 text-lg">
            <svg className="h-10 w-10 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6l-6 6 6 6M4 12h16"/>
            </svg>
            Back to Library
          </a>
        </Link>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-lg mb-6"/>
          <h2 className="text-4xl font-semibold text-gcPrimary-1000 mb-4">{item.name}</h2>
          <p className="text-gcPrimary-900 text-lg mb-4"><em>{item.description}</em></p>
          <p className="text-gcPrimary-900 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius augue non ante lacinia, vel bibendum velit ornare. Sed a eleifend nulla. Vestibulum a arcu arcu. Fusce sit amet ante non augue vehicula vehicula vel ac nibh.</p>
        </div>
      </div>
    </div>
  );
}
