import Link from "next/link";

export default function MyArticleMore({ articles }) {
  if (!articles) return;
  return (
    <>
      <div className="sm:w-3/5 w-full sm:mt-0 mt-1">
        <h1 className="gcHeading3p text-gcPrimary-1000 sm:hidden">More</h1>
        {articles.map((article, index) => {
          return (
            <div key={index} className="border-b sm:p-5 py-3 border-gcSecondary-300">
              <Link href={`/my/article/${article.slug}`} className="hover:underline text-gcPrimary-1000">
                <h1 className="gcBody1p font-semibold text-gcPrimary-1000">{article.title}</h1>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
