export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <div>Recipe ID: {id}</div>;
}
