import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const breakPath = ["detailArticle", "editArticle"];

  return (
    <div className="flex mb-5">
      <nav aria-label="Breadcrumb" className="items-center flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {pathNames.map((link, index) => {
            let itemLink = link;
            let href = `/${pathNames.slice(0, index + 1).join("/")}`;

            if (index != 0) {
              let befPath = pathNames[index - 1];
              if (breakPath.find((path) => path === befPath)) {
                return;
              }
            }

            return (
              <li key={index}>
                <div className="flex items-center">
                  {index != 0 && (
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                  )}

                  {pathNames.length - 1 == index || breakPath.find((path) => path === itemLink) ? (
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">{itemLink}</span>
                  ) : (
                    <Link href={href} className="ms-1 text-sm font-medium text-gray-700 hover:text-gcPrimary-1000 md:ms-2 flex items-center">
                      {index == 0 && (
                        <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                      )}
                      {itemLink}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
