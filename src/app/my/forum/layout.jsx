"use client";

import { getUserData } from "@/app/utils/getUserData";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

export default function MyForumLayout({ children }) {
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (!userData) {
      toast.loading("Loading...");
      const data = getUserData();
      if (data) {
        data.then(
          (response) => {
            setUserData(response);
            toast.dismiss();
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        setLoading(false);
        toast.dismiss();
      }
    } else {
      toast.dismiss();
    }
  }, [userData, setUserData]);
  return children;
}
