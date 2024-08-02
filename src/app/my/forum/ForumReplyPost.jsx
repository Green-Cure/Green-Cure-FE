"use client";

import { formatTime } from "@/app/utils/formatTimestamp";
import request from "@/app/utils/request";
import { hostNoPrefix } from "@/app/utils/urlApi";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import MyForumReplyCard from "./ForumReplyCard";
import toast from "react-hot-toast";

export default function MyForumReplyPost({ showReplyPost, handleSetShowReplyPost, isMobile, idPost, getPostsData, setPosts }) {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const { userData } = useContext(UserContext);

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState("");
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({
    image: "",
    content: "",
  });

  useEffect(() => {
    setIsloading(true);
    if (idPost) {
      const data = getPostData();
      if (data) {
        data.then(
          (response) => {
            if (response) {
              setData(response);
              setReplies(response.replies);
            } else {
              setData(null);
              setReplies([]);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        setData(null);
        setReplies([]);
      }
    }
    window.scrollTo(0, 0);
  }, [showReplyPost]);

  const getPostData = async () => {
    let post = null;
    await request
      .get(`forum/${idPost}`)
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data) {
            post = response.data.data;
          } else {
            post = null;
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.error("Server Error");
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An unexpected error occurred");
      })
      .finally(() => {
        setIsloading(false);
      });
    return post;
  };

  const handleSubmitReplyPost = (e) => {
    if (!showReplyInput) {
      setShowReplyInput(true);
      return;
    }

    e.preventDefault();

    toast.loading("Loading...");

    const payload = { content: content };

    if (previewImage.length > 0) {
      payload.image = image;
    }

    request
      .post(`forum/${idPost}/reply`, payload)
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.dismiss();
          toast.success(res.data.message);
          setContent("");
          setImage("");
          setPreviewImage("");
          setErrors({
            image: "",
            content: "",
          });
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            content: "",
            image: "",
          };

          res.response.data.messages.forEach((message) => {
            newErrors[message.field] = message.message;
          });

          setErrors(newErrors);
          toast.dismiss();
          toast.error("Something Went Wrong");
        } else if (res.response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
        }
      })
      .finally(async () => {
        const data = await getPostsData();
        if (data) {
          setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else {
          setPosts(null);
        }
        const dataSingle = await getPostData();
        if (dataSingle) {
          setData(dataSingle);
          setReplies(dataSingle.replies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else {
          setData(null);
          setReplies([]);
        }
      });
  };

  return (
    <div
      className={`sm:w-2/5 xl:w-1/3 sm:pr-10 sm:pl-7 sm:bg-gcSecondary-100 bg-gcNeutrals-baseWhite sm:relative absolute top-0 bottom-0 transition-all duration-300 ease-in-out ${
        isMobile ? (showReplyPost ? "right-0 left-0" : "-left-full right-full") : showReplyPost ? "right-0" : "-right-full hidden"
      }`}
    >
      <div className="flex flex-col p-5 sm:p-0 transition-all">
        <div className="flex justify-between items-center sm:mt-24">
          <button className="flex justify-between items-center lg:gap-5 gap-3" onClick={() => handleSetShowReplyPost(false)}>
            <svg className="sm:hidden xl:w-9 lg:w-8 md:w-7 w-5" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.3493 10.5658L20.612 2.5206C20.859 2.27975 20.9978 1.95309 20.9978 1.61247C20.9978 1.27186 20.859 0.945195 20.612 0.704345C20.3651 0.463494 20.0301 0.328186 19.6808 0.328186C19.3316 0.328186 18.9966 0.463494 18.7496 0.704345L10.5 8.76237L2.25035 0.704345C2.00338 0.463494 1.66842 0.328186 1.31915 0.328186C0.969886 0.328186 0.634924 0.463494 0.387954 0.704345C0.140984 0.945195 0.00223861 1.27186 0.0022386 1.61247C0.0022386 1.95309 0.140984 2.27975 0.387954 2.5206L8.65072 10.5658L0.387954 18.6111C0.265025 18.73 0.167453 18.8714 0.100868 19.0273C0.0342819 19.1832 0 19.3504 0 19.5192C0 19.6881 0.0342819 19.8552 0.100868 20.0111C0.167453 20.167 0.265025 20.3084 0.387954 20.4273C0.50988 20.5472 0.654938 20.6424 0.814763 20.7073C0.974587 20.7722 1.14601 20.8057 1.31915 20.8057C1.49229 20.8057 1.66372 20.7722 1.82355 20.7073C1.98337 20.6424 2.12843 20.5472 2.25035 20.4273L10.5 12.3693L18.7496 20.4273C18.8716 20.5472 19.0166 20.6424 19.1765 20.7073C19.3363 20.7722 19.5077 20.8057 19.6808 20.8057C19.854 20.8057 20.0254 20.7722 20.1852 20.7073C20.3451 20.6424 20.4901 20.5472 20.612 20.4273C20.735 20.3084 20.8325 20.167 20.8991 20.0111C20.9657 19.8552 21 19.6881 21 19.5192C21 19.3504 20.9657 19.1832 20.8991 19.0273C20.8325 18.8714 20.735 18.73 20.612 18.6111L12.3493 10.5658Z"
                fill="#205072"
              />
            </svg>
            <svg className="hidden sm:block xl:w-9 lg:w-8 md:w-7 w-5" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.02303 21.9982H36.5175C36.9824 21.9982 37.4514 22.0022 37.9163 21.9982H37.977C38.4945 21.9982 39.0403 21.7744 39.4082 21.4147C39.7599 21.0671 40.0227 20.4996 39.9984 20C39.9742 19.4845 39.8044 18.9489 39.4082 18.5853C39.012 18.2256 38.5268 18.0018 37.977 18.0018H3.48253C3.01759 18.0018 2.54861 17.9978 2.08367 18.0018H2.02303C1.50553 18.0018 0.959732 18.2256 0.591823 18.5853C0.240087 18.9329 -0.022705 19.5004 0.00155274 20C0.0258104 20.5155 0.195614 21.0511 0.591823 21.4147C0.992075 21.7704 1.47723 21.9982 2.02303 21.9982Z"
                fill="#205072"
              />
              <path
                d="M21.4053 36.5528L19.6099 34.7565L15.325 30.4696L10.1202 25.2625L5.64562 20.7859C4.91937 20.0593 4.20521 19.3246 3.46686 18.6061L3.43458 18.5738V21.4277L5.23004 19.6314L9.51494 15.3446L14.7198 10.1374L19.1943 5.66083C19.9206 4.93425 20.6549 4.21574 21.3731 3.48108L21.4053 3.44879C21.7725 3.08146 21.9944 2.54056 21.9944 2.01984C21.9944 1.52334 21.7765 0.934 21.4053 0.590891C21.022 0.239708 20.5177 -0.0226692 19.977 0.00155029C19.4404 0.0257698 18.9361 0.207416 18.5487 0.590891L16.7533 2.38717L12.4684 6.67401L7.26355 11.8812L2.78902 16.3578C2.06276 17.0843 1.32844 17.8029 0.610256 18.5375L0.577978 18.5698C-0.192659 19.3408 -0.192659 20.6527 0.577978 21.4237C1.17915 22.0292 1.78033 22.6266 2.37747 23.228L6.66238 27.5149L11.8672 32.722L16.3417 37.1986C17.068 37.9252 17.7862 38.6599 18.5205 39.3784L18.5528 39.4107C18.9199 39.778 19.4606 40 19.9811 40C20.4774 40 21.0664 39.782 21.4094 39.4107C21.7604 39.0272 22.0227 38.5226 21.9984 37.9817C21.9702 37.4448 21.7927 36.9403 21.4053 36.5528Z"
                fill="#205072"
              />
            </svg>
            <h2 className="gcHeading3p text-gcPrimary-1000">Reply</h2>
          </button>
          <button className="bg-gcPrimary-1000 text-gcNeutrals-baseWhite xl:px-8 px-4 md:py-2 py-1.5 gcContentAccent1p rounded-2xl hover:bg-gcPrimary-900 transition" type="button" onClick={(e) => handleSubmitReplyPost(e)}>
            Reply
          </button>
        </div>

        {data && (
          <div className="lg:pb-2 lg:mt-8 mt-4 z-[11] relative">
            <header className="flex justify-between">
              <div className="flex justify-center items-center gap-3">
                {data && <img className="w-10 rounded-full" src={data.author.avatar !== null ? `${hostNoPrefix}uploads/${data.author.avatar}` : "/avatars/default-avatar.svg"} alt="Post Avatar" />}
                <div>
                  <h3 className="gcContentAccent2p text-gcPrimary-1000">{data.author.name}</h3>
                  <h4 className="gcContentBody5p text-gcSecondary-400 xl:-mt-1">@{data.author.username}</h4>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <h3 className="gcContentAccent3p text-gcPrimary-1000 lg:block sm:hidden">{formatTime(data.createdAt)}</h3>
              </div>
            </header>
            <div className="pl-16 place-self-end flex flex-col mt-1">
              <div className="bg-gradient-to-r from-gcPrimary-200 to-gcPrimary-100 rounded-3xl px-6 py-4 cursor-pointer transition hover:shadow-md" onClick={() => setShowReplyInput(!showReplyInput)}>
                <h1 className="gcContentBody5p text-gcPrimary-1000 text-justify">{data.content}</h1>
                {data.image && <img src={`${hostNoPrefix}uploads/${data.image}`} alt="Forum Picture" className="w-full md:max-w-max lg:max-h-60 md:max-h-56 max-h-48 object-cover object-center mt-3" />}
              </div>
            </div>
          </div>
        )}

        <div className={` transition duration-500 ${showReplyInput ? "opacity-100 scale-100 z-[10]" : "absolute -z-[10] opacity-0 scale-0 -top-96"}`}>
          <div className={`flex flex-row-reverse gap-3 sm:gap-0 justify-between items-start transition w-full`}>
            <div className="flex justify-center items-start mt-5 sm:p-0">
              {userData && <img className="w-12 rounded-full sm:hidden" src={userData.avatar !== null ? `${hostNoPrefix}uploads/${data.author.avatar}` : "/avatars/default-avatar.svg"} alt="Post Avatar" />}
              {!userData && <img className="w-12 rounded-full sm:hidden" src="/avatars/default-avatar.svg" alt="Post Avatar" />}
            </div>
            <div className="bg-gradient-to-r w-full from-gcPrimary-200 to-gcPrimary-100 p-6 rounded-2xl mt-5">
              <textarea
                placeholder="Type Something..."
                className="min-h-28 bg-transparent placeholder:text-gcPrimary-900 text-gcPrimary-900 gcContentAccent2p w-full focus:outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              {errors.content && <small className="text-red-600">{errors.content}</small>}

              {previewImage.length > 0 && (
                <div className="mb-3">
                  <img src={previewImage} alt="Preview Image" className="object-cover object-center max-h-60 w-full" />
                </div>
              )}

              <div className="flex flex-col gap-3 mt-2.5">
                <div className="flex gap-3">
                  <div>
                    <input
                      id="imageReply"
                      name="image"
                      accept={"image/*"}
                      type={"file"}
                      required={true}
                      onChange={(e) => {
                        if (e.target.files.length > 0) {
                          setImage(e.target.files[0]);
                          setPreviewImage(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      className="hidden"
                    />
                    <label htmlFor="imageReply" className="bg-gcPrimary-1000 rounded-xl flex justify-center items-center p-1.5 md:p-2 cursor-pointer hover:bg-gcPrimary-900 transition">
                      <svg className="xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-9 md:h-9 sm:w-8 sm:h-8 w-6 h-6" width="58" height="45" viewBox="0 0 58 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.4521 30.2538L27.229 21.0307M27.229 21.0307L18.0059 30.2538M27.229 21.0307V41.7827" stroke="#FAFAFA" strokeWidth="5.35463" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M48.3223 39.407C50.6142 38.1575 52.4247 36.1804 53.4681 33.7877C54.5115 31.395 54.7284 28.723 54.0845 26.1933C53.4407 23.6636 51.9727 21.4204 49.9124 19.8177C47.852 18.215 45.3166 17.344 42.7063 17.3423H39.7455C39.0343 14.5912 37.7086 12.0372 35.8682 9.87225C34.0278 7.70727 31.7206 5.98768 29.12 4.84276C26.5193 3.69783 23.693 3.15736 20.8534 3.26198C18.0138 3.36661 15.2349 4.1136 12.7255 5.44679C10.2162 6.77999 8.04175 8.66471 6.36566 10.9592C4.68957 13.2538 3.55545 15.8984 3.04858 18.6944C2.5417 21.4903 2.67525 24.3648 3.43919 27.1017C4.20313 29.8385 5.57758 32.3666 7.45921 34.4959"
                          stroke="#FAFAFA"
                          strokeWidth="5.45687"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M36.4521 30.2538L27.229 21.0307L18.0059 30.2538" stroke="#FAFAFA" strokeWidth="5.35463" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </label>
                  </div>
                  <div className="">
                    <button className="bg-gcPrimary-1000 rounded-xl flex justify-center items-center p-1.5 md:p-2 hover:bg-gcPrimary-900 transition">
                      <svg className="xl:w-14 xl:h-14 lg:w-10 lg:h-10 md:w-9 md:h-9 sm:w-8 sm:h-8 w-6 h-6" width="59" height="44" viewBox="0 0 59 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M49.9246 7.93051H46.1703L45.2318 5.3701C44.6233 3.86774 43.4947 2.56775 42.0022 1.65025C40.5098 0.732745 38.7274 0.243151 36.902 0.249294H21.885C20.0418 0.252304 18.2462 0.760564 16.7516 1.70234C15.257 2.64411 14.139 3.97184 13.5553 5.49812L12.6167 8.05853H8.86249C6.52885 8.05853 4.29079 8.86779 2.64065 10.3083C0.990514 11.7488 0.0634766 13.7026 0.0634766 15.7397V36.223C0.0634766 38.2602 0.990514 40.2139 2.64065 41.6544C4.29079 43.0949 6.52885 43.9042 8.86249 43.9042H49.9246C52.2582 43.9042 54.4963 43.0949 56.1464 41.6544C57.7966 40.2139 58.7236 38.2602 58.7236 36.223V15.7397C58.7431 14.7203 58.5299 13.7077 58.0964 12.7609C57.6629 11.8142 57.0179 10.9522 56.1989 10.2254C55.3798 9.49847 54.4033 8.9212 53.326 8.52721C52.2488 8.13321 51.0925 7.93037 49.9246 7.93051ZM52.8576 36.095C52.8576 36.774 52.5486 37.4253 51.9985 37.9054C51.4485 38.3856 50.7025 38.6554 49.9246 38.6554H8.86249C8.08461 38.6554 7.33859 38.3856 6.78855 37.9054C6.2385 37.4253 5.92949 36.774 5.92949 36.095V15.6117C5.92949 14.9327 6.2385 14.2814 6.78855 13.8012C7.33859 13.3211 8.08461 13.0513 8.86249 13.0513H14.7285C15.3681 13.0805 16.001 12.926 16.5306 12.6117C17.0603 12.2973 17.4574 11.8402 17.6615 11.3102L19.2453 7.11118C19.4421 6.60263 19.817 6.16092 20.317 5.84849C20.817 5.53607 21.4168 5.36872 22.0317 5.3701H37.0487C37.6636 5.36872 38.2634 5.53607 38.7634 5.84849C39.2634 6.16092 39.6383 6.60263 39.835 7.11118L41.4189 11.3102C41.6071 11.7986 41.9597 12.2261 42.4307 12.5367C42.9016 12.8473 43.469 13.0267 44.0586 13.0513H49.9246C50.7025 13.0513 51.4485 13.3211 51.9985 13.8012C52.5486 14.2814 52.8576 14.9327 52.8576 15.6117V36.095ZM29.3935 13.0513C27.0732 13.0513 24.8049 13.652 22.8756 14.7773C20.9463 15.9027 19.4425 17.5022 18.5546 19.3736C17.6666 21.245 17.4343 23.3043 17.8869 25.291C18.3396 27.2777 19.457 29.1025 21.0977 30.5348C22.7385 31.9672 24.8289 32.9426 27.1047 33.3378C29.3805 33.7329 31.7394 33.5301 33.8832 32.755C36.0269 31.9798 37.8592 30.6671 39.1484 28.9829C40.4375 27.2986 41.1256 25.3185 41.1256 23.2929C41.1256 20.5767 39.8895 17.9717 37.6893 16.051C35.4892 14.1303 32.5051 13.0513 29.3935 13.0513ZM29.3935 28.4137C28.2333 28.4137 27.0992 28.1134 26.1346 27.5507C25.1699 26.988 24.418 26.1883 23.974 25.2526C23.5301 24.3169 23.4139 23.2873 23.6402 22.2939C23.8666 21.3006 24.4253 20.3881 25.2456 19.672C26.066 18.9558 27.1112 18.4681 28.2491 18.2705C29.387 18.0729 30.5665 18.1743 31.6384 18.5619C32.7102 18.9495 33.6264 19.6059 34.2709 20.448C34.9155 21.2901 35.2595 22.2801 35.2595 23.2929C35.2595 24.6511 34.6415 25.9536 33.5414 26.9139C32.4413 27.8742 30.9493 28.4137 29.3935 28.4137Z"
                          fill="#FAFAFA"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {errors.image && <small className="text-red-600">{errors.image}</small>}
              </div>
            </div>
          </div>
        </div>

        {replies.length > 0 && (
          <div className="relative z-[11] mt-4">
            {data.replies.map((replyData, index) => {
              return <MyForumReplyCard data={replyData} key={index} />;
            })}
          </div>
        )}

        {!isLoading && replies.length <= 0 && <h1 className="text-gcPrimary-1000 gcContentAccent1p text-center my-8">No data</h1>}
      </div>
    </div>
  );
}
