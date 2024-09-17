import { useState } from "react";
import { formatTime } from "../utils/formatTimestamp";
import { hostNoPrefix } from "../utils/urlApi";
import ForumReportModal from "./forum/ForumReportModal";
import request from "@/app/utils/request";
import toast from "react-hot-toast";

export default function PostCard({ data, handleReplyClick = () => {}, showReplyPost = false, idReplyPost, showReportButton = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({
    reason: "",
  });

  const handleForumReportSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    request
      .post(`report/forum/${data.id}`, {
        reason: reason,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setReason("");
          setIsModalOpen(false);
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            reason: "",
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
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!data) {
    return;
  }

  return (
    <div className="border-b lg:pb-2 lg:mt-8 mt-4">
      <header className="flex justify-between">
        <div className="flex justify-center items-center gap-3">
          <img className="w-12 rounded-full" src={data.author.avatar !== null ? `${hostNoPrefix}uploads/${data.author.avatar}` : "/avatars/default-avatar.svg"} alt="Post Avatar" />
          <div>
            <h3 className="gcContentAccent1p text-gcPrimary-1000">{data.author.name}</h3>
            <h4 className="gcContentBody2p text-gcSecondary-400 xl:-mt-1">@{data.author.username}</h4>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <h3 className="gcContentAccent2p text-gcPrimary-1000">{formatTime(data.createdAt)}</h3>
        </div>
      </header>
      <div className="pl-16 place-self-end flex flex-col mt-1">
        <div className="bg-gradient-to-r from-gcPrimary-200 to-gcPrimary-100 rounded-3xl px-6 py-4">
          <h1 className="gcContentBody2p text-gcPrimary-1000 text-justify">{data.content}</h1>
          {data.image && <img src={`${hostNoPrefix}uploads/${data.image}`} alt="Forum Picture" className="w-full md:max-w-max lg:max-h-60 md:max-h-56 max-h-48 object-cover object-center mt-3" />}
        </div>
        <div className="py-3 px-6 flex justify-between">
          <div className="flex gap-2 lg:gap-4 items-start">
            <button>
              <svg className="xl:w-7 xl:h-7 md:h-6 md:w-6 sm:h-5 sm:w-5 h-4 w-4 hover:stroke-gcPrimary-900 stroke-gcPrimary-1000 transition" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M34.2551 19.1939L34.255 19.1939L31.9493 31.9021L31.9491 31.9033C31.8331 32.5377 31.4958 33.1103 30.9971 33.5193C30.5005 33.9264 29.8761 34.145 29.2342 34.1365H13.3918H12.4841V33.2287V15.4554V15.2628L12.5623 15.0867L17.5004 3.97614L17.8225 3.25137L18.5839 3.47335C19.2127 3.65666 19.7966 3.96831 20.2988 4.38865C20.8011 4.80898 21.2107 5.32887 21.5019 5.91549C21.7931 6.50212 21.9595 7.14274 21.9907 7.79693C22.0218 8.44936 21.9176 9.10116 21.6848 9.71139L20.7241 12.3033L20.7233 12.3056C20.5695 12.7171 20.5176 13.1598 20.572 13.5957C20.6264 14.0317 20.7854 14.448 21.0356 14.8092C21.2857 15.1704 21.6195 15.4657 22.0085 15.6699C22.3972 15.8739 22.8295 15.981 23.2685 15.9819H31.5463L34.2551 19.1939ZM34.2551 19.1939L34.257 19.1822M34.2551 19.1939L34.257 19.1822M34.257 19.1822C34.3234 18.7869 34.3017 18.3817 34.1935 17.9957C34.086 17.6125 33.8958 17.2575 33.6363 16.9557C33.3812 16.6513 33.0625 16.4064 32.7027 16.2382C32.3407 16.069 31.9459 15.9815 31.5464 15.9819L34.257 19.1822ZM35.0244 15.8003L35.0255 15.8016C35.4521 16.3119 35.7613 16.9099 35.9313 17.553C36.1012 18.1961 36.1277 18.8688 36.0089 19.5233L36.0088 19.5234L33.7034 32.2302C33.5123 33.2746 32.9611 34.219 32.1457 34.899C31.3303 35.5789 30.3024 35.9515 29.2407 35.9519C29.2406 35.9519 29.2405 35.9519 29.2404 35.9519H6.12997C4.92624 35.9519 3.77182 35.4737 2.92066 34.6226C2.0695 33.7714 1.59132 32.617 1.59132 31.4133V18.7051C1.59132 17.5013 2.0695 16.3469 2.92066 15.4958C3.77182 14.6446 4.92624 14.1664 6.12997 14.1664H10.3963H10.9861L11.2257 13.6275L16.3983 1.99378C16.3985 1.99331 16.3987 1.99284 16.3989 1.99237C16.4706 1.83372 16.5863 1.69901 16.7324 1.6043L16.2386 0.842644L16.7324 1.6043C16.8789 1.50931 17.0497 1.45859 17.2243 1.45823L17.2266 1.45822C18.2926 1.45326 19.3438 1.70696 20.2902 2.19756C21.2366 2.68815 22.0498 3.40099 22.6602 4.27494C23.2705 5.14888 23.6598 6.15784 23.7945 7.21526C23.9289 8.2702 23.806 9.34197 23.4364 10.3391L22.4227 12.9277L21.9376 14.1664H23.2679H31.5459C32.2097 14.1677 32.8652 14.3146 33.4662 14.5968C34.0674 14.8791 34.5993 15.29 35.0244 15.8003ZM9.76088 34.1365H10.6686V33.2287V16.8896V15.9819H9.76088H6.12997C5.40773 15.9819 4.71508 16.2688 4.20438 16.7795C3.69369 17.2902 3.40678 17.9828 3.40678 18.7051V31.4133C3.40678 32.1355 3.69369 32.8282 4.20438 33.3389C4.71508 33.8496 5.40774 34.1365 6.12997 34.1365H9.76088Z"
                  fill=""
                  stroke=""
                  strokeWidth="1.81546"
                />
              </svg>
              <h3 className="mt-1 text-gcPrimary-1000 gcHeading4p">23k</h3>
            </button>
            <button type="button" onClick={() => handleReplyClick(data.id)}>
              <svg
                className={`xl:w-7 xl:h-7 md:h-6 md:w-6 sm:h-5 sm:w-5 h-4 w-4  transition ${showReplyPost && idReplyPost == data.id ? "fill-gcPrimary-900" : "hover:fill-gcPrimary-900 fill-gcPrimary-1000"}`}
                width="39"
                height="37"
                viewBox="0 0 39 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.515625 7.38943C0.515625 3.51045 3.56366 0.365906 7.32359 0.365906H31.8323C35.5922 0.365906 38.6402 3.51045 38.6402 7.38943V21.4365C38.6402 25.3154 35.5922 28.46 31.8323 28.46H21.4511L13.1113 35.9884C11.3857 37.5462 8.68518 36.282 8.68518 33.9165V28.46H7.32359C3.56366 28.46 0.515625 25.3154 0.515625 21.4365V7.38943ZM7.32359 3.99682C5.06762 3.99682 4.14654 5.06203 4.14654 7.38943V13.9818V21.4365C4.14654 23.7638 5.06762 25.6506 7.32359 25.6506H11.4084V33.7926L20.4279 25.6506H31.8323C34.0882 25.6506 35.0093 23.7638 35.0093 21.4365V7.62774C35.0093 5.30034 34.0882 3.99682 31.8323 3.99682H7.32359Z"
                  fill=""
                />
              </svg>
              <h3 className="mt-1 text-gcPrimary-1000 gcHeading4p">{data.replies_count}</h3>
            </button>
            <button>
              <svg className="xl:w-7 xl:h-7 md:h-6 md:w-6 sm:h-5 sm:w-5 h-4 w-4 hover:fill-gcPrimary-900 fill-gcPrimary-1000 transition" width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M35.9413 15.4211L21.4176 0.897448C21.1637 0.64363 20.8403 0.470787 20.4882 0.400769C20.1361 0.330751 19.7711 0.366703 19.4394 0.504078C19.1077 0.641454 18.8242 0.874086 18.6247 1.17256C18.4252 1.47104 18.3187 1.82197 18.3186 2.18098V8.61677C13.3593 9.07571 8.74977 11.3688 5.39202 15.0472C2.03426 18.7256 0.170002 23.5246 0.164062 28.5051V31.2283C0.164349 31.6051 0.281903 31.9726 0.50042 32.2796C0.718936 32.5866 1.02758 32.8181 1.38355 32.9418C1.73952 33.0655 2.12516 33.0753 2.48699 32.97C2.84882 32.8647 3.1689 32.6493 3.40284 32.3539C5.18144 30.2388 7.36373 28.4994 9.8222 27.2372C12.2807 25.9751 14.966 25.2156 17.7214 25.0031C17.8121 24.9922 18.0391 24.974 18.3186 24.9559V31.2283C18.3187 31.5873 18.4252 31.9382 18.6247 32.2367C18.8242 32.5352 19.1077 32.7678 19.4394 32.9052C19.7711 33.0426 20.1361 33.0785 20.4882 33.0085C20.8403 32.9385 21.1637 32.7656 21.4176 32.5118L35.9413 17.9882C36.2816 17.6477 36.4728 17.186 36.4728 16.7046C36.4728 16.2232 36.2816 15.7616 35.9413 15.4211ZM21.9496 26.8458V23.0587C21.9496 22.5772 21.7583 22.1155 21.4178 21.775C21.0774 21.4346 20.6156 21.2433 20.1341 21.2433C19.6712 21.2433 17.7813 21.3341 17.2984 21.3976C12.4054 21.8484 7.74799 23.7074 3.88938 26.7496C4.32735 22.7455 6.22686 19.0436 9.2242 16.3527C12.2215 13.6619 16.1061 12.1712 20.1341 12.166C20.6156 12.166 21.0774 11.9747 21.4178 11.6343C21.7583 11.2938 21.9496 10.832 21.9496 10.3505V6.56349L32.0907 16.7046L21.9496 26.8458Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 lg:gap-4 items-start">
            {showReportButton && (
              <button
                className="group"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
              >
                <svg
                  className="xl:w-7 xl:h-7 md:h-6 md:w-6 sm:h-5 sm:w-5 h-4 w-4 group-hover:child:fill-gcPrimary-900 child:fill-gcPrimary-1000 transition child:transition"
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.1829 0.375H9.81708L0.375 9.81708V23.1829L9.81708 32.625H23.1829L32.625 23.1829V9.81708L23.1829 0.375ZM16.5 25.9958C15.21 25.9958 14.1708 24.9567 14.1708 23.6667C14.1708 22.3767 15.21 21.3375 16.5 21.3375C17.79 21.3375 18.8292 22.3767 18.8292 23.6667C18.8292 24.9567 17.79 25.9958 16.5 25.9958ZM18.2917 18.2917H14.7083V7.54167H18.2917V18.2917Z"
                    fill="#205072"
                  />
                </svg>
              </button>
            )}

            <button>
              <svg className="xl:w-7 xl:h-7 md:h-6 md:w-6 sm:h-5 sm:w-5 h-4 w-4 hover:fill-gcPrimary-900 fill-gcPrimary-1000 transition" width="31" height="35" viewBox="0 0 31 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M26.2334 0H4.62942C2.07707 0 0 2.01861 0 4.49912V32.9936C8.83843e-05 33.2743 0.0812461 33.5494 0.23424 33.7875C0.387234 34.0256 0.605921 34.2172 0.865423 34.3404C1.12492 34.4637 1.41482 34.5138 1.70213 34.4848C1.98945 34.4559 2.26264 34.3492 2.49063 34.1768L15.4314 24.3957L28.3722 34.1768C28.5998 34.3498 28.873 34.4568 29.1604 34.4858C29.4478 34.5147 29.7378 34.4643 29.9971 34.3403C30.2566 34.2171 30.4753 34.0255 30.6284 33.7874C30.7814 33.5493 30.8626 33.2743 30.8628 32.9936V4.49912C30.8628 2.01861 28.7857 0 26.2334 0ZM27.7765 29.9282L16.3789 21.3123C16.1083 21.1071 15.7749 20.9955 15.4317 20.9952C15.0884 20.9949 14.7549 21.106 14.4839 21.3108L3.08628 29.9282V4.49912C3.08628 3.67278 3.77915 2.99942 4.62942 2.99942H26.2334C27.0836 2.99942 27.7765 3.67278 27.7765 4.49912V29.9282Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && showReportButton && <ForumReportModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleSubmit={handleForumReportSubmit} reason={reason} setReason={setReason} errors={errors} isLoading={isLoading} />}
    </div>
  );
}
