export default function ProfileDataSection({ userData }) {
  return (
    <section className="">
      <div className="flex justify-left items-center xl:px-20 lg:px-16 md:px-12 px-7 sm:px-10 md:py-10 py-5 md:gap-8 gap-5">
        <div className="relative">
          {userData.avatar ? (
            <img src={`${host}/uploads${userData.avatar}`} alt="Profile Avatar" className="rounded-full xl:w-36 lg:w-32 md:w-28 sm:w-24 w-20" />
          ) : (
            <img src={"/avatars/default-avatar.svg"} alt="Profile Avatar" className="rounded-full xl:w-36 lg:w-32 md:w-28 sm:w-24 w-20" />
          )}

          <button className="absolute border right-0 bottom-1 sm:bottom-3 bg-gcSecondary-baseSecondary p-1.5 rounded-full">
            <svg className="lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.93913 18.2245H4.55316L15.6248 7.15282L14.0108 5.53879L2.93913 16.6105V18.2245ZM0.673828 20.4898V15.676L15.6248 0.753326C15.8514 0.545673 16.1017 0.385214 16.3758 0.271949C16.6499 0.158684 16.9376 0.102051 17.2389 0.102051C17.5402 0.102051 17.8328 0.158684 18.1167 0.271949C18.4006 0.385214 18.646 0.555112 18.8529 0.781642L20.4103 2.36736C20.6368 2.57501 20.8022 2.82042 20.9064 3.10358C21.0106 3.38674 21.0623 3.66991 21.0616 3.95307C21.0616 4.25511 21.0098 4.54318 20.9064 4.81729C20.803 5.09139 20.6376 5.34133 20.4103 5.5671L5.4876 20.4898H0.673828ZM14.8037 6.35996L14.0108 5.53879L15.6248 7.15282L14.8037 6.35996Z"
                fill="#394753"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="gcHeading5p text-gcPrimary-1000">{userData.name}</h1>
          <h3 className="gcContentAccent1p text-gcPrimary-1000">@{userData.username}</h3>
          <h4 className="gcContentAccent1pi text-gcSecondary-500">{userData.email}</h4>
        </div>
      </div>
    </section>
  );
}
