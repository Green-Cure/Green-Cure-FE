export default function EditArticle({ params }) {
  return (
    <>
      <div>
        <h1>Edit Article</h1>
        <p>{params.slug}</p>
      </div>
    </>
  );
}
