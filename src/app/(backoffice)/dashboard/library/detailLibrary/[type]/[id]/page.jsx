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
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id || !params.type) {
      notFound();
    }
    setIsLoading(true);
    toast.loading("Getting data...");

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
            toast.error("Server Error");
          } else {
            toast.dismiss();
            toast.error("An unexpected error occurred");
          }
        })
        .catch((err) => {
          console.log(err);
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
          toast.error("Server Error");
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
        }
      });
      return plantDiseasesData;
    };

    if (params.type == "plant") {
      getPlantsDatas().then(
        (response) => {
          setData({ ...response, type: "plant" });
          setIsLoading(false);
        },
        () => null
      );
    } else if (params.type == "plant-diseases") {
      getPlantDiseasesDatas().then(
        (response) => {
          setData({ ...response, type: "plant-diseases" });
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
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col border p-3 rounded-xl">
          <h1>Name: {data.name}</h1>
          {params.type == "plant" && <h1>Latin: {data.latin}</h1>}
          <h1>Description: {data.description}</h1>
          <img src={`${hostNoPrefix}uploads/${data.image}`} alt="Thumbnail" className="max-w-96" />
        </div>
      )}
    </>
  );
}
