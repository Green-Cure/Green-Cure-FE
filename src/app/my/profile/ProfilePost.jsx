import PostCard from "../PostCard";

export default function ProfilePost() {
  return (
    <>
      <section className="xl:px-20 lg:px-16 md:px-12 px-7 sm:px-10 flex flex-col w-full">
        {/* Data Loop */}
        <PostCard />
        <PostCard />
        <PostCard />
      </section>
    </>
  );
}
