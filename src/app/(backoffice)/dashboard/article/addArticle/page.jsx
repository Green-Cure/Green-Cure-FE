"use client";

import "react-quill/dist/quill.snow.css";
import InputArticle from "../InputArticle";

export default function AddArticle() {
  const handleSubmit = (article) => {
    console.log(article);
  };

  return (
    <>
      <InputArticle article={null} handleSubmit={handleSubmit} />
    </>
  );
}
