"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputArticle from "../../InputArticle";
import request from "@/app/utils/request";
import toast from "react-hot-toast";

export default function EditArticle({ params }) {
  const router = useRouter();
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    content: "",
  });
  const [article, setArticle] = useState(null);
  const slug = params.slug;
  const [isLoading, setIsLoading] = useState(true);
  const [currThumbnail, setCurrThumbnail] = useState(null);

  useEffect(() => {
    request
      .get(`articles/${slug}`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data !== null) {
            setIsLoading(false);
            setArticle(response.data.data);
            setCurrThumbnail(response.data.data.image);
          } else {
            setIsLoading(false);
            setArticle(null);
            router.push("/dashboard/article");
          }
          toast.dismiss();
          setIsLoading(false);
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          setIsLoading(false);
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setIsLoading(false);
      });
  }, [isLoading]);

  const handleSubmit = (article) => {
    setIsLoading(true);

    request
      .put(`articles/${slug}`, {
        title: article?.title,
        image: article?.image,
        content: article?.content,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setArticle(null);
          router.back();
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            title: "",
            image: "",
            content: "",
          };

          res.response.data.messages.forEach((message) => {
            newErrors[message.field] = message.message;
          });

          setErrors(newErrors);
          setArticle({
            title: article.title,
            content: article.content,
            image: null,
          });
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

  return <>{!isLoading ? <InputArticle article={article} handleSubmit={handleSubmit} errors={errors} isLoading={isLoading} currThumbnail={currThumbnail} /> : "Loading..."}</>;
}
