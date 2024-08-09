"use client";

import { UserContext } from "@/contexts/UserContext";
import MyScarecrowChat from "./ScarecrowChat";
import MyScarecrowHistory from "./ScarecrowHistory";
import { useContext, useEffect, useState } from "react";
import { getUserData } from "@/app/utils/getUserData";

export default function MyScarecrow() {
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (!userData) {
      const data = getUserData();
      if (data) {
        data.then(
          (response) => {
            setUserData(response);
            setIsloading(false);
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        setIsloading(false);
        setUserData(null);
      }
    } else {
      setIsloading(false);
    }
  }, [userData, setUserData]);

  return (
    <>
      {!isLoading && (
        <div className="flex xl:gap-2 md:gap-1 h-full md:mt-8 mt-3">
          <MyScarecrowHistory />
          <MyScarecrowChat userData={userData} />
        </div>
      )}
    </>
  );
}
