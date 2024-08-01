"use client";

import { useEffect, useState } from "react";
import InputLibrary from "../../../InputLibrary";
import { notFound, useRouter } from "next/navigation";
import request from "@/app/utils/request";
import toast from "react-hot-toast";

export default function EditLibrary({ params }) {
  const router = useRouter();
  const id = params.id;

  const [typeLibrary, setTypeLibrary] = useState(params.type);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currThumbnail, setCurrThumbnail] = useState(null);

  const [errors, setErrors] = useState(
    params.type === "plant"
      ? {
          name: "",
          image: "",
          latin: "",
          description: "",
        }
      : {
          name: "",
          image: "",
          description: "",
        }
  );

  const handleSubmitPlant = (data) => {
    setErrors({
      name: "",
      image: "",
      latin: "",
      description: "",
    });

    setIsLoading(true);

    request
      .put(`plants/${id}`, {
        name: data.name,
        image: data.image,
        latin: data.latin,
        description: data.description,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setData({
            name: "",
            image: null,
            latin: "",
            description: "",
          });
          router.back();
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            name: "",
            image: "",
            latin: "",
            description: "",
          };

          res.response.data.messages.forEach((message) => {
            newErrors[message.field] = message.message;
          });

          setErrors(newErrors);
          toast.error("Something Went Wrong");
        } else if (res.response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          router.back();
        } else {
          toast.error("An unexpected error occurred");
          router.back();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmitPlantDiseases = (data) => {
    setErrors({
      name: "",
      image: "",
      latin: "",
      description: "",
    });

    setIsLoading(true);

    request
      .put(`plant-diseases/${id}`, {
        name: data.name,
        image: data.image,
        description: data.description,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setData({
            name: "",
            image: null,
            description: "",
          });
          router.back();
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            name: "",
            image: "",
            description: "",
          };

          res.response.data.messages.forEach((message) => {
            newErrors[message.field] = message.message;
          });

          setErrors(newErrors);
          toast.error("Something Went Wrong");
        } else if (res.response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          router.back();
        } else {
          toast.error("An unexpected error occurred");
          router.back();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
            setCurrThumbnail(plantData.image);
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
          setCurrThumbnail(plantDiseasesData.image);
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

  useEffect(() => {
    if (typeLibrary == "plant") {
      setErrors({
        name: "",
        image: "",
        latin: "",
        description: "",
      });
    } else {
      setErrors({
        name: "",
        image: "",
        description: "",
      });
    }
  }, [typeLibrary]);

  return (
    <>
      {!isLoading && (
        <InputLibrary
          data={data}
          handleSubmit={typeLibrary == "plant" ? handleSubmitPlant : handleSubmitPlantDiseases}
          typeLibrary={typeLibrary}
          setTypeLibrary={setTypeLibrary}
          types={null}
          errors={errors}
          isLoading={isLoading}
          currThumbnail={currThumbnail}
        />
      )}
    </>
  );
}
