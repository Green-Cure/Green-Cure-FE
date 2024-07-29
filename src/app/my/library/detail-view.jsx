"use client";
import { useRouter } from "next/router";
import Link from "next/link";

const DetailView = () => {
  const router = useRouter();
  const { name, description, image } = router.query;

  return (
    <div className="container mx-auto p-6">
      <Link href="/my/library">
        <a className="text-gcPrimary-1000">Back to Library</a>
      </Link>
      <div className="mt-6 bg-gcPrimary-200 p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row sm:space-x-4 items-center sm:items-center">
        <div className="flex justify-center items-center w-24 h-24">
          <img src={image} alt={name} className="object-cover rounded-lg" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-gcPrimary-1000 mb-2">
            {name}
          </h2>
          <p className="text-gcPrimary-1000 text-base sm:text-lg mb-2">
            <em>{description}</em>
          </p>
          <p className="text-gcPrimary-1000 text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius
            augue non ante lacinia, vel bibendum velit ornare. Sed a eleifend
            nulla. Vestibulum a arcu arcu. Fusce sit amet ante non augue
            vehicula vehicula vel ac nibh....
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
