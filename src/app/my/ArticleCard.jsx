import Link from "next/link";

export default function ArticleCard({
  article = {
    id: 17,
    userId: 1,
    title: "tes artikel",
    slug: "tes-artikel",
    image: "c37xu921t8y2g4cugh9qiaiz.jpeg",
    content: "testing",
    createdAt: "2024-08-02T11:46:03.238+00:00",
    updatedAt: "2024-08-02T11:46:03.238+00:00",
    deletedAt: null,
  },
}) {
  return (
    <div className="flex xl:flex-row flex-col-reverse justify-between sm:justify-center xl:items-center items-start xl:py-4 py-2 border-b border-gcSecondary-400 gap-3">
      <div className="xl:w-3/5 w-full">
        <Link
          href={`/my/article/${article.slug}`}
          className="hover:underline text-gcPrimary-1000"
        >
          <h2 className="gcContentAccent1p text-gcPrimary-1000">
            {article.title}
          </h2>
        </Link>
        <h4 className="text-gcSecondary-600 gcContentBody2p">
          {formatDate(article.createdAt)}
        </h4>
      </div>
      <div className="xl:w-2/5 w-full h-40 md:h-36 sm:h-32 flex justify-center items-center rounded-xl">
        <img
          className="rounded-xl object-cover object-center xl:h-36 xl:w-60 w-full h-full"
          src={article.image}
          alt={article.slug}
        />
      </div>
    </div>
  );
}
