"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  return router.push("/dashboard/overview");
}
