"use client";

export default function ForumReportModal({ isModalOpen, setIsModalOpen, handleSubmit, errors, reason, setReason, isLoading }) {
  return (
    <>
      <div
        className={`
        fixed inset-0 z-50 flex justify-center items-center transition-colors
        ${isModalOpen ? "visible bg-black/10" : "invisible"}
      `}
      >
        <div
          id="crud-modal"
          tabIndex="-1"
          onClick={(e) => {
            if (e.target.id === "crud-modal") {
              setIsModalOpen(false);
            }
          }}
          aria-hidden="true"
          role="dialog"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[51] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        >
          <div className="relative p-4 w-full max-w-2xl md:max-w-xl xl:max-w-2xl sm:max-w-lg max-h-full transition-all">
            <div className="relative bg-gcPrimary-1000/80 rounded-xl shadow p-4 md:p-6 transition-all flex flex-col">
              <button className="place-self-end group" onClick={() => !isLoading && setIsModalOpen(false)}>
                <svg className="xl:w-8 xl:h-8 lg:h-7 lg:w-7 md:h-6 md:w-6 w-5 h-5" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.64513 5.26112C4.15278 6.70248 2.96243 8.42661 2.14354 10.3329C1.32465 12.2392 0.893618 14.2896 0.87559 16.3642C0.857562 18.4389 1.2529 20.4964 2.03854 22.4167C2.82418 24.3369 3.98438 26.0815 5.45146 27.5485C6.91853 29.0156 8.66309 30.1758 10.5833 30.9615C12.5036 31.7471 14.5611 32.1424 16.6358 32.1244C18.7104 32.1064 20.7608 31.6753 22.6671 30.8565C24.5734 30.0376 26.2975 28.8472 27.7389 27.3549C30.5851 24.408 32.16 20.4611 32.1244 16.3642C32.0888 12.2674 30.4455 8.34846 27.5485 5.45146C24.6515 2.55445 20.7326 0.91119 16.6358 0.875589C12.5389 0.839989 8.59204 2.4149 5.64513 5.26112ZM7.84825 7.46425C10.1938 5.11874 13.375 3.80105 16.692 3.80105C20.0091 3.80105 23.1902 5.11874 25.5358 7.46425C27.8813 9.80976 29.199 12.9909 29.199 16.308C29.199 19.625 27.8813 22.8062 25.5358 25.1517C23.1902 27.4973 20.0091 28.8149 16.692 28.8149C13.375 28.8149 10.1938 27.4973 7.84825 25.1517C5.50274 22.8062 4.18505 19.625 4.18505 16.308C4.18505 12.9909 5.50274 9.80976 7.84825 7.46425ZM23.317 20.7299L18.8951 16.308L23.317 11.8861L21.1139 9.683L16.692 14.1049L12.2701 9.683L10.067 11.8861L14.4889 16.308L10.067 20.7299L12.2701 22.933L16.692 18.5111L21.1139 22.933L23.317 20.7299Z"
                    fill="#FAFAFA"
                    className="group-hover:fill-gcSecondary-500 transition"
                  />
                </svg>
              </button>

              <h1 className="text-center text-gcNeutrals-baseWhite gcHeading3p">Report reason</h1>
              <form method="post" className="flex flex-col lg:gap-6 lg:mt-6 sm:gap-5 sm:mt-6 gap-4 mt-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={"Input text..."}
                  className="bg-gcNeutrals-baseWhite gcContentBody1p placeholder:text-gcSecondary-500 outline-none py-2.5 px-5 rounded-2xl text-gcPrimary-1000"
                />
                {errors.reason && <small className="text-red-600">{errors.reason}</small>}
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`text-gcNeutrals-baseWhite px-6 py-2 gcHeading4p bg-gcPrimary-600 rounded-md w-max place-self-end hover:bg-gcPrimary-700 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <svg className="animate-spin md:h-6 md:w-6 w-5 h-5 mx-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  ) : (
                    "Report"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
