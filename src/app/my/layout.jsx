"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyLayout({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     router.push("/auth/login");
  //   }
  // }, [router]);

  return <>{children}</>;
}
