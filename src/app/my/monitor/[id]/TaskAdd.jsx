"use client";

import { useState } from "react";
import LoggedInNavbar from "../../LoggedInNavbar";
import { formatDateToIndonesian } from "@/app/utils/formatTimestamp";
import toast from "react-hot-toast";
import request from "@/app/utils/request";
import { useRouter } from "next/navigation";

export default function TaskAdd({ monitorId, setShowAddTask }) {
  const router = useRouter();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    description: "",
    task: "",
    monitorId: "",
  });

  const handleSubmitAdd = (e) => {
    e.preventDefault();

    setIsLoading(true);

    request
      .post(`monitor-task`, {
        task: task,
        description: description,
        monitorId: monitorId,
      })
      .then(function (res) {
        if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
          toast.success(res.data.message);
          setTask("");
          setDescription("");
          router.back(`/my/monitor/${taskItemData.monitorId}`);
        } else if (res.response.data.statusCode === 422) {
          const newErrors = {
            description: "",
            task: "",
            monitorId: "",
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

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10 ">
        <div className="flex justify-between items-center sm:px-0 lg:py-4 md:py-3 py-2 sm:mx-0 mx-4">
          <button type="button" onClick={() => setShowAddTask(false)} className="flex justify-center items-center lg:gap-6 gap-3">
            <svg className="xl:w-9 lg:w-8 md:w-7 w-5" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.02303 21.9982H36.5175C36.9824 21.9982 37.4514 22.0022 37.9163 21.9982H37.977C38.4945 21.9982 39.0403 21.7744 39.4082 21.4147C39.7599 21.0671 40.0227 20.4996 39.9984 20C39.9742 19.4845 39.8044 18.9489 39.4082 18.5853C39.012 18.2256 38.5268 18.0018 37.977 18.0018H3.48253C3.01759 18.0018 2.54861 17.9978 2.08367 18.0018H2.02303C1.50553 18.0018 0.959732 18.2256 0.591823 18.5853C0.240087 18.9329 -0.022705 19.5004 0.00155274 20C0.0258104 20.5155 0.195614 21.0511 0.591823 21.4147C0.992075 21.7704 1.47723 21.9982 2.02303 21.9982Z"
                fill="#205072"
              />
              <path
                d="M21.4053 36.5528L19.6099 34.7565L15.325 30.4696L10.1202 25.2625L5.64562 20.7859C4.91937 20.0593 4.20521 19.3246 3.46686 18.6061L3.43458 18.5738V21.4277L5.23004 19.6314L9.51494 15.3446L14.7198 10.1374L19.1943 5.66083C19.9206 4.93425 20.6549 4.21574 21.3731 3.48108L21.4053 3.44879C21.7725 3.08146 21.9944 2.54056 21.9944 2.01984C21.9944 1.52334 21.7765 0.934 21.4053 0.590891C21.022 0.239708 20.5177 -0.0226692 19.977 0.00155029C19.4404 0.0257698 18.9361 0.207416 18.5487 0.590891L16.7533 2.38717L12.4684 6.67401L7.26355 11.8812L2.78902 16.3578C2.06276 17.0843 1.32844 17.8029 0.610256 18.5375L0.577978 18.5698C-0.192659 19.3408 -0.192659 20.6527 0.577978 21.4237C1.17915 22.0292 1.78033 22.6266 2.37747 23.228L6.66238 27.5149L11.8672 32.722L16.3417 37.1986C17.068 37.9252 17.7862 38.6599 18.5205 39.3784L18.5528 39.4107C18.9199 39.778 19.4606 40 19.9811 40C20.4774 40 21.0664 39.782 21.4094 39.4107C21.7604 39.0272 22.0227 38.5226 21.9984 37.9817C21.9702 37.4448 21.7927 36.9403 21.4053 36.5528Z"
                fill="#205072"
              />
            </svg>
          </button>

          <button
            disabled={isLoading}
            type="button"
            className={`bg-gcPrimary-600 hover:bg-gcPrimary-700 transition lg:py-2.5 lg:px-10 sm:py-2 sm:px-8 py-2 px-6 text-gcNeutrals-baseWhite gcContentAccent1p rounded-3xl ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSubmitAdd}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              "Save"
            )}
          </button>
        </div>

        <div className="xl:px-20 lg:px-16 md:px-14 sm:px-12 px-10">
          <div>
            <div>
              <input
                type="text"
                placeholder="Task title..."
                className="text-gcPrimary-1000 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold bg-gcNeutrals-baseWhite outline-none border-none focus:bg-white w-full"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              {errors.task && <small className="text-red-600">{errors.task}</small>}
            </div>
            <h4 className="text-gcSecondary-600 gcContentBody4p">{formatDateToIndonesian(new Date())}</h4>
          </div>

          <div className="mb-4">
            <textarea
              className="w-full p-6 bg-gcSecondary-100 placeholder:text-gcSecondary-300 rounded-3xl border text-gcPrimary-1000 xl:mt-9 lg:mt-7 md:mt-6 sm:mt-5 mt-4 gcBody1p text-justify outline-none focus:ring-2 focus:ring-gcSecondary-300 xl:h-72 lg:h-64 md:h-60 sm:h-56 h-48 resize-none"
              placeholder="Write your note here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              spellCheck={false}
            ></textarea>
            {errors.description && <small className="text-red-600">{errors.description}</small>}
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-4">
              <button className="text-gcNeutrals-500">
                <svg width="33" height="33" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_132_1806)">
                    <path
                      d="M54.7709 11.3998H11.3248C10.6046 11.3998 9.91393 11.6859 9.40469 12.1951C8.89546 12.7043 8.60938 13.395 8.60938 14.1152V22.2613C8.60938 22.9815 8.89546 23.6721 9.40469 24.1814C9.91393 24.6906 10.6046 24.9767 11.3248 24.9767C12.0449 24.9767 12.7356 24.6906 13.2448 24.1814C13.7541 23.6721 14.0401 22.9815 14.0401 22.2613V16.8305H30.3325V52.1305H24.9017C24.1815 52.1305 23.4908 52.4166 22.9816 52.9259C22.4724 53.4351 22.1863 54.1258 22.1863 54.8459C22.1863 55.5661 22.4724 56.2568 22.9816 56.766C23.4908 57.2752 24.1815 57.5613 24.9017 57.5613H41.194C41.9142 57.5613 42.6048 57.2752 43.1141 56.766C43.6233 56.2568 43.9094 55.5661 43.9094 54.8459C43.9094 54.1258 43.6233 53.4351 43.1141 52.9259C42.6048 52.4166 41.9142 52.1305 41.194 52.1305H35.7632V16.8305H52.0555V22.2613C52.0555 22.9815 52.3416 23.6721 52.8508 24.1814C53.3601 24.6906 54.0507 24.9767 54.7709 24.9767C55.4911 24.9767 56.1817 24.6906 56.691 24.1814C57.2002 23.6721 57.4863 22.9815 57.4863 22.2613V14.1152C57.4863 13.395 57.2002 12.7043 56.691 12.1951C56.1817 11.6859 55.4911 11.3998 54.7709 11.3998Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_132_1806">
                      <rect width="65.1692" height="65.1692" fill="white" transform="translate(0.460938 0.538452)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button className="text-gcNeutrals-500">
                <svg width="38" height="38" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_132_1811)">
                    <path
                      d="M57.5875 12.0349C61.2465 12.1014 64.5443 15.2163 64.6156 19.063C64.694 31.7506 64.6156 44.4382 64.6156 57.1259C64.5942 60.8229 61.4128 64.1635 57.5875 64.2347C44.8998 64.3132 32.2122 64.2347 19.5246 64.2347C15.8276 64.2134 12.487 61.032 12.4157 57.2067C12.3373 44.519 12.4157 31.8314 12.4157 19.1461C12.4371 15.4468 15.6185 12.1062 19.4438 12.0349C32.1576 11.9565 44.8737 11.9565 57.5875 12.0349ZM19.5412 16.7797C18.301 16.7868 17.1843 17.8631 17.1605 19.1224C17.0821 31.7981 17.0821 44.4715 17.1605 57.1473C17.1843 58.3732 18.2629 59.4662 19.5032 59.49C32.179 59.5684 44.8523 59.5684 57.5281 59.49C58.7541 59.4662 59.847 58.3875 59.8708 57.1473C59.9492 44.4715 59.9492 31.7981 59.8708 19.1224C59.847 17.8988 58.7731 16.8034 57.5281 16.7797C44.8666 16.7013 32.2027 16.7797 19.5412 16.7797ZM27.0231 35.7921C27.7858 35.937 27.9307 36.0844 28.3299 36.4574L35.8855 44.0129L48.4804 27.2196C48.4804 27.2196 49.9108 25.882 51.2864 26.4498C52.5172 26.9607 53.1254 28.6191 52.4412 29.819C52.3746 29.933 52.3532 29.9591 52.2772 30.0684L38.0405 49.05C37.7458 49.4206 37.6294 49.4943 37.4037 49.6368C36.5816 50.1524 35.453 50.0978 34.6832 49.4967C34.5811 49.4159 34.5597 49.3921 34.4646 49.3042L24.9727 39.8122C24.5973 39.4131 24.5307 39.2468 24.4191 38.9379C23.9059 37.5147 25.0701 35.7113 26.7261 35.7636C26.8259 35.766 26.9233 35.7779 27.0231 35.7921Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_132_1811">
                      <rect width="76.0308" height="76.0308" fill="white" transform="translate(0.5 0.107666)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button className="text-gcNeutrals-500">
                <svg className="mt-1.5" width="38" height="38" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M51.9919 43.9846L39.1908 30.4077L26.5837 41.9082L20.765 36.1579L13.9766 42.8665" stroke="#1C1B1F" stroke-width="5.43077" stroke-linecap="square" />
                  <rect x="19.4082" y="19.5461" width="8.14615" height="8.14615" rx="4.07308" fill="#1C1B1F" />
                  <path
                    d="M41.674 11.3999H24.2956C19.7333 11.3999 17.4522 11.3999 15.7096 12.2878C14.1768 13.0688 12.9306 14.315 12.1496 15.8478C11.2617 17.5903 11.2617 19.8715 11.2617 24.4337V41.8122C11.2617 46.3745 11.2617 48.6556 12.1496 50.3982C12.9306 51.931 14.1768 53.1772 15.7096 53.9582C17.4522 54.8461 19.7333 54.8461 24.2956 54.8461H41.674C46.2363 54.8461 48.5174 54.8461 50.26 53.9582C51.7928 53.1772 53.039 51.931 53.82 50.3982C54.7079 48.6556 54.7079 46.3745 54.7079 41.8122V24.4337C54.7079 19.8715 54.7079 17.5903 53.82 15.8478C53.039 14.315 51.7928 13.0688 50.26 12.2878C48.5174 11.3999 46.2363 11.3999 41.674 11.3999Z"
                    stroke="#1C1B1F"
                    stroke-width="5.43077"
                  />
                </svg>
              </button>
              <button className="text-gcNeutrals-500">
                <svg width="28" height="28" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M35.6008 25.4076H30.17V14.546C30.17 13.8259 29.8839 13.1352 29.3747 12.626C28.8655 12.1167 28.1748 11.8307 27.4546 11.8307C26.7345 11.8307 26.0438 12.1167 25.5346 12.626C25.0253 13.1352 24.7393 13.8259 24.7393 14.546V28.123C24.7393 28.8431 25.0253 29.5338 25.5346 30.043C26.0438 30.5523 26.7345 30.8383 27.4546 30.8383H35.6008C36.321 30.8383 37.0116 30.5523 37.5209 30.043C38.0301 29.5338 38.3162 28.8431 38.3162 28.123C38.3162 27.4028 38.0301 26.7121 37.5209 26.2029C37.0116 25.6937 36.321 25.4076 35.6008 25.4076ZM27.4546 0.969116C22.0841 0.969116 16.8342 2.56166 12.3688 5.54536C7.90334 8.52907 4.42297 12.7699 2.36776 17.7316C0.312547 22.6933 -0.22519 28.1531 0.822547 33.4204C1.87028 38.6877 4.45644 43.5261 8.25397 47.3236C12.0515 51.1212 16.8899 53.7073 22.1572 54.7551C27.4245 55.8028 32.8842 55.265 37.846 53.2098C42.8077 51.1546 47.0485 47.6743 50.0322 43.2088C53.0159 38.7434 54.6085 33.4935 54.6085 28.123C54.6005 20.9238 51.7371 14.0217 46.6465 8.93114C41.5559 3.84054 34.6538 0.977123 27.4546 0.969116ZM27.4546 49.846C23.1582 49.846 18.9583 48.572 15.3859 46.185C11.8136 43.7981 9.0293 40.4054 7.38513 36.436C5.74097 32.4666 5.31078 28.0989 6.14897 23.885C6.98715 19.6711 9.05608 15.8005 12.0941 12.7624C15.1321 9.7244 19.0028 7.65548 23.2167 6.81729C27.4305 5.9791 31.7983 6.40929 35.7677 8.05346C39.7371 9.69762 43.1297 12.4819 45.5167 16.0543C47.9037 19.6266 49.1777 23.8265 49.1777 28.123C49.1711 33.8823 46.8803 39.4038 42.8079 43.4762C38.7355 47.5486 33.2139 49.8394 27.4546 49.846Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            <button className="text-gcPrimary-basePrimary">
              <svg width="50" height="50" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100.469" height="100.469" rx="50.2346" fill="#329D9C" />
                <path
                  d="M78.7457 56.4257C78.7457 57.2467 78.4239 58.0341 77.851 58.6146C77.2782 59.1951 76.5012 59.5212 75.6911 59.5212H72.6364V62.6168C72.6364 63.4378 72.3146 64.2251 71.7417 64.8057C71.1689 65.3862 70.3919 65.7123 69.5817 65.7123C68.7716 65.7123 67.9946 65.3862 67.4218 64.8057C66.8489 64.2251 66.5271 63.4378 66.5271 62.6168V59.5212H63.4724C62.6623 59.5212 61.8853 59.1951 61.3125 58.6146C60.7396 58.0341 60.4178 57.2467 60.4178 56.4257C60.4178 55.6047 60.7396 54.8174 61.3125 54.2368C61.8853 53.6563 62.6623 53.3302 63.4724 53.3302H66.5271V50.2346C66.5271 49.4136 66.8489 48.6263 67.4218 48.0458C67.9946 47.4652 68.7716 47.1391 69.5817 47.1391C70.3919 47.1391 71.1689 47.4652 71.7417 48.0458C72.3146 48.6263 72.6364 49.4136 72.6364 50.2346V53.3302H75.6911C76.5012 53.3302 77.2782 53.6563 77.851 54.2368C78.4239 54.8174 78.7457 55.6047 78.7457 56.4257ZM28.8529 36.8206H31.9076V39.9162C31.9076 40.7372 32.2294 41.5245 32.8023 42.105C33.3751 42.6856 34.1521 43.0117 34.9623 43.0117C35.7724 43.0117 36.5494 42.6856 37.1222 42.105C37.6951 41.5245 38.0169 40.7372 38.0169 39.9162V36.8206H41.0716C41.8817 36.8206 42.6587 36.4945 43.2315 35.914C43.8044 35.3334 44.1262 34.5461 44.1262 33.7251C44.1262 32.9041 43.8044 32.1167 43.2315 31.5362C42.6587 30.9557 41.8817 30.6296 41.0716 30.6296H38.0169V27.534C38.0169 26.713 37.6951 25.9257 37.1222 25.3451C36.5494 24.7646 35.7724 24.4385 34.9623 24.4385C34.1521 24.4385 33.3751 24.7646 32.8023 25.3451C32.2294 25.9257 31.9076 26.713 31.9076 27.534V30.6296H28.8529C28.0428 30.6296 27.2658 30.9557 26.693 31.5362C26.1201 32.1167 25.7983 32.9041 25.7983 33.7251C25.7983 34.5461 26.1201 35.3334 26.693 35.914C27.2658 36.4945 28.0428 36.8206 28.8529 36.8206ZM61.436 65.7123H60.4178V64.6805C60.4178 63.8595 60.0959 63.0721 59.5231 62.4916C58.9502 61.9111 58.1732 61.5849 57.3631 61.5849C56.553 61.5849 55.776 61.9111 55.2031 62.4916C54.6303 63.0721 54.3084 63.8595 54.3084 64.6805V65.7123H53.2902C52.4801 65.7123 51.7031 66.0385 51.1302 66.619C50.5574 67.1995 50.2356 67.9869 50.2356 68.8079C50.2356 69.6288 50.5574 70.4162 51.1302 70.9967C51.7031 71.5773 52.4801 71.9034 53.2902 71.9034H54.3084V72.9352C54.3084 73.7562 54.6303 74.5436 55.2031 75.1241C55.776 75.7046 56.553 76.0308 57.3631 76.0308C58.1732 76.0308 58.9502 75.7046 59.5231 75.1241C60.0959 74.5436 60.4178 73.7562 60.4178 72.9352V71.9034H61.436C62.2461 71.9034 63.0231 71.5773 63.596 70.9967C64.1688 70.4162 64.4906 69.6288 64.4906 68.8079C64.4906 67.9869 64.1688 67.1995 63.596 66.619C63.0231 66.0385 62.2461 65.7123 61.436 65.7123ZM71.1447 38.5825L35.6801 74.5191C34.7254 75.4863 33.4307 76.0297 32.0807 76.0297C30.7307 76.0297 29.436 75.4863 28.4813 74.5191L23.2145 69.1845C22.7416 68.7054 22.3664 68.1365 22.1104 67.5104C21.8544 66.8844 21.7227 66.2133 21.7227 65.5356C21.7227 64.8579 21.8544 64.1869 22.1104 63.5608C22.3664 62.9347 22.7416 62.3659 23.2145 61.8867L58.6791 25.9501C59.6339 24.9829 60.9286 24.4396 62.2786 24.4396C63.6285 24.4396 64.9232 24.9829 65.878 25.9501L71.1447 31.2848C71.6177 31.7639 71.9929 32.3327 72.2489 32.9588C72.5048 33.5849 72.6366 34.2559 72.6366 34.9336C72.6366 35.6113 72.5048 36.2824 72.2489 36.9085C71.9929 37.5346 71.6177 38.1034 71.1447 38.5825ZM55.0721 46.1072L51.2538 42.2378L28.2547 65.5343L32.0731 69.4037L55.0721 46.1072ZM66.0969 34.9349L62.2786 31.0655L55.5812 37.8525L59.3995 41.7219L66.0969 34.9349Z"
                  fill="#FAFAFA"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}