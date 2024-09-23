"use client";

export default function MyScarecrowHistory({ datas, setShowChatId, isHistoryOpen, setIsHistoryOpen }) {
  return (
    <>
      <section className={`xl:1/5 sm:w-1/3 sm:block sm:static absolute top-0 left-0 right-0 bottom-0 z-40 bg-gcNeutrals-baseWhite ${isHistoryOpen ? "px-4 pt-4" : "hidden"}`}>
        <button className="flex justify-between items-center lg:gap-5 gap-3" onClick={() => setIsHistoryOpen(false)}>
          <svg className="sm:hidden xl:w-9 lg:w-8 md:w-7 w-5" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.3493 10.5658L20.612 2.5206C20.859 2.27975 20.9978 1.95309 20.9978 1.61247C20.9978 1.27186 20.859 0.945195 20.612 0.704345C20.3651 0.463494 20.0301 0.328186 19.6808 0.328186C19.3316 0.328186 18.9966 0.463494 18.7496 0.704345L10.5 8.76237L2.25035 0.704345C2.00338 0.463494 1.66842 0.328186 1.31915 0.328186C0.969886 0.328186 0.634924 0.463494 0.387954 0.704345C0.140984 0.945195 0.00223861 1.27186 0.0022386 1.61247C0.0022386 1.95309 0.140984 2.27975 0.387954 2.5206L8.65072 10.5658L0.387954 18.6111C0.265025 18.73 0.167453 18.8714 0.100868 19.0273C0.0342819 19.1832 0 19.3504 0 19.5192C0 19.6881 0.0342819 19.8552 0.100868 20.0111C0.167453 20.167 0.265025 20.3084 0.387954 20.4273C0.50988 20.5472 0.654938 20.6424 0.814763 20.7073C0.974587 20.7722 1.14601 20.8057 1.31915 20.8057C1.49229 20.8057 1.66372 20.7722 1.82355 20.7073C1.98337 20.6424 2.12843 20.5472 2.25035 20.4273L10.5 12.3693L18.7496 20.4273C18.8716 20.5472 19.0166 20.6424 19.1765 20.7073C19.3363 20.7722 19.5077 20.8057 19.6808 20.8057C19.854 20.8057 20.0254 20.7722 20.1852 20.7073C20.3451 20.6424 20.4901 20.5472 20.612 20.4273C20.735 20.3084 20.8325 20.167 20.8991 20.0111C20.9657 19.8552 21 19.6881 21 19.5192C21 19.3504 20.9657 19.1832 20.8991 19.0273C20.8325 18.8714 20.735 18.73 20.612 18.6111L12.3493 10.5658Z"
              fill="#205072"
            />
          </svg>
        </button>
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowChatId(null);
              }}
            >
              <svg className="xl:w-9 lg:w-8 md:w-7 sm:w-6 w-5 cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.2093 0L36 5.79068L31.5856 10.207L25.7949 4.41636L30.2093 0ZM9 27H14.7907L28.8562 12.9344L23.0656 7.14377L9 21.2093V27Z" fill="#7D94A6" />
                <path
                  d="M30.2222 32.2222H9.74289C9.69378 32.2222 9.64278 32.2411 9.59367 32.2411C9.53133 32.2411 9.469 32.2241 9.40478 32.2222H3.77778V5.77778H16.711L20.4888 2H3.77778C1.69433 2 0 3.69244 0 5.77778V32.2222C0 34.3076 1.69433 36 3.77778 36H30.2222C31.2242 36 32.185 35.602 32.8935 34.8935C33.602 34.185 34 33.2242 34 32.2222V15.8493L30.2222 19.6271V32.2222Z"
                  fill="#7D94A6"
                />
              </svg>
            </button>
          </div>

          <div className="sm:max-h-[80vh] sm:overflow-y-scroll">
            {datas &&
              datas.length > 0 &&
              datas.map((data) => {
                return (
                  <>
                    <div className="py-5 border-t-2 border-gcSecondary-500">
                      <button
                        onClick={() => {
                          setShowChatId(data.id);
                          setIsHistoryOpen(false);
                        }}
                        className="gcContentAccent2p text-gcPrimary-1000 hover:underline cursor-pointer line-clamp-2"
                      >
                        {data.question}
                      </button>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
