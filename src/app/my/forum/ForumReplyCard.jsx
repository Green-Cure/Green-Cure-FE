import { formatTime } from "@/app/utils/formatTimestamp";
import { hostNoPrefix } from "@/app/utils/urlApi";

export default function MyForumReplyCard({ data }) {
  return (
    <>
      <div className="lg:mt-8 mt-4 z-[11] relative">
        <header className="flex flex-row-reverse justify-between">
          <div className="flex flex-row-reverse justify-center items-center gap-3 text-right">
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
        <div className="pr-16 place-self-end flex flex-col mt-1">
          <div className="sm:bg-gcNeutrals-baseWhite bg-gcSecondary-100 rounded-3xl px-6 py-4">
            <h1 className="gcContentBody5p text-gcPrimary-1000 text-justify">{data.content}</h1>
            {data.image && <img src={`${hostNoPrefix}uploads/${data.image}`} alt="Forum Picture" className="md:max-w-max lg:max-h-60 md:max-h-56 max-h-48 object-cover object-center mt-3" />}
          </div>
        </div>
      </div>
    </>
  );
}
