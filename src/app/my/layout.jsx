"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRole } from "../utils/getRole";

export default function MyLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let role = localStorage.getItem("role");

    if (!token) {
      if (pathname != "/my/article" && pathname != "/my/library") {
        router.push("/auth/login");
        return;
      }
    }

    if (!role && pathname != "/my/article" && pathname != "/my/library" && token) {
      role = getRole();
    }

    if (role && token) {
      if (role != "2" && role != "3") {
        router.push("/dashboard");
        return;
      }
    }

    setLoading(false);
  }, [router, pathname]);

  useEffect(() => {
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
  });

  return <>{loading ? "Loading..." : children}</>;
}
