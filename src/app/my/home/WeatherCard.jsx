"use client";

import request from "@/app/utils/request";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WeatherCard() {
  const [dataWheather, setDataWheather] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dataWheather) {
      request
        .get("weather-today")
        .then(function (response) {
          if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
            setDataWheather(response.data.data);
            return;
          } else if (response.response?.data?.statusCode === 500) {
            console.error("INTERNAL_SERVER_ERROR");
            toast.dismiss();
            toast.error("Server Error");
          } else {
            if (response.code == "ERR_NETWORK") {
              toast.error("Network Error");
              return;
            } else {
              toast.error("Something Went Wrong");
              return;
            }
          }
        })
        .catch(function (err) {
          console.log(err);
          toast.error("An unexpected error occurred");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dataWheather]);

  return (
    <>
      {!loading ? (
        dataWheather ? (
          <div
            className={`w-full h-full rounded-2xl sm:mt-0 mt-1.5 flex justify-between relative transition-all ${
              dataWheather?.condition.toLowerCase().includes("sunny")
                ? "bg-weather-radial-cerah"
                : dataWheather?.condition.toLowerCase().includes("cloudy")
                ? "bg-weather-radial-berawan"
                : dataWheather?.condition.toLowerCase().includes("rain")
                ? "bg-weather-radial-hujan"
                : dataWheather?.condition.toLowerCase().includes("storm")
                ? "bg-weather-radial-badai"
                : dataWheather?.condition.toLowerCase().includes("snowy")
                ? "bg-weather-radial-bersalju"
                : "bg-weather-radial-berawan"
            }`}
          >
            <div className="flex sm:flex-col flex-row sm:items-start items-center gap-4 sm:gap-0 m-5 lg:pr-32 md:pr-20 sm:pr-12 pr-16">
              <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-light font-Poppins text-gcNeutrals-baseWhite gcDropShadow">{dataWheather?.temperature}&deg;</h1>
              <h3 className="font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl gcDropShadow text-gcNeutrals-baseWhite capitalize">{dataWheather?.condition}</h3>
            </div>
            <img
              src={`/images/${
                dataWheather?.condition.toLowerCase().includes("sunny")
                  ? "weather-sun.png"
                  : dataWheather?.condition.toLowerCase().includes("cloudy")
                  ? "weather-clouds.png"
                  : dataWheather?.condition.toLowerCase().includes("rain")
                  ? "weather-rainy.png"
                  : dataWheather?.condition.toLowerCase().includes("storm")
                  ? "weather-thunderstorm.png"
                  : dataWheather?.condition.toLowerCase().includes("snowy")
                  ? "weather-snow.png"
                  : "weather-sun.png"
              }`}
              alt={`${dataWheather?.condition}`}
              className="place-self-end xl:h-56 lg:h-44 md:h-28 sm:h-24 h-28 absolute bottom-0 right-0"
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-2xl sm:mt-0 mt-1.5 flex justify-center items-center relative transition-all border">
            <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">Weather data is not available</h1>
          </div>
        )
      ) : (
        <div className="w-full h-full rounded-2xl sm:mt-0 mt-1.5 flex justify-center items-center relative transition-all border">
          <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">Loading...</h1>
        </div>
      )}
    </>
  );
}
