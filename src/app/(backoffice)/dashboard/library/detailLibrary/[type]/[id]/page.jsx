"use client";

import request from "@/app/utils/request";
import { hostNoPrefix } from "@/app/utils/urlApi";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailLibrary({ params }) {
  const id = params.id;
  const router = useRouter();
  const [typeLibrary, setTypeLibrary] = useState(params.type);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!data) {
      setIsLoading(true);

      const getPlantsDatas = async () => {
        let plantData = null;
        await request
          .get(`plants/${id}`)
          .then(function (response) {
            if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
              plantData = response.data.data;
              toast.dismiss();
            } else if (response.data.statusCode === 500) {
              console.error("INTERNAL_SERVER_ERROR");
              toast.dismiss();
              router.back();
              toast.error("Server Error");
            } else {
              toast.dismiss();
              router.back();
              toast.error("An unexpected error occurred");
            }
          })
          .catch((err) => {
            console.error(err);
          });
        return plantData;
      };

      const getPlantDiseasesDatas = async () => {
        let plantDiseasesData = null;
        await request.get(`plant-diseases/${id}`).then(function (response) {
          if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
            plantDiseasesData = response.data.data;
            toast.dismiss();
          } else if (response.data.statusCode === 500) {
            console.error("INTERNAL_SERVER_ERROR");
            toast.dismiss();
            router.back();
            toast.error("Server Error");
          } else {
            toast.dismiss();
            router.back();
            toast.error("An unexpected error occurred");
          }
        });
        return plantDiseasesData;
      };

      if (params.type == "plant") {
        getPlantsDatas().then(
          (response) => {
            if (response) {
              setData({ ...response, type: "plant" });
            } else {
              router.push("/dashboard/library");
              toast.error("Not Found");
            }
            setIsLoading(false);
          },
          () => null
        );
      } else if (params.type == "plant-diseases") {
        getPlantDiseasesDatas().then(
          (response) => {
            if (response) {
              setData({ ...response, type: "plant-diseases" });
            } else {
              router.push("/dashboard/library");
              toast.error("Not Found");
            }
            setIsLoading(false);
          },
          () => null
        );
      } else {
        toast.dismiss();
        setIsLoading(false);
        toast.error("Type not valid");
        router.back();
      }
    }
  }, [id, params.type]);

  return (
    <>
      {data && !isLoading && (
        <>
          <h1 className="gcHeading7p text-gcPrimary-1000">Detail Data</h1>

          <div className="grid-cols-8 grid gap-3">
            <div className="mt-3 border rounded-xl lg:p-4 md:p-3 p-2 col-span-8">
              <h1 className="gcContentAccent1p text-gcPrimary-1000 mb-3">Thumbnail</h1>
              <img src={`${hostNoPrefix}uploads/${data.image}`} alt="Thumbnail" className="max-w-96" />
            </div>

            <div className="mt-3 border rounded-xl lg:p-4 md:p-3 p-2 col-span-8">
              <div className="grid grid-cols-6 gap-3">
                <div className={`${params.type == "plant" ? "md:col-span-3" : ""} col-span-6`}>
                  <label htmlFor="name" className="text-gcPrimary-1000 gcContentAccent1p">
                    Name
                  </label>
                  <p className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1">
                    {data.name}
                  </p>
                </div>

                {params.type == "plant" && (
                  <div className="md:col-span-3 col-span-6">
                    <label htmlFor="latin" className="text-gcPrimary-1000 gcContentAccent1p">
                      Latin
                    </label>
                    <p className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1">
                      {data.latin}
                    </p>
                  </div>
                )}

                <div className="col-span-6">
                  <label htmlFor="description" className="text-gcPrimary-1000 gcContentAccent1p">
                    Description
                  </label>
                  <p className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col border p-3 rounded-xl">
              <h1>Name: {data.name}</h1>
              {params.type == "plant" && <h1>Latin: {data.latin}</h1>}
              <h1>Description: {data.description}</h1>
            </div> */}
          </div>
        </>
      )}
    </>
  );
}
