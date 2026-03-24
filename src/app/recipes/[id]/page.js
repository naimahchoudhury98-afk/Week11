export default async function RecipePage({ params }) {
  const { id } = await params;

  return (
    <div>
      <h1>Recipe ID: {id}</h1>
    </div>
  );
}
