"use client";

import InputRichEditor from "@/components/form/InputRichEditor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

export default function InputArticle({ article, handleSubmit }) {
  const router = useRouter();

  const newArticle = article ? article : {};

  const [title, setTitle] = useState(article ? article.title : "");
  const [content, setContent] = useState(article ? article.content : "");
  const [thumbnail, setThumbnail] = useState(article ? article.image : null);

  return (
    <>
      <div className="border rounded-xl lg:p-4 md:p-3 p-2">
        <form
          action=""
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            newArticle.title = title;
            newArticle.content = content;
            newArticle.image = thumbnail;
            handleSubmit(newArticle);
          }}
        >
          <div className="grid grid-cols-6 gap-6 sm:gap-3">
            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="title" className="text-gcPrimary-1000 gcHeading7p">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g Title..."
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label htmlFor="thumbnail" className="text-gcPrimary-1000 gcHeading7p">
                  Thumbnail
                </label>
              </div>
              <input
                id="thumbnail"
                name="image"
                accept={"image/*"}
                type={"file"}
                required={article ? false : true}
                onChange={(e) => setThumbnail(e.target.files)}
                className="block w-full rounded-xl border py-2.5 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="content" className="text-gcPrimary-1000 gcHeading7p">
                Content
              </label>
              <div id="content" className="mt-1">
                <InputRichEditor value={content} onChange={setContent} />
              </div>
            </div>

            <div className="sm:col-span-6 flex gap-2">
              <button
                type="submit"
                className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
              >
                Save
              </button>
              <button
                type="button"
                className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-3">
        <h1 className="gcHeading7p text-gcPrimary-1000">Preview Content</h1>
        <div className="mt-1 border rounded-xl lg:p-4 md:p-3 p-2 w-full">
          <div className="prose xl:prose-xl lg:prose-lg sm:prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </>
  );
}
