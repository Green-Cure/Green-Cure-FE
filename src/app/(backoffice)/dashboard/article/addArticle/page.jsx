"use client";

import "react-quill/dist/quill.snow.css";
import InputArticle from "../InputArticle";
import { useState } from "react";
import request from "@/app/utils/request";
import toast from "react-hot-toast";

export default function AddArticle() {
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState();
  const [currThumbnail, setCurrThumbnail] = useState(null);

  const handleSubmit = (article) => {
    setIsLoading(true);

    request
      .post("articles", {
        title: article.title,
        image: article.image,
        content: article.content,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setArticle(null);
          setErrors({
            title: "",
            image: "",
            content: "",
          });
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

  return (
    <>
      <InputArticle article={article} handleSubmit={handleSubmit} errors={errors} isLoading={isLoading} currThumbnail={currThumbnail} />
    </>
  );
}
