"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRole } from "../utils/getRole";
import toast from "react-hot-toast";
import { ArticleProvider } from "@/contexts/ArticleContext";

export default function MyLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let role = localStorage.getItem("role");

    if (!token) {
      if (!pathname.startsWith("/my/article") && !pathname.startsWith("/my/library")) {
        router.push("/auth/login");
        return;
      }
    } else {
      if (role) {
        if (role != "2" && role != "3") {
          router.push("/dashboard");
          return;
        }
      } else {
        if (!pathname.startsWith("/my/article") && !pathname.startsWith("/my/library")) {
          role = getRole();
        }
      }
    }

    setLoading(false);
  }, [router, pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", async (event) => {
        if (event.key === "token" || event.key === "role") {
          const token = localStorage.getItem("token");
          if (token) {
            const role = await getRole();
            if (role) {
              localStorage.setItem("role", role);
            }
          } else {
            localStorage.clear();
          }

          window.location.reload();
        }
      });
    }
  }, []);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...");
    } else {
      toast.dismiss();
    }
  }, [loading]);

  return (
    <>
      <ArticleProvider>{!loading && children}</ArticleProvider>
    </>
  );
}
