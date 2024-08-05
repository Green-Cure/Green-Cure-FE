"use client";

import { useEffect, useState } from "react";
import InputLibrary from "../InputLibrary";
import request from "@/app/utils/request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddLibrary() {
  const router = useRouter();

  const types = ["plant", "plant-diseases"];

  const [typeLibrary, setTypeLibrary] = useState(null);
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [currThumbnail, setCurrThumbnail] = useState(null);

  const handleSubmitPlant = (data) => {
    setErrors({
      name: "",
      image: "",
      latin: "",
      description: "",
    });

    setIsLoading(true);

    request
      .post("plants", {
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
        } else {
          toast.error("An unexpected error occurred");
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
      .post("plant-diseases", {
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
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
      <>
        <InputLibrary
          data={data}
          handleSubmit={typeLibrary == "plant" ? handleSubmitPlant : handleSubmitPlantDiseases}
          typeLibrary={typeLibrary}
          setTypeLibrary={setTypeLibrary}
          types={types}
          errors={errors}
          isLoading={isLoading}
          currThumbnail={currThumbnail}
        />
      </>
    </>
  );
}
